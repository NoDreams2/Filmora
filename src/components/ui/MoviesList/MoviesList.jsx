import { Pagination } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { EXCLUDE_GENRES } from '../../../constants';
import useWindowWidth from '../../../hooks/useWindowWidth';
import MovieCard from '../MovieCard';
import styles from './MoviesList.module.scss';

export default function MoviesList({ movies, totalPages, page, setPage }) {
  const windowWidth = useWindowWidth();
  const paginationSize = windowWidth <= 446 ? 'small' : 'large';

  const location = useLocation();

  const filteredMovies = movies.filter(
    movie =>
      movie.year !== null &&
      movie.genres.every(genre =>
        location.pathname !== '/films'
          ? !EXCLUDE_GENRES.includes(genre.genre)
          : ![...EXCLUDE_GENRES, 'мультфильм'].includes(genre.genre),
      ),
  );

  return (
    <>
      <div className={styles.MoviesList__container}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard key={movie.kinopoiskId} movie={movie} />
          ))
        ) : (
          <div className={styles.MoviesList__empty}>
            <div className={styles.MoviesList__emptyInner}>
              <div className={styles.MoviesList__emptyStars}>
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className={styles.MoviesList__emptyStar}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <span className={styles.MoviesList__emptyEmoji}>🎬</span>
              <h3 className={styles.MoviesList__emptyTitle}>
                Кинопустота
                <span className={styles.MoviesList__emptyColon}>:</span>
              </h3>
              <p className={styles.MoviesList__emptyText}>
                Вселенная кино свернулась в чёрную дыру
                <br />
                Попробуйте другие параметры поиска!
              </p>
              <div className={styles.MoviesList__emptyOrb} />
            </div>
          </div>
        )}
      </div>
      {filteredMovies.length > 0 && (
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
      )}
    </>
  );
}
