import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@shared/components/AdminTable';
import { Resume } from '@feature/resume/models/Resume';
import { fillPdf } from '@feature/resume/utils/pdfGenerator';
import { useEliminarResume, useListarResumes } from '@feature/resume/hooks/useResume';

type ResumeWithId = Resume & { id: string };

interface ResumeTableData {
  id: string;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  tipoDocumento: string;
  numeroDocumento: string;
}

export default function ResumeAdminPage() {
  const navigate = useNavigate();
  const { data: resumes = [], isLoading } = useListarResumes();
  const eliminarResume = useEliminarResume();

  const resumesFormatted: ResumeTableData[] = (resumes as ResumeWithId[]).map((resume) => ({
    id: resume.id,
    nombres: resume.datosPersonales?.nombres || '',
    primerApellido: resume.datosPersonales?.primerApellido || '',
    segundoApellido: resume.datosPersonales?.segundoApellido || '',
    telefono: resume.datosPersonales?.telefono || '',
    tipoDocumento: resume.datosPersonales?.tipoDocumento || '',
    numeroDocumento: resume.datosPersonales?.numeroDocumento || '',
    email: resume.datosPersonales?.email || '',
  }));

  const columns: GridColDef[] = [
    { field: 'nombres', headerName: 'Nombres', width: 150 },
    { field: 'primerApellido', headerName: 'Primer Apellido', width: 150 },
    { field: 'segundoApellido', headerName: 'Segundo Apellido', width: 150 },
    { field: 'telefono', headerName: 'Telefono', width: 180 },
    { field: 'tipoDocumento', headerName: 'Tipo Documento', width: 180 },
    { field: 'numeroDocumento', headerName: '# Documento', width: 180 },
    { field: 'email', headerName: 'Email', width: 300 },
  ];

  const handleGeneratePdf = async (id: string) => {
    try {
      // Obtener el resume completo por ID
      const resumeCompleto = resumes.find((resume: any) => resume.id === id);

      if (!resumeCompleto) {
        console.log('No se encontró el resume para generar el PDF', 'error');
        return;
      }

      // Generar el PDF usando la función fillPdf
      const pdfUrl = await fillPdf(resumeCompleto);

      // Abrir el PDF en una nueva pestaña
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error generando el PDF:', error);
      console.log('Error al generar el PDF', 'error');
    }
  };

  return (
    <AdminTable
      columns={columns}
      hideToolbar={true}
      loading={isLoading}
      title="Hojas de Vida"
      data={resumesFormatted}
      createRoute="/resume/nuevo"
      onDelete={(row) => eliminarResume.mutate(row.id)}
      onEdit={(row) => navigate(`/resume/editar/${row.id}`)}
      onPrint={(row) => handleGeneratePdf(row.id)}
      confirmDeleteMessage={(row) => `¿Deseas eliminar la Hoja de Vida de ${row.nombres} ${row.primerApellido}?`}
    />
  );
}
