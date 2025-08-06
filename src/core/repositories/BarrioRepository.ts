import { Barrio } from '@core/models';

export interface BarrioRepository {
  listar(): Promise<Barrio[]>;
  obtenerPorId(id: string): Promise<Barrio | null>;
  crear(barrio: Barrio, images?: FileList | null): Promise<void>;
  actualizar(barrio: Barrio, images?: FileList | null): Promise<void>;
  eliminar(id: string): Promise<void>;
  contar(): Promise<number>;
}
