import { useParams } from 'react-router-dom';
import ResumeForm from '@feature/resume/components/ResumeForm';

export default function ResumeFormWrapper() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Error: ID de hoja de vida no proporcionado.</p>;
  }

  return <ResumeForm modo="editar" resumeId={id} />;
}
