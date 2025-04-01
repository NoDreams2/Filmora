import classNames from 'classnames';
import React from 'react';

import MovieCard from '../../../../ui/MovieCard';

import './similar-movies.scss';

const SimilarMovies = ({
  similarMovies,
  isLeftEdge,
  isRightEdge,
  scrollContainer,
  similarsScrollRef,
}) => {
  return (
    <div className="detail__additional detail__additional_padding-not detail__additional_full-width detail__additional_margin-bottom">
      <h4 className="detail__additional-title">
        Если вам понравился этот фильм
      </h4>
      <div className="detail__additional-wrapper">
        <button
          className={classNames(
            'detail__scroll-button detail__scroll-button_top',
            'detail__scroll-button-left',
            {
              ['detail__scroll-button-hidden']: isLeftEdge,
              ['detail__scroll-button-visible']: isLeftEdge,
            },
          )}
          onClick={() => scrollContainer(similarsScrollRef, 'left')}
        >
          &lt;
        </button>
        <div
          className="detail__additional-cards-container"
          ref={similarsScrollRef}
        >
          {similarMovies.map(el => (
            <MovieCard key={el.kinopoiskId} movie={el} />
          ))}
        </div>
        <button
          className={classNames(
            'detail__scroll-button detail__scroll-button_top',
            'detail__scroll-button-right',
            {
              ['detail__scroll-button-hidden']: isRightEdge,
              ['detail__scroll-button-visible']: isRightEdge,
            },
          )}
          onClick={() => scrollContainer(similarsScrollRef, 'right')}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
export default SimilarMovies;
