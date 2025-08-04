import { Persona } from '@core/models';

export interface PersonaRepository {
  listar(): Promise<Persona[]>;
  obtenerPorId(id: string): Promise<Persona | null>;
  crear(persona: Persona, images?: FileList | null): Promise<void>;
  actualizar(persona: Persona, images?: FileList | null): Promise<void>;
  eliminar(id: string): Promise<void>;
  contar(): Promise<number>;
}
