import { lazyImport } from '@shared/utils/lazyImport';

const LoginPage = lazyImport(() => import('@feature/auth/pages/LoginPage'));
const PersonasRouter = lazyImport(() => import('@feature/persona/PersonaRouter'));
const RegisterPage = lazyImport(() => import('@feature/auth/pages/RegisterPage'));
const DashboardPage = lazyImport(() => import('@feature/dashboard/pages/DashboardPage'));
const ResetPasswordPage = lazyImport(() => import('@feature/auth/pages/ResetPasswordPage'));

export interface AppRoute {
  path: string;
  isPrivate?: boolean;
  Component: React.ComponentType;
}

export const appRoutes: AppRoute[] = [
  {
    path: '/login',
    Component: LoginPage,
    isPrivate: false,
  },
  {
    path: '/register',
    Component: RegisterPage,
    isPrivate: false,
  },
  {
    path: '/reset-password',
    Component: ResetPasswordPage,
    isPrivate: false,
  },
  {
    path: '/',
    Component: DashboardPage,
    isPrivate: true,
  },
  {
    path: '/personas/*',
    Component: PersonasRouter,
    isPrivate: true,
  },
];
