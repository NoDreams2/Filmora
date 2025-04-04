import React from 'react';

import MoviesListSkeleton from '../../ui/MoviesListSkeleton/MoviesListSkeleton';

import './movies-list-main-skeleton.scss';

export default function MoviesListMainSkeleton() {
  return (
    <div className="movies-list-main-skeleton__container">
      <div className="movies-list-main-skeleton__header">
        <div className="movies-list-main-skeleton__title">
          <div className="movies-list-main-skeleton__button"></div>
          <div className="movies-list-main-skeleton__titleText"></div>
        </div>
        <div className="movies-list-main-skeleton__forms">
          <div className="movies-list-main-skeleton__form"></div>
          <div className="movies-list-main-skeleton__form"></div>
          <div className="movies-list-main-skeleton__form"></div>
          <div className="movies-list-main-skeleton__form"></div>
        </div>
      </div>
      <MoviesListSkeleton />
    </div>
  );
}
