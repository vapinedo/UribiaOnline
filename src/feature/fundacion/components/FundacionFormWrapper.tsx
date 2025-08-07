import { useParams } from 'react-router-dom';
import FundacionForm from './FundacionForm';

export default function FundacionFormWrapper() {
  const { id } = useParams<{ id: string }>();
  return <FundacionForm modo="editar" fundacionId={id} />;
}