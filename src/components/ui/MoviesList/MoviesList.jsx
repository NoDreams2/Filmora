import React from 'react';

import MovieCard from '../MovieCard';
import styles from './MoviesList.module.scss';

export default function MoviesList({ movies, totalPages, page, setPage }) {
  return (
    <>
      <div className={styles.MoviesList__container}>
        {movies.map(movie => (
          <MovieCard key={movie.kinopoiskId} movie={movie} />
        ))}
      </div>
    </>
  );
}
