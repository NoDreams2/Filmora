import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { TOP_LISTS } from '../../../constants';
import { resetPage, setPage } from '../../../features/currentQuerySlice';
import { useGetFilmsTopQuery } from '../../../services/kinopoiskApi';
import MoviesList from '../../ui/MoviesList';
import styles from './MoviesListTop.module.scss';

export default function MoviesListTop() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const page = useSelector(state => state.currentQuery.page);

  const movieType = TOP_LISTS.find(el => el.url === location.pathname);

  const { data, error, isLoading } = useGetFilmsTopQuery({
    type: movieType.value,
    page,
  });

  useEffect(() => {
    dispatch(resetPage());
  }, [location, dispatch]);

  const handlePageChange = (_, value) => {
    dispatch(setPage(value));
  };

  if (error) return <p>Some error</p>;

  if (isLoading) return <p>Loading...</p>;

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
        setPage={handlePageChange}
      />
    </>
  );
}
