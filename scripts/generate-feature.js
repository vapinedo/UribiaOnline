#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Función para crear directorios si no existen
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Función para escribir archivos
function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`✅ Creado: ${filePath}`);
}

// Función para generar el modelo
function generateModel(featureName, modelFields) {
  const modelContent = `export interface ${featureName.charAt(0).toUpperCase() + featureName.slice(1)} {
${modelFields.map((field) => `  ${field.name}${field.required ? '' : '?'}: ${field.type};`).join('\n')}
}`;

  return modelContent;
}

// Función para generar la configuración
function generateConfig(featureName, collectionName, routePath) {
  return `import { createFeatureConfig } from '@core/factories/createFeatureConfig';

export const ${featureName}Config = createFeatureConfig({
  name: '${featureName}',
  collectionName: '${collectionName || featureName + 's'}',
  routePath: '${routePath || '/' + featureName + 's'}',
});`;
}

// Función para generar el repositorio
function generateRepository(featureName) {
  const capitalizedName = featureName.charAt(0).toUpperCase() + featureName.slice(1);

  return `import { ${capitalizedName} } from '@feature/${featureName}/models/${capitalizedName}';
import { ${featureName}Config } from '@feature/${featureName}/${capitalizedName}Config';
import { createFeatureRepository } from '@core/factories/createFeatureRepository';

const { repository, hooks } = createFeatureRepository<${capitalizedName}>(${featureName}Config.collectionName);

export const ${featureName}Repository = repository;
export const { useList, useCreate, useUpdate, useDelete, useGetById } = hooks;`;
}

// Función para generar los hooks
function generateHooks(featureName) {
  const capitalizedName = featureName.charAt(0).toUpperCase() + featureName.slice(1);

  return `import { useList, useCreate, useUpdate, useDelete, useGetById } from '@feature/${featureName}/repositories/${featureName}Repository';

export const useListar${capitalizedName}s = useList;
export const useCrear${capitalizedName} = useCreate;
export const useActualizar${capitalizedName} = useUpdate;
export const useEliminar${capitalizedName} = useDelete;
export const use${capitalizedName}PorId = useGetById;`;
}

// Función para generar el router
function generateRouter(featureName) {
  const capitalizedName = featureName.charAt(0).toUpperCase() + featureName.slice(1);

  return `import { Route, Routes } from 'react-router-dom';
import ${capitalizedName}Form from '@feature/${featureName}/components/${capitalizedName}Form';
import ${capitalizedName}AdminPage from '@feature/${featureName}/pages/${capitalizedName}AdminPage';
import ${capitalizedName}DetallePage from '@feature/${featureName}/pages/${capitalizedName}DetallePage';
import ${capitalizedName}FormWrapper from '@feature/${featureName}/components/${capitalizedName}FormWrapper';

export default function ${capitalizedName}Router() {
  return (
    <Routes>
      <Route path="/" element={<${capitalizedName}AdminPage />} />
      <Route path="/nuevo" element={<${capitalizedName}Form modo="crear" />} />
      <Route path="/editar/:id" element={<${capitalizedName}FormWrapper />} />
      <Route path="/detalle/:id" element={<${capitalizedName}DetallePage />} />
    </Routes>
  );
}`;
}

// Función para generar la página de administración
function generateAdminPage(featureName, columns) {
  const capitalizedName = featureName.charAt(0).toUpperCase() + featureName.slice(1);

  const columnsCode = columns
    .map((col) => {
      let columnDef = `    { field: '${col.field}', headerName: '${col.headerName}', width: ${col.width || 200}`;
      if (col.valueFormatter) {
        columnDef += `,\n      valueFormatter: (params) => ${col.valueFormatter}`;
      }
      if (col.renderCell) {
        columnDef += `,\n      renderCell: (params) => ${col.renderCell}`;
      }
      columnDef += ' }';
      return columnDef;
    })
    .join(',\n');

  return `import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@shared/components/AdminTable';
import { ${featureName}Config } from '@feature/${featureName}/${capitalizedName}Config';
import { useEliminar${capitalizedName}, useListar${capitalizedName}s } from '@feature/${featureName}/hooks/use${capitalizedName}';

export default function ${capitalizedName}AdminPage() {
  const navigate = useNavigate();
  const { data: ${featureName}s = [], isLoading } = useListar${capitalizedName}s();
  const eliminar${capitalizedName} = useEliminar${capitalizedName}();

  const columns: GridColDef[] = [
${columnsCode}
  ];

  return (
    <AdminTable
      data={${featureName}s}
      columns={columns}
      loading={isLoading}
      title={${featureName}Config.title}
      createRoute={${featureName}Config.routePath + '/nuevo'}
      onDelete={(row) => eliminar${capitalizedName}.mutate(row.id)}
      onEdit={(row) => navigate(\`\${${featureName}Config.routePath}/editar/\${row.id}\`)}
      confirmDeleteMessage={(row) => ${featureName}Config.deleteMessage(row.${columns[0]?.field || 'nombre'})}
    />
  );
}`;
}

// Función para generar el formulario básico
function generateForm(featureName, fields) {
  const capitalizedName = featureName.charAt(0).toUpperCase() + featureName.slice(1);

  const formFields = fields
    .map((field) => {
      if (field.type === 'string' && field.multiline) {
        return `          <CustomTextField 
            required 
            name="${field.name}" 
            label="${field.label}" 
            multiline 
            rows={3}
            errors={errors} 
            register={register} 
          />`;
      } else if (field.type === 'number') {
        return `          <CustomTextField 
            required 
            name="${field.name}" 
            label="${field.label}" 
            type="number"
            errors={errors} 
            register={register} 
          />`;
      } else if (field.type === 'select') {
        return `          <CustomSelect
            required
            name="${field.name}"
            label="${field.label}"
            options={${field.name}Options}
            control={control}
            errors={errors}
          />`;
      } else {
        return `          <CustomTextField required name="${field.name}" label="${field.label}" errors={errors} register={register} />`;
      }
    })
    .join('\n');

  return `import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import BoxShadow from '@shared/components/BoxShadow';
import { ${capitalizedName} } from '@feature/${featureName}/models/${capitalizedName}';
import { FieldErrors, useForm } from 'react-hook-form';
import { AutoGridRow } from '@shared/components/AutoGridRow';
import { CustomTextField } from '@shared/components/CustomTextField';
import { CustomSelect } from '@shared/components/CustomSelect';
import { ${featureName}Repository } from '@feature/${featureName}/repositories/${featureName}Repository';
import { useCrear${capitalizedName}, useActualizar${capitalizedName} } from '@feature/${featureName}/hooks/use${capitalizedName}';
import { ${featureName}Config } from '@feature/${featureName}/${capitalizedName}Config';

type ${capitalizedName}FormProps = {
  modo: 'crear' | 'editar';
  ${featureName}Id?: string;
};

const defaultValues: ${capitalizedName} = {
${fields.map((field) => `  ${field.name}: ${field.defaultValue || (field.type === 'string' ? "''" : field.type === 'number' ? '0' : field.type === 'boolean' ? 'false' : 'new Date()')},`).join('\n')}
};

export default function ${capitalizedName}Form({ modo, ${featureName}Id }: ${capitalizedName}FormProps) {
  const navigate = useNavigate();

  const crear${capitalizedName} = useCrear${capitalizedName}();
  const actualizar${capitalizedName} = useActualizar${capitalizedName}();

  const { data: ${featureName}Editando, isLoading: cargando${capitalizedName} } = useQuery({
    queryKey: ['${featureName}', ${featureName}Id],
    queryFn: () => ${featureName}Repository.obtenerPorId(${featureName}Id!),
    enabled: modo === 'editar' && !!${featureName}Id,
  });

  const form = useForm<${capitalizedName}>({
    defaultValues,
    mode: 'onTouched',
  });

  const { control, register, formState, handleSubmit, reset } = form;
  const { errors, isSubmitting, isValid } = formState;

  useEffect(() => {
    if (modo === 'editar' && ${featureName}Editando) {
      reset(${featureName}Editando);
    }
  }, [modo, ${featureName}Editando, reset]);

  const onSubmit = useCallback(
    async (${featureName}: ${capitalizedName}) => {
      try {
        if (modo === 'crear') {
          await crear${capitalizedName}.mutateAsync({ entity: ${featureName} });
        } else {
          await actualizar${capitalizedName}.mutateAsync({ entity: ${featureName} });
        }
        navigate('/${featureName}s');
      } catch (error) {
        console.error(error);
      }
    },
    [crear${capitalizedName}, actualizar${capitalizedName}, modo, navigate]
  );

  const onError = useCallback((errors: FieldErrors<any>) => {
    console.log({ errors });
  }, []);

  if (modo === 'editar' && cargando${capitalizedName}) {
    return (
      <BoxShadow>
        <p>Cargando datos del ${featureName}...</p>
      </BoxShadow>
    );
  }

  return (
    <BoxShadow>
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <h2>{modo === 'crear' ? ${featureName}Config.createTitle : ${featureName}Config.editTitle}</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <AutoGridRow spacing={2} rowSpacing={2}>
${formFields}
        </AutoGridRow>

        <Button
          type="submit"
          color="success"
          variant="contained"
          sx={{ marginTop: 2 }}
          disabled={isSubmitting || !isValid}
        >
          {modo === 'crear' ? 'Crear ${capitalizedName}' : 'Actualizar ${capitalizedName}'}
        </Button>
      </form>
    </BoxShadow>
  );
}`;
}

// Función para generar el wrapper del formulario
function generateFormWrapper(featureName) {
  const capitalizedName = featureName.charAt(0).toUpperCase() + featureName.slice(1);

  return `import { useParams } from 'react-router-dom';
import ${capitalizedName}Form from './${capitalizedName}Form';

export default function ${capitalizedName}FormWrapper() {
  const { id } = useParams<{ id: string }>();
  return <${capitalizedName}Form modo="editar" ${featureName}Id={id} />;
}`;
}

// Función para generar la página de detalles
function generateDetailPage(featureName, fields) {
  const capitalizedName = featureName.charAt(0).toUpperCase() + featureName.slice(1);

  const detailFields = fields
    .map((field) => {
      if (field.type === 'number') {
        return `      <p><strong>${field.label}:</strong> {${featureName}.${field.name}?.toLocaleString()}</p>`;
      } else if (field.type === 'boolean') {
        return `      <p><strong>${field.label}:</strong> {${featureName}.${field.name} ? 'Sí' : 'No'}</p>`;
      } else {
        return `      <p><strong>${field.label}:</strong> {${featureName}.${field.name}}</p>`;
      }
    })
    .join('\n');

  return `import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BoxShadow from '@shared/components/BoxShadow';
import { ${featureName}Repository } from '@feature/${featureName}/repositories/${featureName}Repository';

export default function ${capitalizedName}DetallePage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: ${featureName}, isLoading } = useQuery({
    queryKey: ['${featureName}', id],
    queryFn: () => ${featureName}Repository.obtenerPorId(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <BoxShadow>
        <p>Cargando detalles del ${featureName}...</p>
      </BoxShadow>
    );
  }

  if (!${featureName}) {
    return (
      <BoxShadow>
        <p>${capitalizedName} no encontrado</p>
      </BoxShadow>
    );
  }

  return (
    <BoxShadow>
      <h2>{${featureName}.${fields[0]?.name || 'nombre'}}</h2>
${detailFields}
    </BoxShadow>
  );
}`;
}

// Función principal
function generateFeature(featureName, options = {}) {
  const { modelFields = [], columns = [], collectionName, routePath } = options;

  const basePath = `src/feature/${featureName}`;
  const capitalizedName = featureName.charAt(0).toUpperCase() + featureName.slice(1);

  console.log(`�� Generando feature: ${featureName}`);

  // Crear directorios
  ensureDir(`${basePath}/components`);
  ensureDir(`${basePath}/hooks`);
  ensureDir(`${basePath}/models`);
  ensureDir(`${basePath}/pages`);
  ensureDir(`${basePath}/repositories`);

  // Generar archivos
  writeFile(`${basePath}/models/${capitalizedName}.ts`, generateModel(featureName, modelFields));
  writeFile(`${basePath}/${capitalizedName}Config.ts`, generateConfig(featureName, collectionName, routePath));
  writeFile(`${basePath}/repositories/${featureName}Repository.ts`, generateRepository(featureName));
  writeFile(`${basePath}/hooks/use${capitalizedName}.ts`, generateHooks(featureName));
  writeFile(`${basePath}/${capitalizedName}Router.tsx`, generateRouter(featureName));
  writeFile(`${basePath}/pages/${capitalizedName}AdminPage.tsx`, generateAdminPage(featureName, columns));
  writeFile(`${basePath}/components/${capitalizedName}Form.tsx`, generateForm(featureName, modelFields));
  writeFile(`${basePath}/components/${capitalizedName}FormWrapper.tsx`, generateFormWrapper(featureName));
  writeFile(`${basePath}/pages/${capitalizedName}DetallePage.tsx`, generateDetailPage(featureName, modelFields));

  console.log(`✅ Feature ${featureName} generada exitosamente!`);
  console.log(`📝 Recuerda agregar la ruta en src/router/routesConfig.ts:`);
  console.log(
    `   const ${capitalizedName}Router = lazyImport(() => import('@feature/${featureName}/${capitalizedName}Router'));`
  );
  console.log(`   { path: '/${featureName}s/*', Component: ${capitalizedName}Router, isPrivate: true }`);
}

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);
const featureName = args[0];

if (!featureName) {
  console.error('❌ Error: Debes especificar el nombre de la feature');
  console.log('Uso: node scripts/generate-feature.js <nombre-feature>');
  process.exit(1);
}

// Ejemplo de uso para la feature "propiedad"
if (featureName === 'propiedad') {
  generateFeature('propiedad', {
    modelFields: [
      { name: 'id', type: 'string', required: true },
      { name: 'titulo', type: 'string', required: true, label: 'Título' },
      { name: 'descripcion', type: 'string', required: true, label: 'Descripción', multiline: true },
      { name: 'tipo', type: 'select', required: true, label: 'Tipo de Propiedad' },
      { name: 'operacion', type: 'select', required: true, label: 'Operación' },
      { name: 'precio', type: 'number', required: true, label: 'Precio' },
      { name: 'moneda', type: 'select', required: true, label: 'Moneda' },
      { name: 'area', type: 'number', required: true, label: 'Área (m²)' },
      { name: 'habitaciones', type: 'number', required: false, label: 'Habitaciones' },
      { name: 'banos', type: 'number', required: false, label: 'Baños' },
      { name: 'barrioId', type: 'string', required: true, label: 'Barrio ID' },
      { name: 'direccion', type: 'string', required: true, label: 'Dirección' },
      { name: 'destacada', type: 'boolean', required: false, label: 'Destacada' },
      { name: 'disponible', type: 'boolean', required: false, label: 'Disponible' },
      { name: 'fechaCreacion', type: 'Date', required: false, label: 'Fecha de Creación' },
      { name: 'fechaActualizacion', type: 'Date', required: false, label: 'Fecha de Actualización' },
    ],
    columns: [
      { field: 'titulo', headerName: 'Título', width: 200 },
      { field: 'tipo', headerName: 'Tipo', width: 120 },
      { field: 'operacion', headerName: 'Operación', width: 120 },
      { field: 'precio', headerName: 'Precio', width: 120, valueFormatter: '`$${params.value?.toLocaleString()}`' },
      { field: 'barrioId', headerName: 'Barrio', width: 150 },
      { field: 'disponible', headerName: 'Disponible', width: 100, renderCell: 'params.value ? "Sí" : "No"' },
    ],
    collectionName: 'propiedades',
    routePath: '/propiedades',
  });
} else {
  // Generar feature básica
  generateFeature(featureName);
}
