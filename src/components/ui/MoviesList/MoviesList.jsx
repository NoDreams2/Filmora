import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';

import useWindowWidth from '../../../hooks/useWindowWidth';
import MovieCard from '../MovieCard';
import styles from './MoviesList.module.scss';

export default function MoviesList({ movies, totalPages, page, setPage }) {
  const windowWidth = useWindowWidth();
  const paginationSize = windowWidth <= 446 ? 'small' : 'large';

  return (
    <>
      <div className={styles.MoviesList__container}>
        {movies.map(movie => (
          <MovieCard key={movie.kinopoiskId} movie={movie} />
        ))}
      </div>
      <div className={styles.MoviesList__pagination}>
        <Pagination
          count={totalPages}
          variant="outlined"
          shape="rounded"
          size={paginationSize}
          page={page}
          onChange={setPage}
        />
      </div>
    </>
  );
}
