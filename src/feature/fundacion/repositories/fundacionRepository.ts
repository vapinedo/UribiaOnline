import { Fundacion } from '@feature/fundacion/models/Fundacion';
import { fundacionConfig } from '@feature/fundacion/FundacionConfig';
import { createFeatureRepository } from '@core/factories/createFeatureRepository';

const { repository, hooks } = createFeatureRepository<Fundacion>(fundacionConfig.collectionName);

export const fundacionRepository = repository;
export const { useList, useCreate, useUpdate, useDelete, useGetById } = hooks;