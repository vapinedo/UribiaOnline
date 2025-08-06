import { Barrio } from '@feature/barrio/models/Barrio';
import { barrioConfig } from '@feature/barrio/BarrioConfig';
import { createFeatureRepository } from '@core/factories/createFeatureRepository';

const { repository, hooks } = createFeatureRepository<Barrio>(barrioConfig.collectionName);

export const barrioRepository = repository;
export const { useList, useCreate, useUpdate, useDelete, useGetById } = hooks;
