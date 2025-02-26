import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './MoviesListTitle.module.scss';

export default function MoviesListTitle({ title }) {
  const navigate = useNavigate();
  return (
    <div className={styles.MoviesListTitle__container}>
      <button className="button" onClick={() => navigate(-1)}>
        Назад
      </button>
      <h2 className={styles.MoviesListTitle__title}>{title}</h2>
    </div>
  );
}
