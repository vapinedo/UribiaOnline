import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BoxShadow from '@shared/components/BoxShadow';
import { dialogConfirm } from '@infrastructure/ui/notifications/dialogs/dialogAdapter';
import { DataGrid, GridColDef, GridToolbar, GridValidRowModel } from '@mui/x-data-grid';

interface AdminTableProps<T extends GridValidRowModel> {
  data: T[];
  title: string;
  loading: boolean;
  createRoute: string;
  columns: GridColDef<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onPrintPDF?: (row: T) => void;
  pageSizeOptions?: number[];
  getRowId?: (row: T) => string;
  confirmDeleteMessage?: (row: T) => string;
}

const AdminTable = <T extends GridValidRowModel>({
  data,
  title,
  onEdit,
  loading,
  columns,
  onDelete,
  onPrintPDF,
  createRoute,
  confirmDeleteMessage,
  getRowId = (row) => row.id,
  pageSizeOptions = [10, 20, 50],
}: AdminTableProps<T>) => {
  const navigate = useNavigate();

  // Agregamos columna de acciones solo si hay handlers definidos
  const enhancedColumns: GridColDef<T>[] = [...columns];

  if (onEdit || onDelete || onPrintPDF) {
    enhancedColumns.push({
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          {onEdit && (
            <Button
              size="small"
              color="primary"
              variant="outlined"
              style={{ marginRight: 8 }}
              onClick={() => onEdit(params.row)}
            >
              Editar
            </Button>
          )}
          {onDelete && (
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={async () => {
                const message = confirmDeleteMessage?.(params.row) ?? '¿Estás seguro de eliminar este registro?';
                const result = await dialogConfirm(message);
                if (result.isConfirmed) {
                  onDelete(params.row);
                }
              }}
            >
              Eliminar
            </Button>
          )}
          {onPrintPDF && (
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={async () => {
                console.log('Print PDF');
              }}
            >
              Gen PDF
            </Button>
          )}
        </>
      ),
    });
  }

  return (
    <BoxShadow>
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">{title}</h2>
        <Button variant="contained" color="primary" onClick={() => navigate(createRoute)}>
          Crear nuevo
        </Button>
      </header>

      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={data}
          loading={loading}
          getRowId={getRowId}
          columns={enhancedColumns}
          disableRowSelectionOnClick
          pageSizeOptions={pageSizeOptions}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSizeOptions[0],
              },
            },
          }}
          sx={{
            border: 'none',
            overflowX: 'auto',
            '& .MuiDataGrid-toolbarContainer': {
              display: 'flex',
              marginTop: '12px',
              marginBottom: '22px',
              justifyContent: 'flex-end',
            },
          }}
          localeText={{
            toolbarExport: 'Exportar',
            toolbarQuickFilterPlaceholder: 'Buscar...',
          }}
        />
      </Box>
    </BoxShadow>
  );
};

export default AdminTable;
