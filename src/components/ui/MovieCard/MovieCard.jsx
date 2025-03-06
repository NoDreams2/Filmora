import classNames from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import RatingBadge from '../../common/RatingBadge';
import styles from './MovieCard.module.scss';

export default function MovieCard({ movie }) {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const lastPathParts = pathParts[pathParts.length - 1];
  const isLastSegmentNumber =
    !isNaN(lastPathParts) && lastPathParts.trim() !== '';

  return (
    <div
      className={classNames(styles.MovieCard__container, {
        [styles.MovieCard__container_size]: isLastSegmentNumber,
      })}
      key={movie.kinopoiskId}
    >
      <Link to={`/movie/${movie.kinopoiskId}`}>
        <div
          className={classNames(styles.MovieCard__imgContainer, {
            [styles.MovieCard__imgContainer_darkened]: isLastSegmentNumber,
          })}
        >
          <img
            className={classNames(styles.MovieCard__img, {
              [styles.MovieCard__img_size]: isLastSegmentNumber,
            })}
            src={movie.posterUrlPreview}
            alt={movie.nameRu}
          />
          {movie.ratingKinopoisk && (
            <RatingBadge rating={movie.ratingKinopoisk} />
          )}
        </div>
      </Link>
      <div>
        <h4
          className={classNames(styles.MovieCard__title, {
            [styles.MovieCard__title_size]: isLastSegmentNumber,
          })}
        >
          {movie.nameRu || movie.nameEn || movie.nameOriginal}
        </h4>
        {movie.genres && movie.genres.length > 0 && (
          <p className={styles.MovieCard__genre}>
            {movie.year + ', '}
            {movie.genres.map(genre => genre.genre).join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
