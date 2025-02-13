import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './Layout';
import ActorDetail from './pages/ActorDetail';
import MovieDetail from './pages/MovieDetail';
import Movies from './pages/Movies';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Movies />,
        },
        {
          path: '/movie/:id',
          element: <MovieDetail />,
        },
        {
          path: '/actor/:id',
          element: <ActorDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
