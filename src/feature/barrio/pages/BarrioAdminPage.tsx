import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@shared/components/AdminTable';
import { barrioConfig } from '@feature/barrio/BarrioConfig';
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
      title={barrioConfig.title}
      createRoute={barrioConfig.routePath + '/nuevo'}
      onDelete={(row) => eliminarBarrio.mutate(row.id)}
      onEdit={(row) => navigate(`${barrioConfig.routePath}/editar/${row.id}`)}
      confirmDeleteMessage={(row) => barrioConfig.deleteMessage(row.nombre)}
    />
  );
}
