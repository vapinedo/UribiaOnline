import type { WithFieldValue, DocumentData } from 'firebase/firestore';
import { DEFAULT_STALE_TIME } from '@shared/constants/reactQuery.config';
import FirestoreGenericService from '@infrastructure/repositories/makeFirestoreRepository';
import { useQuery, useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';

export function useFirestoreCrud<T extends WithFieldValue<DocumentData>>(collectionName: string) {
  const queryClient = useQueryClient();
  const service = FirestoreGenericService<T>(collectionName);

  const useListar = () =>
    useQuery({
      queryKey: [collectionName],
      queryFn: service.listar,
      staleTime: DEFAULT_STALE_TIME,
    });

  const useCrear = (options?: UseMutationOptions<void, unknown, { entity: T; images?: FileList | null }>) =>
    useMutation({
      mutationFn: (data) => service.crear(data.entity, data.images),
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: [collectionName] });
        options?.onSuccess?.(...args);
      },
      onError: options?.onError,
    });

  const useActualizar = (
    options?: UseMutationOptions<void, unknown, { entity: T & { id: string }; images?: FileList | null }>
  ) =>
    useMutation({
      mutationFn: (data) => service.actualizar(data.entity, data.images),
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: [collectionName] });
        options?.onSuccess?.(...args);
      },
      onError: options?.onError,
    });

  const useEliminar = (options?: UseMutationOptions<void, unknown, string>) =>
    useMutation({
      mutationFn: (id) => service.eliminar(id),
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: [collectionName] });
        options?.onSuccess?.(...args);
      },
      onError: options?.onError,
    });

  const useObtenerPorId = (id?: string) =>
    useQuery({
      queryKey: [collectionName, id],
      queryFn: () => service.obtenerPorId(id!),
      enabled: !!id,
    });

  return {
    useListar,
    useCrear,
    useActualizar,
    useEliminar,
    useObtenerPorId,
  };
}
