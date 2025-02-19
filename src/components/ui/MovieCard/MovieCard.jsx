import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <div key={movie.kinopoiskId}>
      <Link to={`/movie/${movie.kinopoiskId}`}>
        <img src={movie.posterUrlPreview} alt={movie.nameRu} />
      </Link>
      <h4>{movie.nameRu ? movie.nameRu : movie.nameEn}</h4>

      {/* TODO Rating с проверкой на то что он есть */}
    </div>
  );
}
