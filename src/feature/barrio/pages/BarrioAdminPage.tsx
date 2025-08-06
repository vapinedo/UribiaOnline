import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@shared/components/AdminTable';
import { useEliminarBarrio, useListarBarrios } from '@feature/barrio/hooks/useBarrio';

export default function BarriosAdminPage() {
  const navigate = useNavigate();
  const { data: barrios = [], isLoading } = useListarBarrios();
  const eliminarBarrio = useEliminarBarrio();

  const columns: GridColDef[] = [{ field: 'nombre', headerName: 'Nombre', width: 200 }];

  return (
    <AdminTable
      data={barrios}
      columns={columns}
      loading={isLoading}
      title="Gestión de Barrios"
      createRoute="/barrios/nuevo"
      onDelete={(row) => eliminarBarrio.mutate(row.id)}
      onEdit={(row) => navigate(`/barrios/editar/${row.id}`)}
      confirmDeleteMessage={(row) => `¿Deseas eliminar el barrio ${row.nombre}?`}
    />
  );
}
