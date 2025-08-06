import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@shared/components/AdminTable';
import { propiedadConfig } from '@feature/propiedad/PropiedadConfig';
import { useEliminarPropiedad, useListarPropiedads } from '@feature/propiedad/hooks/usePropiedad';

export default function PropiedadAdminPage() {
  const navigate = useNavigate();
  const { data: propiedads = [], isLoading } = useListarPropiedads();
  const eliminarPropiedad = useEliminarPropiedad();

  const columns: GridColDef[] = [
    { field: 'titulo', headerName: 'Título', width: 200 },
    { field: 'tipo', headerName: 'Tipo', width: 120 },
    { field: 'operacion', headerName: 'Operación', width: 120 },
    { field: 'precio', headerName: 'Precio', width: 120,
      valueFormatter: (params) => `$${params.value?.toLocaleString()}` },
    { field: 'barrioId', headerName: 'Barrio', width: 150 },
    { field: 'disponible', headerName: 'Disponible', width: 100,
      renderCell: (params) => params.value ? "Sí" : "No" }
  ];

  return (
    <AdminTable
      data={propiedads}
      columns={columns}
      loading={isLoading}
      title={propiedadConfig.title}
      createRoute={propiedadConfig.routePath + '/nuevo'}
      onDelete={(row) => eliminarPropiedad.mutate(row.id)}
      onEdit={(row) => navigate(`${propiedadConfig.routePath}/editar/${row.id}`)}
      confirmDeleteMessage={(row) => propiedadConfig.deleteMessage(row.titulo)}
    />
  );
}