import { useList, useCreate, useUpdate, useDelete, useGetById } from '@feature/resume/repositories/resumeRepository';

export const useListarResumes = useList;
export const useCrearResume = useCreate;
export const useActualizarResume = useUpdate;
export const useEliminarResume = useDelete;
export const useResumePorId = useGetById;
