import { Suspense } from 'react';
import { appRoutes } from './routesConfig';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@router/ProtectedRoute';
import MainLayout from '@shared/layouts/MainLayout';
import NotFoundPage from '@shared/pages/NotFoundPage';
import CircularProgress from '@mui/material/CircularProgress';

const FallbackLoader = () => <CircularProgress sx={{ display: 'block', margin: '4rem auto' }} />;

export default function AppRouter() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <Routes>
        {appRoutes.map(({ path, Component, isPrivate }) => {
          const element = isPrivate ? (
            <ProtectedRoute
              Component={() => (
                <MainLayout>
                  <Component />
                </MainLayout>
              )}
            />
          ) : (
            <Component />
          );

          return <Route key={path} path={path} element={element} />;
        })}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
