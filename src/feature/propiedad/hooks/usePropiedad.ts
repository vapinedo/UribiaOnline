import { useList, useCreate, useUpdate, useDelete, useGetById } from '@feature/propiedad/repositories/propiedadRepository';

export const useListarPropiedads = useList;
export const useCrearPropiedad = useCreate;
export const useActualizarPropiedad = useUpdate;
export const useEliminarPropiedad = useDelete;
export const usePropiedadPorId = useGetById;