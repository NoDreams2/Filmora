import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { TOP_LISTS } from '../../../constants';
import { resetPage, setPage } from '../../../features/currentQuerySlice';
import { useGetFilmsTopQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import MoviesList from '../../ui/MoviesList';
import styles from './MoviesListTop.module.scss';
import MoviesListTopSkeleton from './MoviesListTopSkeleton';

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

  if (error)
    return (
      <ErrorMessage message="Не удалось загрузить список фильмов. Проверьте интернет-соединение и попробуйте снова." />
    );

  if (!isLoading) return <MoviesListTopSkeleton></MoviesListTopSkeleton>;

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
      {data && (
        <MoviesList
          movies={data.items}
          totalPages={data.totalPages}
          page={page}
          setPage={handlePageChange}
        />
      )}
    </>
  );
}
