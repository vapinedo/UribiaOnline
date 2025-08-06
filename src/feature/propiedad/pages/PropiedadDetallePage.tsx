import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BoxShadow from '@shared/components/BoxShadow';
import { propiedadRepository } from '@feature/propiedad/repositories/propiedadRepository';

export default function PropiedadDetallePage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: propiedad, isLoading } = useQuery({
    queryKey: ['propiedad', id],
    queryFn: () => propiedadRepository.obtenerPorId(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <BoxShadow>
        <p>Cargando detalles del propiedad...</p>
      </BoxShadow>
    );
  }

  if (!propiedad) {
    return (
      <BoxShadow>
        <p>Propiedad no encontrado</p>
      </BoxShadow>
    );
  }

  return (
    <BoxShadow>
      <h2>{propiedad.id}</h2>
      <p><strong>undefined:</strong> {propiedad.id}</p>
      <p><strong>Título:</strong> {propiedad.titulo}</p>
      <p><strong>Descripción:</strong> {propiedad.descripcion}</p>
      <p><strong>Tipo de Propiedad:</strong> {propiedad.tipo}</p>
      <p><strong>Operación:</strong> {propiedad.operacion}</p>
      <p><strong>Precio:</strong> {propiedad.precio?.toLocaleString()}</p>
      <p><strong>Moneda:</strong> {propiedad.moneda}</p>
      <p><strong>Área (m²):</strong> {propiedad.area?.toLocaleString()}</p>
      <p><strong>Habitaciones:</strong> {propiedad.habitaciones?.toLocaleString()}</p>
      <p><strong>Baños:</strong> {propiedad.banos?.toLocaleString()}</p>
      <p><strong>Barrio ID:</strong> {propiedad.barrioId}</p>
      <p><strong>Dirección:</strong> {propiedad.direccion}</p>
      <p><strong>Destacada:</strong> {propiedad.destacada ? 'Sí' : 'No'}</p>
      <p><strong>Disponible:</strong> {propiedad.disponible ? 'Sí' : 'No'}</p>
      <p><strong>Fecha de Creación:</strong> {propiedad.fechaCreacion}</p>
      <p><strong>Fecha de Actualización:</strong> {propiedad.fechaActualizacion}</p>
    </BoxShadow>
  );
}