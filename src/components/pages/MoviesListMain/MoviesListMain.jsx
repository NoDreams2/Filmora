import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import './movies-list-main.scss';

import { MOVIE_LISTS } from '../../../constants';
import { resetPage, setPage } from '../../../features/currentQuerySlice';
import {
  useGetFilmsQuery,
  useGetGenresAndCountriesQuery,
} from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import MoviesList from '../../ui/MoviesList';
import MoviesListTitle from '../../ui/MoviesListTitle';
import SelectMovies from '../../ui/SelectMovies';
import MoviesListMainSkeleton from './MoviesListMainSkeleton';

export default function MoviesListMain() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { countries, order, year, genreId } = useSelector(
    state => state.currentQuery,
  );

  const movieType = MOVIE_LISTS.find(el => el.url === location.pathname);
  const myGenreId = movieType.url === '/cartoons' ? 18 : genreId;

  if (!movieType) {
    return <ErrorMessage message="Некорректный URL адрес" />;
  }

  const page = useSelector(state => state.currentQuery.page);

  const responseFilms = useGetFilmsQuery({
    type: movieType.value,
    countries,
    order,
    year,
    genreId: myGenreId,
    page,
  });

  const responseGenresAndCountries = useGetGenresAndCountriesQuery({
    excludeCartoons: location.pathname === '/films',
  });

  useEffect(() => {
    dispatch(resetPage());
  }, [location, dispatch]);

  const handlePageChange = (_, value) => {
    dispatch(setPage(value));
  };

  if (responseFilms.error || responseGenresAndCountries.error)
    return (
      <ErrorMessage message="Не удалось загрузить список фильмов. Проверьте интернет-соединение и попробуйте снова." />
    );

  if (responseFilms.isLoading && responseGenresAndCountries.isLoading)
    return (
      <>
        <MoviesListMainSkeleton />
      </>
    );

  return (
    <div className="movies-list-main__container">
      <MoviesListTitle title={movieType.title} />
      {responseGenresAndCountries.data && (
        <SelectMovies
          countriesList={responseGenresAndCountries.data.countries}
          genresList={responseGenresAndCountries.data.genres}
          order={order}
          year={year}
          genreId={genreId}
          countries={countries}
        />
      )}
      {responseFilms.data && (
        <MoviesList
          movies={responseFilms.data.items}
          totalPages={responseFilms.data.totalPages}
          page={page}
          setPage={handlePageChange}
        />
      )}
    </div>
  );
}
