import React from 'react';

import MoviesListSkeleton from '../../ui/MoviesListSkeleton/MoviesListSkeleton';

import './MoviesListTopSkeleton.scss';

export default function MoviesListTopSkeleton() {
  return (
    <div className="movies-list-top-skeleton__container">
      <div className="movies-list-top-skeleton__header">
        <div className="movies-list-top-skeleton__button"></div>
        <div className="movies-list-top-skeleton__title"></div>
      </div>
      <MoviesListSkeleton />
    </div>
  );
}
