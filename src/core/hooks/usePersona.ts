import { Persona } from '@core/models/Persona';
import { useFirestoreCrud } from '@core/hooks/useFirestoreCrud';

const personaCrud = () => useFirestoreCrud<Persona>('personas');

export const useListarPersonas = () => personaCrud().useListar();
export const useCrearPersona = (opts?: any) => personaCrud().useCrear(opts);
export const useActualizarPersona = (opts?: any) => personaCrud().useActualizar(opts);
export const useEliminarPersona = (opts?: any) => personaCrud().useEliminar(opts);
export const usePersonaPorId = (id: string) => personaCrud().useObtenerPorId(id);
