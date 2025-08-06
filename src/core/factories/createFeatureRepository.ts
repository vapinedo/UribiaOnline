import type { WithFieldValue, DocumentData } from 'firebase/firestore';
import { useFirestoreCrud } from '@infrastructure/hooks/useFirestoreCrud';
import makeFirestoreRepository from '@infrastructure/repositories/makeFirestoreRepository';

export function createFeatureRepository<T extends WithFieldValue<DocumentData>>(collectionName: string) {
  const repository = makeFirestoreRepository<T>(collectionName);

  return {
    repository,
    hooks: {
      useList: () => useFirestoreCrud<T>(collectionName).useListar(),
      useCreate: (opts?: any) => useFirestoreCrud<T>(collectionName).useCrear(opts),
      useUpdate: (opts?: any) => useFirestoreCrud<T>(collectionName).useActualizar(opts),
      useDelete: (opts?: any) => useFirestoreCrud<T>(collectionName).useEliminar(opts),
      useGetById: (id: string) => useFirestoreCrud<T>(collectionName).useObtenerPorId(id),
    },
  };
}
