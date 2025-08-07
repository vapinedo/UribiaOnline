import { useParams } from 'react-router-dom';
import FormatoRPPForm from './FormatoRPPForm';

export default function FormatoRPPFormWrapper() {
  const { id } = useParams<{ id: string }>();
  return <FormatoRPPForm modo="editar" formatoRPPId={id} />;
}