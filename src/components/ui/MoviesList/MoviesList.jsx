import { Pagination } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { EXCLUDE_GENRES } from '../../../constants';
import useWindowWidth from '../../../hooks/useWindowWidth';
import MovieCard from '../MovieCard';

import './movies-list.scss';

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
      <div className="movies-list__container">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard key={movie.kinopoiskId} movie={movie} />
          ))
        ) : (
          <div className="movies-list__empty">
            <div className="movies-list__empty-inner">
              <div className="movies-list__empty-stars">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="movies-list__empty-star"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <span className="movies-list__empty-emoji">🎬</span>
              <h3 className="movies-list__empty-title">
                Кинопустота
                <span className="movies-list__empty-colon">:</span>
              </h3>
              <p className="movies-list__empty-text">
                Вселенная кино свернулась в чёрную дыру
                <br />
                Попробуйте другие параметры поиска!
              </p>
              <div className="movies-list__empty-orb" />
            </div>
          </div>
        )}
      </div>
      {filteredMovies.length > 0 && (
        <div className="movies-list__pagination">
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
