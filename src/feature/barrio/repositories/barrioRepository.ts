import { createFeatureRepository } from '@core/factories/createFeatureRepository';
import { Barrio } from '@feature/barrio/models/Barrio';

const { repository, hooks } = createFeatureRepository<Barrio>('barrios');

export const barrioRepository = repository;
export const { useList, useCreate, useUpdate, useDelete, useGetById } = hooks;
