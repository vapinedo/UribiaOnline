import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@shared/components/AdminTable';
import { fundacionConfig } from '@feature/fundacion/FundacionConfig';
import { useEliminarFundacion, useListarFundacions } from '@feature/fundacion/hooks/useFundacion';

export default function FundacionAdminPage() {
  const navigate = useNavigate();
  const { data: fundacions = [], isLoading } = useListarFundacions();
  const eliminarFundacion = useEliminarFundacion();

  const columns: GridColDef[] = [
    { field: 'nombre', headerName: 'Fundación', width: 200 },
    { field: 'representanteLegal', headerName: 'Representante Legal', width: 200 },
    { field: 'nit', headerName: 'Nit', width: 200 },
    { field: 'telefono', headerName: 'Teléfono', width: 200 },
    { field: 'email', headerName: 'Correo Electrónico', width: 200 },
    { field: 'ciudad', headerName: 'Ciudad', width: 200 },
    { field: 'direccion', headerName: 'Dirección', width: 200 },
  ];

  return (
    <AdminTable
      data={fundacions}
      columns={columns}
      loading={isLoading}
      title={fundacionConfig.title}
      createRoute={fundacionConfig.routePath + '/nuevo'}
      onDelete={(row) => eliminarFundacion.mutate(row.id)}
      onEdit={(row) => navigate(`${fundacionConfig.routePath}/editar/${row.id}`)}
      confirmDeleteMessage={(row) => fundacionConfig.deleteMessage(row.nombre)}
    />
  );
}
