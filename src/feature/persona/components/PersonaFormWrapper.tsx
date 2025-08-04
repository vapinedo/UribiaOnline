import { useParams } from 'react-router-dom';
import PersonaForm from '@feature/persona/components/PersonaForm';

export default function PersonaFormWrapper() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Error: ID de persona no proporcionado.</p>;
  }

  return <PersonaForm modo="editar" personaId={id} />;
}
