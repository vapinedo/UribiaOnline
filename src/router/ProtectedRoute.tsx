import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@core/stores/useAuthStore';

interface ProtectedRouteProps {
  Component: ComponentType<any>;
}

const ProtectedRoute = ({ Component }: ProtectedRouteProps) => {
  const { user, isInitialized } = useAuthStore();

  if (!isInitialized) {
    // Firebase aún no ha respondido: mostramos loader
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
