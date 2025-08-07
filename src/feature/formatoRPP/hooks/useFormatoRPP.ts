import { useList, useCreate, useUpdate, useDelete, useGetById } from '@feature/formatoRPP/repositories/formatoRPPRepository';

export const useListarFormatoRPPs = useList;
export const useCrearFormatoRPP = useCreate;
export const useActualizarFormatoRPP = useUpdate;
export const useEliminarFormatoRPP = useDelete;
export const useFormatoRPPPorId = useGetById;