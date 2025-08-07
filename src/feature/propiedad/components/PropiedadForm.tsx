import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import BoxShadow from '@shared/components/BoxShadow';
import { Propiedad } from '@feature/propiedad/models/Propiedad';
import { FieldErrors, useForm } from 'react-hook-form';
import { AutoGridRow } from '@shared/components/AutoGridRow';
import { CustomTextField } from '@shared/components/CustomTextField';
import { CustomSelect } from '@shared/components/CustomSelect';
import { propiedadRepository } from '@feature/propiedad/repositories/propiedadRepository';
import { useCrearPropiedad, useActualizarPropiedad } from '@feature/propiedad/hooks/usePropiedad';
import { propiedadConfig } from '@feature/propiedad/PropiedadConfig';

type PropiedadFormProps = {
  modo: 'crear' | 'editar';
  propiedadId?: string;
};

const defaultValues: Propiedad = {
  id: '',
  titulo: '',
  descripcion: '',
  tipo: new Date(),
  operacion: new Date(),
  precio: 0,
  moneda: new Date(),
  area: 0,
  habitaciones: 0,
  banos: 0,
  barrioId: '',
  direccion: '',
  destacada: false,
  disponible: false,
  fechaCreacion: new Date(),
  fechaActualizacion: new Date(),
};

export default function PropiedadForm({ modo, propiedadId }: PropiedadFormProps) {
  const navigate = useNavigate();

  const crearPropiedad = useCrearPropiedad();
  const actualizarPropiedad = useActualizarPropiedad();

  const { data: propiedadEditando, isLoading: cargandoPropiedad } = useQuery({
    queryKey: ['propiedad', propiedadId],
    queryFn: () => propiedadRepository.obtenerPorId(propiedadId!),
    enabled: modo === 'editar' && !!propiedadId,
  });

  const form = useForm<Propiedad>({
    defaultValues,
    mode: 'onTouched',
  });

  const { control, register, formState, handleSubmit, reset } = form;
  const { errors, isSubmitting, isValid } = formState;

  useEffect(() => {
    if (modo === 'editar' && propiedadEditando) {
      reset(propiedadEditando);
    }
  }, [modo, propiedadEditando, reset]);

  const onSubmit = useCallback(
    async (propiedad: Propiedad) => {
      try {
        if (modo === 'crear') {
          await crearPropiedad.mutateAsync({ entity: propiedad });
        } else {
          await actualizarPropiedad.mutateAsync({ entity: propiedad });
        }
        navigate('/propiedads');
      } catch (error) {
        console.error(error);
      }
    },
    [crearPropiedad, actualizarPropiedad, modo, navigate]
  );

  const onError = useCallback((errors: FieldErrors<any>) => {
    console.log({ errors });
  }, []);

  if (modo === 'editar' && cargandoPropiedad) {
    return (
      <BoxShadow>
        <p>Cargando datos del propiedad...</p>
      </BoxShadow>
    );
  }

  return (
    <BoxShadow>
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <h2>{modo === 'crear' ? propiedadConfig.createTitle : propiedadConfig.editTitle}</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomTextField required name="id" label="undefined" errors={errors} register={register} />
          <CustomTextField required name="titulo" label="Título" errors={errors} register={register} />
          <CustomTextField 
            required 
            name="descripcion" 
            label="Descripción" 
            multiline 
            rows={3}
            errors={errors} 
            register={register} 
          />
          <CustomSelect
            required
            name="tipo"
            label="Tipo de Propiedad"
            options={tipoOptions}
            control={control}
            errors={errors}
          />
          <CustomSelect
            required
            name="operacion"
            label="Operación"
            options={operacionOptions}
            control={control}
            errors={errors}
          />
          <CustomTextField 
            required 
            name="precio" 
            label="Precio" 
            type="number"
            errors={errors} 
            register={register} 
          />
          <CustomSelect
            required
            name="moneda"
            label="Moneda"
            options={monedaOptions}
            control={control}
            errors={errors}
          />
          <CustomTextField 
            required 
            name="area" 
            label="Área (m²)" 
            type="number"
            errors={errors} 
            register={register} 
          />
          <CustomTextField 
            required 
            name="habitaciones" 
            label="Habitaciones" 
            type="number"
            errors={errors} 
            register={register} 
          />
          <CustomTextField 
            required 
            name="banos" 
            label="Baños" 
            type="number"
            errors={errors} 
            register={register} 
          />
          <CustomTextField required name="barrioId" label="Barrio ID" errors={errors} register={register} />
          <CustomTextField required name="direccion" label="Dirección" errors={errors} register={register} />
          <CustomTextField required name="destacada" label="Destacada" errors={errors} register={register} />
          <CustomTextField required name="disponible" label="Disponible" errors={errors} register={register} />
          <CustomTextField required name="fechaCreacion" label="Fecha de Creación" errors={errors} register={register} />
          <CustomTextField required name="fechaActualizacion" label="Fecha de Actualización" errors={errors} register={register} />
        </AutoGridRow>

        <Button
          type="submit"
          color="success"
          variant="contained"
          sx={{ marginTop: 2 }}
          disabled={isSubmitting || !isValid}
        >
          {modo === 'crear' ? 'Crear Propiedad' : 'Actualizar Propiedad'}
        </Button>
      </form>
    </BoxShadow>
  );
}