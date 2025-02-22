import React from 'react';
import { Link } from 'react-router-dom';

import RatingBadge from '../../common/RatingBadge';
import styles from './MovieCard.module.scss';

export default function MovieCard({ movie }) {
  return (
    <div className={styles.MovieCard__container} key={movie.kinopoiskId}>
      <Link to={`/movie/${movie.kinopoiskId}`}>
        <div className={styles.MovieCard__imgContainer}>
          <img
            className={styles.MovieCard__img}
            src={movie.posterUrlPreview}
            alt={movie.nameRu}
          />
          {movie.ratingKinopoisk && (
            <RatingBadge rating={movie.ratingKinopoisk} />
          )}
        </div>
      </Link>
      <div>
        <h4 className={styles.MovieCard__title}>
          {movie.nameRu ? movie.nameRu : movie.nameEn}
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
