import React from 'react';

import { MOVIE_LISTS, TOP_LISTS } from '../../constants';
import MovieDetail from './MovieDetail';
import Movies from './Movies';
import MoviesListMain from './MoviesListMain';
import MoviesListTop from './MoviesListTop';
import NameDetail from './NameDetail/NameDetail';

export const routes = [
  {
    path: '/',
    element: <Movies />,
  },
  ...TOP_LISTS.map(el => ({
    path: el.url,
    element: <MoviesListTop />,
  })),
  ...MOVIE_LISTS.map(el => ({
    path: el.url,
    element: <MoviesListMain />,
  })),
  {
    path: '/movie/:id',
    element: <MovieDetail />,
  },
  {
    path: '/name/:id',
    element: <NameDetail />,
  },
];
