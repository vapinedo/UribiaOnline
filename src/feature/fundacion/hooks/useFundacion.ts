import { useList, useCreate, useUpdate, useDelete, useGetById } from '@feature/fundacion/repositories/fundacionRepository';

export const useListarFundacions = useList;
export const useCrearFundacion = useCreate;
export const useActualizarFundacion = useUpdate;
export const useEliminarFundacion = useDelete;
export const useFundacionPorId = useGetById;