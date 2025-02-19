import React from 'react';

import MovieCard from '../MovieCard';

export default function MoviesList({ movies, totalPages, page, setPage }) {
  return (
    <>
      <div>
        {movies.map(movie => (
          <MovieCard key={movie.kinopoiskId} movie={movie} />
        ))}
      </div>
    </>
  );
}
