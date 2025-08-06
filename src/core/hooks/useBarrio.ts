import { Barrio } from '@core/models/Barrio';
import { useFirestoreCrud } from '@core/hooks/useFirestoreCrud';

const barrioCrud = () => useFirestoreCrud<Barrio>('barrios');

export const useListarBarrios = () => barrioCrud().useListar();
export const useCrearBarrio = (opts?: any) => barrioCrud().useCrear(opts);
export const useActualizarBarrio = (opts?: any) => barrioCrud().useActualizar(opts);
export const useEliminarBarrio = (opts?: any) => barrioCrud().useEliminar(opts);
export const useBarrioPorId = (id: string) => barrioCrud().useObtenerPorId(id);
