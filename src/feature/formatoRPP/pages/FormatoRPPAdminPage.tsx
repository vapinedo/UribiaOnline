import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@shared/components/AdminTable';
import { formatoRPPConfig } from '@feature/formatoRPP/FormatoRPPConfig';
import { useEliminarFormatoRPP, useListarFormatoRPPs } from '@feature/formatoRPP/hooks/useFormatoRPP';

export default function FormatoRPPAdminPage() {
  const navigate = useNavigate();
  const { data: formatoRPPs = [], isLoading } = useListarFormatoRPPs();
  const eliminarFormatoRPP = useEliminarFormatoRPP();

  const columns: GridColDef[] = [];

  return (
    <AdminTable
      data={formatoRPPs}
      columns={columns}
      loading={isLoading}
      title="Gestión de Formatos RPP"
      createRoute={formatoRPPConfig.routePath + '/nuevo'}
      onDelete={(row) => eliminarFormatoRPP.mutate(row.id)}
      onEdit={(row) => navigate(`${formatoRPPConfig.routePath}/editar/${row.id}`)}
      confirmDeleteMessage={(row) => formatoRPPConfig.deleteMessage(row.nombre)}
    />
  );
}
