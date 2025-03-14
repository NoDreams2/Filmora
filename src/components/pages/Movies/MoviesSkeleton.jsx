import React from 'react';

import './movies-skeleton.scss';

export default function MoviesSkeleton() {
  return (
    <div className="movies-skeleton__wrap">
      {[...Array(5)].map((_, index) => (
        <div className="movies-skeleton__container" key={index}>
          <div className="movies-skeleton__title" />
          <div className="movies-skeleton__carousel">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="movies-skeleton__card" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
