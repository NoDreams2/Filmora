import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { MOVIE_LISTS } from '../../../constants';
import { resetPage, setPage } from '../../../features/currentQuerySlice';
import {
  useGetFilmsQuery,
  useGetGenresAndCountriesQuery,
} from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import MoviesList from '../../ui/MoviesList';
import MoviesListMainSkeleton from '../../ui/MoviesListMainSkeleton/MoviesListMainSkeleton';
import MoviesListSkeleton from '../../ui/MoviesListSkeleton/MoviesListSkeleton';
import MoviesListTitle from '../../ui/MoviesListTitle';
import SelectMovies from '../../ui/SelectMovies';

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

  const responseGenresAndCountries = useGetGenresAndCountriesQuery();

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

  if (responseFilms.isLoading || responseGenresAndCountries.isLoading)
    return (
      <>
        <MoviesListMainSkeleton />
        <MoviesListSkeleton />
      </>
    );

  return (
    <>
      <MoviesListTitle title={movieType.title} />
      <SelectMovies
        countriesList={responseGenresAndCountries.data.countries}
        genresList={responseGenresAndCountries.data.genres}
        order={order}
        year={year}
        genreId={genreId}
        countries={countries}
      />
      {responseFilms.data && (
        <MoviesList
          movies={responseFilms.data.items}
          totalPages={responseFilms.data.totalPages}
          page={page}
          setPage={handlePageChange}
        />
      )}
    </>
  );
}
