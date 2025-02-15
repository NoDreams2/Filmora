import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './Layout';
import { routes } from './pages/routes';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: routes,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
