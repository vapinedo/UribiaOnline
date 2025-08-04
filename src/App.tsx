import React from 'react';
import AppRouter from '@router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from '@infrastructure/providers/AppProviders';
import { useInitializeAuth } from '@feature/auth/hooks/useInitializeAuth';

export default function App() {
  const isInitializedAuth = useInitializeAuth();

  if (!isInitializedAuth) return null;

  return (
    <AppProviders>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppProviders>
  );
}
