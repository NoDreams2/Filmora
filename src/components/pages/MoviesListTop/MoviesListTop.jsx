import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { TOP_LISTS } from '../../../constants';
import { resetPage, setPage } from '../../../features/currentQuerySlice';
import { useGetFilmsTopQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import MoviesList from '../../ui/MoviesList';
import MoviesListTitle from '../../ui/MoviesListTitle';
import MoviesListTopSkeleton from './MoviesListTopSkeleton';

import './MoviesListTop.scss';

export default function MoviesListTop() {
  const dispatch = useDispatch();
  const location = useLocation();
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

  if (isLoading) return <MoviesListTopSkeleton />;

  return (
    <div className="MoviesListTop__container">
      <MoviesListTitle title={movieType.title} />
      {data && (
        <MoviesList
          movies={data.items}
          totalPages={data.totalPages}
          page={page}
          setPage={handlePageChange}
        />
      )}
    </div>
  );
}
