import { useList, useCreate, useUpdate, useDelete, useGetById } from '@feature/barrio/repositories/barrioRepository';

export const useListarBarrios = useList;
export const useCrearBarrio = useCreate;
export const useActualizarBarrio = useUpdate;
export const useEliminarBarrio = useDelete;
export const useBarrioPorId = useGetById;
