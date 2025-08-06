import { useParams } from 'react-router-dom';
import PropiedadForm from './PropiedadForm';

export default function PropiedadFormWrapper() {
  const { id } = useParams<{ id: string }>();
  return <PropiedadForm modo="editar" propiedadId={id} />;
}