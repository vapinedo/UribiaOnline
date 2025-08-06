import { Propiedad } from '@feature/propiedad/models/Propiedad';
import { propiedadConfig } from '@feature/propiedad/PropiedadConfig';
import { createFeatureRepository } from '@core/factories/createFeatureRepository';

const { repository, hooks } = createFeatureRepository<Propiedad>(propiedadConfig.collectionName);

export const propiedadRepository = repository;
export const { useList, useCreate, useUpdate, useDelete, useGetById } = hooks;