import React from 'react';

import './movies-list-skeleton.scss';

export default function MoviesListSkeleton() {
  return (
    <>
      <div className="movies-list-skeleton__grid">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="movies-list-skeleton__card">
            <div className="movies-list-skeleton__image"></div>
            <div className="movies-list-skeleton__rating"></div>
            <div className="movies-list-skeleton__text">
              <div className="movies-list-skeleton__text-line-short"></div>
              <div className="movies-list-skeleton__text-line"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="movies-list-skeleton__pagination"></div>
    </>
  );
}
