import React from 'react';
import { useNavigate } from 'react-router-dom';

import './movies-list-title.scss';

export default function MoviesListTitle({ title }) {
  const navigate = useNavigate();
  return (
    <div className="movies-list-title__container">
      <button
        className="button movies-title__back-button"
        onClick={() => navigate(-1)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Назад
      </button>
      <h2 className="movies-list-title__title">{title}</h2>
    </div>
  );
}
