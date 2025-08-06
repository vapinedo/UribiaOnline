import React from 'react';
import { ReactQueryProvider } from '@infra/providers/QueryClientProvider';
import { MuiLocalizationProvider } from '@infra/providers/LocalizationProvider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <MuiLocalizationProvider>{children}</MuiLocalizationProvider>
    </ReactQueryProvider>
  );
};
