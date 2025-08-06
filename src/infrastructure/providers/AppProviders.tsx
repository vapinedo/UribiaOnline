import React from 'react';
import { ReactQueryProvider } from '@infrastructure/state/react-query/providers/QueryClientProvider';
import { MuiLocalizationProvider } from '@infrastructure/ui/mui/providers/LocalizationProvider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <MuiLocalizationProvider>{children}</MuiLocalizationProvider>
    </ReactQueryProvider>
  );
};
