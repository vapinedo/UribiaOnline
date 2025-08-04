import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@shared/components/AdminTable';
import { useEliminarPersona, useListarPersonas } from '@core/hooks/usePersona';

export default function PersonasAdminPage() {
  const navigate = useNavigate();
  const { data: personas = [], isLoading } = useListarPersonas();
  const eliminarPersona = useEliminarPersona();

  const columns: GridColDef[] = [
    { field: 'nombres', headerName: 'Nombres', width: 200 },
    { field: 'primerApellido', headerName: 'Primer Apellido', width: 200 },
    { field: 'segundoApellido', headerName: 'Segundo Apellido', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'telefono', headerName: 'Teléfono', width: 150 },
    { field: 'numeroDocumento', headerName: 'Documento', width: 180 },
    { field: 'fechaNacimiento', headerName: 'Nacimiento', width: 150 },
  ];

  return (
    <AdminTable
      data={personas}
      columns={columns}
      loading={isLoading}
      title="Gestión de Personas"
      createRoute="/personas/nuevo"
      onDelete={(row) => eliminarPersona.mutate(row.id)}
      onEdit={(row) => navigate(`/personas/editar/${row.id}`)}
      confirmDeleteMessage={(row) => `¿Deseas eliminar a ${row.nombres} ${row.primerApellido} ${row.segundoApellido}?`}
      // onPrintPDF={(row) => 'Test'}
    />
  );
}
