import { useParams } from 'react-router-dom';
import { BoxShadow } from '@shared/components';
import { useQuery } from '@tanstack/react-query';
import { formatoRPPRepository } from '@feature/formatoRPP/repositories/formatoRPPRepository';

export default function FormatoRPPDetallePage() {
  const { id } = useParams<{ id: string }>();

  const { data: formatoRPP, isLoading } = useQuery({
    queryKey: ['formatoRPP', id],
    queryFn: () => formatoRPPRepository.obtenerPorId(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <BoxShadow>
        <p>Cargando detalles del formatoRPP...</p>
      </BoxShadow>
    );
  }

  if (!formatoRPP) {
    return (
      <BoxShadow>
        <p>FormatoRPP no encontrado</p>
      </BoxShadow>
    );
  }

  return (
    <BoxShadow>
      <h2>{formatoRPP.nombreActividad}</h2>
    </BoxShadow>
  );
}
