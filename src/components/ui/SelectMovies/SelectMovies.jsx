import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';

import '.././../common/button.scss';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  resetPage,
  resetQuery,
  selectQuery,
} from '../../../features/currentQuerySlice';

import './select-movies.scss';

export default function SelectMovies({
  countriesList,
  genresList,
  order,
  year,
  genreId,
  countries,
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isSortOpen, setSortOpen] = useState(false);
  const [isCountryOpen, setCountryOpen] = useState(false);
  const [isGenreOpen, setGenreOpen] = useState(false);
  const [isYearOpen, setYearOpen] = useState(false);

  const isCartoonsPage = location.pathname === '/cartoons';

  const ordersList = [
    { title: 'По рейтингу', value: 'RATING' },
    { title: 'По голосам', value: 'NUM_VOTE' },
  ];

  const yearsList = new Array(60).fill(null).map((_, index) => ({
    title: new Date().getFullYear() - index,
    value: new Date().getFullYear() - index,
  }));

  const handleFilterChange = (key, value) => {
    dispatch(resetPage());
    dispatch(selectQuery({ [key]: value }));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isSortOpen || isCountryOpen || isGenreOpen || isYearOpen) {
        setSortOpen(false),
          setCountryOpen(false),
          setGenreOpen(false),
          setYearOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSortOpen, isCountryOpen, isGenreOpen, isYearOpen]);

  return (
    <div className="select-movies__container">
      <FormControl fullWidth size="small">
        <InputLabel className="select-movies__input-label">
          Сортировка
        </InputLabel>
        <Select
          label="Сортировка"
          value={order}
          open={isSortOpen}
          onOpen={() => setSortOpen(true)}
          onClose={() => setSortOpen(false)}
          onChange={e => handleFilterChange('order', e.target.value)}
        >
          {ordersList.map(order => (
            <MenuItem key={order.value} value={order.value}>
              {order.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel className="select-movies__input-label">Страна</InputLabel>
        <Select
          label="Страна"
          value={countries}
          open={isCountryOpen}
          onOpen={() => setCountryOpen(true)}
          onClose={() => setCountryOpen(false)}
          onChange={e => handleFilterChange('countries', e.target.value)}
        >
          {countriesList.map(country => (
            <MenuItem key={country.id} value={country.id}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!isCartoonsPage && (
        <FormControl fullWidth size="small">
          <InputLabel className="select-movies__input-label">Жанр</InputLabel>
          <Select
            label="Жанр"
            value={genreId}
            open={isGenreOpen}
            onOpen={() => setGenreOpen(true)}
            onClose={() => setGenreOpen(false)}
            onChange={e => handleFilterChange('genreId', e.target.value)}
          >
            {genresList.map(genre => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <FormControl fullWidth size="small">
        <InputLabel className="select-movies__input-label">Год</InputLabel>
        <Select
          label="Год"
          value={year}
          open={isYearOpen}
          onOpen={() => setYearOpen(true)}
          onClose={() => setYearOpen(false)}
          onChange={e => handleFilterChange('year', e.target.value)}
        >
          {yearsList.map(year => (
            <MenuItem key={year.value} value={year.value}>
              {year.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <button className="button" onClick={() => dispatch(resetQuery())}>
          Сбросить
        </button>
      </div>
    </div>
  );
}
