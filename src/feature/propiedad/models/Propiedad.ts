export interface Propiedad {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: select;
  operacion: select;
  precio: number;
  area: number;
  habitaciones?: number;
  banos?: number;
  barrioId: string;
  direccion: string;
  destacada?: boolean;
  disponible?: boolean;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
}
