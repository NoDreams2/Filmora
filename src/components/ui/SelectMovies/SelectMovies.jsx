import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

import '.././../common/button.scss';

import { useDispatch } from 'react-redux';

import { resetQuery, selectQuery } from '../../../features/currentQuerySlice';
import styles from './SelectMovies.module.scss';

export default function SelectMovies({
  countriesList,
  genresList,
  order,
  year,
  genreId,
  countries,
}) {
  const dispatch = useDispatch();

  const ordersList = [
    { title: 'По рейтингу', value: 'RATING' },
    { title: 'По голосам', value: 'NUM_VOTE' },
  ];

  const yearsList = new Array(600).fill(null).map((_, index) => ({
    title: new Date().getFullYear() - index,
    value: new Date().getFullYear() - index,
  }));

  return (
    <div className={styles.select__container}>
      <FormControl fullWidth size="small">
        <InputLabel className={styles.select__inputLabel}>
          Сортировка
        </InputLabel>
        <Select
          label="Сортировка"
          value={order}
          onChange={e => {
            dispatch(selectQuery({ order: e.target.value }));
          }}
        >
          {ordersList.map(order => (
            <MenuItem key={order.value} value={order.value}>
              {order.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel className={styles.select__inputLabel}>Страна</InputLabel>
        <Select
          label="Страна"
          value={countries}
          onChange={e => {
            dispatch(selectQuery({ countries: e.target.value }));
          }}
        >
          {countriesList.map(country => (
            <MenuItem key={country.id} value={country.id}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel className={styles.select__inputLabel}>Жанр</InputLabel>
        <Select
          label="Жанр"
          value={genreId}
          onChange={e => {
            dispatch(selectQuery({ genreId: e.target.value }));
          }}
        >
          {genresList.map(genre => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel className={styles.select__inputLabel}>Год</InputLabel>
        <Select
          label="Год"
          value={year}
          onChange={e => {
            dispatch(selectQuery({ year: e.target.value }));
          }}
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
