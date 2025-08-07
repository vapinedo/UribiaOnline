import { Resume } from '@feature/resume/models/Resume';
import { resumeConfig } from '@feature/resume/ResumeConfig';
import { createFeatureRepository } from '@core/factories/createFeatureRepository';

const { repository, hooks } = createFeatureRepository<Resume>(resumeConfig.collectionName);

export const resumeRepository = repository;
export const { useList, useCreate, useUpdate, useDelete, useGetById } = hooks;
