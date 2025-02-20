import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { TOP_LISTS } from '../../../constants';
import { useGetFilmsTopQuery } from '../../../services/kinopoiskApi';
import MoviesList from '../../ui/MoviesList';
import styles from './MoviesListTop.module.scss';

export default function MoviesListTop() {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const movieType = TOP_LISTS.find(el => el.url === location.pathname);

  const { data, error, isLoading } = useGetFilmsTopQuery({
    type: movieType.value,
    page,
  });

  if (error) return <p>Some error</p>;

  if (isLoading) return <p>Loading...</p>;

  console.log(data, error, isLoading);

  return (
    <>
      <div className={styles.MoviesListTop__container}>
        <button
          className={styles.MoviesListTop__button}
          onClick={() => navigate(-1)}
        >
          Назад
        </button>
        <h2 className={styles.MoviesListTop__title}>{movieType.title}</h2>
      </div>
      <MoviesList
        movies={data.items}
        totalPages={data.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
