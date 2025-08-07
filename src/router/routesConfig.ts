import { lazyImport } from '@shared/utils/lazyImport';

const LoginPage = lazyImport(() => import('@feature/auth/pages/LoginPage'));
const BarrioRouter = lazyImport(() => import('@feature/barrio/BarrioRouter'));
const RegisterPage = lazyImport(() => import('@feature/auth/pages/RegisterPage'));
const FundacionRouter = lazyImport(() => import('@feature/fundacion/FundacionRouter'));
const FormatoRPPRouter = lazyImport(() => import('@feature/formatoRPP/FormatoRPPRouter'));
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
    path: '/barrios/*',
    Component: BarrioRouter,
    isPrivate: true,
  },
  {
    path: '/formato-rpp/*',
    Component: FormatoRPPRouter,
    isPrivate: true,
  },
  {
    path: '/fundaciones/*',
    Component: FundacionRouter,
    isPrivate: true,
  },
];
