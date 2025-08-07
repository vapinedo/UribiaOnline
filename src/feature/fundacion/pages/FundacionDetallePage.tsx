import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BoxShadow } from '@shared/components/BoxShadow';
import { fundacionRepository } from '@feature/fundacion/repositories/fundacionRepository';

export default function FundacionDetallePage() {
  const { id } = useParams<{ id: string }>();

  const { data: fundacion, isLoading } = useQuery({
    queryKey: ['fundacion', id],
    queryFn: () => fundacionRepository.obtenerPorId(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <BoxShadow>
        <p>Cargando detalles del fundacion...</p>
      </BoxShadow>
    );
  }

  if (!fundacion) {
    return (
      <BoxShadow>
        <p>Fundacion no encontrado</p>
      </BoxShadow>
    );
  }

  return (
    <BoxShadow>
      <h2>{fundacion.nombre}</h2>
    </BoxShadow>
  );
}
