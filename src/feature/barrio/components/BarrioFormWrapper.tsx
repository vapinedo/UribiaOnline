import { useParams } from 'react-router-dom';
import BarrioForm from '@feature/barrio/components/BarrioForm';

export default function BarrioFormWrapper() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Error: ID de barrio no proporcionado.</p>;
  }

  return <BarrioForm modo="editar" barrioId={id} />;
}
