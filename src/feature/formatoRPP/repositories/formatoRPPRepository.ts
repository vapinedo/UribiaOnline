import { FormatoRPP } from '@feature/formatoRPP/models/FormatoRPP';
import { formatoRPPConfig } from '@feature/formatoRPP/FormatoRPPConfig';
import { createFeatureRepository } from '@core/factories/createFeatureRepository';

const { repository, hooks } = createFeatureRepository<FormatoRPP>(formatoRPPConfig.collectionName);

export const formatoRPPRepository = repository;
export const { useList, useCreate, useUpdate, useDelete, useGetById } = hooks;