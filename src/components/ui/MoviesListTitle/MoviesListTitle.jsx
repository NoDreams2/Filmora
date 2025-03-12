import React from 'react';
import { useNavigate } from 'react-router-dom';

import './movies-list-title.scss';

export default function MoviesListTitle({ title }) {
  const navigate = useNavigate();
  return (
    <div className="movies-list-title__container">
      <button className="button" onClick={() => navigate(-1)}>
        Назад
      </button>
      <h2 className="movies-list-title__title">{title}</h2>
    </div>
  );
}
