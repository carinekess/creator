import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import RoleGuard from './components/AuthGuard'; // Import the RoleGuard

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Element = route.element;

        // Check if the route has roles defined
        const hasGuard = route.roles && route.roles.length > 0;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              hasGuard ? ( // Conditionally use RoleGuard if roles are defined
                <RoleGuard roles={route.roles}>
                  <Layout>
                    {route.routes ? renderRoutes(route.routes) : <Element props={true} />}
                  </Layout>
                </RoleGuard>
              ) : (
                <Layout>
                  {route.routes ? renderRoutes(route.routes) : <Element props={true} />}
                </Layout>
              )
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/logout', // Add the logout route
    element: lazy(() => import('./components/Logout')) // Use the Logout component
  },
  {
    exact: 'true',
    path: '/auth/signin',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup',
    element: lazy(() => import('./views/auth/signup/sign'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [

      {
        exact: 'true',
        path: '/admin/dashboard',
        
        element: lazy(() => import('./views/admin/dashboard')),

        roles: ['admin'], // Only admins and contributors can access
      },
      {
        exact: 'true',
        path: '/admin/AddArtist',
        element: lazy(() => import('./views/admin/AddArtist')),
        roles: ['admin'], // Only admins  can access
      },
      {
        exact: 'true',
        path: '/admin/ViewArtist',

        element: lazy(() => import('./views/admin/ViewArtist')),

        roles: ['admin'], // Only admins  can access
      },
      {
        exact: 'true',
        path: '/admin/add-artwork',

        element: lazy(() => import('./views/admin/add-artwork')),

        roles: ['admin'], // Only admins  can access
      },
      {
        exact: 'true',
        path: '/admin/view-artwork',

        element: lazy(() => import('./views/admin/view-artwork')),

        roles: ['admin'], // Only admins  can access
      },
      {
        exact: 'true',
        path: '/admin/artwork-payments/:artwork_id',

        element: lazy(() => import('./views/admin/payments')),

        roles: ['admin'], // Only admins  can access
      },
      {
        exact: 'true',
        path: '/client/mypayments',

        element: lazy(() => import('./views/client/payments')),

        roles: ['client'], // Only admins  can access
      },


      {
        exact: 'true',
        path: '/client/dashboard',
        
        element: lazy(() => import('./views/client/dashboard')),

        roles: ['client'], // Only admins and contributors can access
      },
      {
        exact: 'true',
        path: '/client/view-artwork',

        element: lazy(() => import('./views/client/view-artwork')),

        roles: ['client'], // Only admins  can access
      },
      {
        exact: 'true',
        path: '/pay/:artwork_id',
        element: lazy(() => import('./views/client/payment')), // Point to your Contribute component
        roles: ['client'], // Only contributors can access
      },
      {
        exact: 'true',
        path: '/waiting/:tx_ref',
        element: lazy(() => import('./views/client/waiting')), // Point to your Contribute component
        roles: ['client'], // Only contributors can access
      },
      {
        exact: 'true',
        path: '/receipt/:tx_ref/view',
        element: lazy(() => import('./views/client/ReceiptPage')), // Point to your Contribute component
        roles: ['client','admin'], // Only contributors can access
      },


      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
