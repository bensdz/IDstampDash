import { lazy, Suspense } from 'react';
// import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import UserInfoPage from 'src/pages/userinfo';
import DashboardLayout from 'src/layouts/dashboard';
import Documentation from 'src/pages/Documentation';
import ResetPwEmail from 'src/pages/resetpwemail';
import ResetPw from 'src/pages/resetpw';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const CompaniesPage = lazy(() => import('src/pages/companies'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const SignUpPage = lazy(() => import('src/pages/signup'));

// ----------------------------------------------------------------------

export default function Router() {
  const userinfo = useAuthUser();
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: (
            <RequireAuth fallbackPath="/login">
              <IndexPage />
            </RequireAuth>
          ),
          index: true,
        },
        {
          path: 'users',
          element: (
            <RequireAuth fallbackPath="/login">
              <UserPage />
            </RequireAuth>
          ),
        },
        {
          path: 'companies',
          element: (
            <RequireAuth fallbackPath="/login">
              {userinfo?.role === 'admin' ? <CompaniesPage /> : <Navigate to="/404" replace />}
            </RequireAuth>
          ),
        },
        {
          path: 'users/:id',
          element: (
            <RequireAuth fallbackPath="/login">
              <UserInfoPage />
            </RequireAuth>
          ),
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'signup',
      element: <SignUpPage />,
    },
    {
      path: 'docs',
      element: <Documentation />,
    },
    {
      path: '/resetpw',
      element: <ResetPwEmail />,
    },
    {
      path: '/resetpw/change',
      element: <ResetPw />,
    },
  ]);

  return routes;
}
