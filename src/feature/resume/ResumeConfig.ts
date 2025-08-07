import { createFeatureConfig } from '@core/factories/createFeatureConfig';

export const resumeConfig = createFeatureConfig({
  name: 'resume',
  collectionName: 'resumes',
  routePath: '/resumes',
});
