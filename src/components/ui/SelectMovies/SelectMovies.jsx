import React from 'react';

import '.././../common/button.scss';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  resetPage,
  resetQuery,
  selectQuery,
} from '../../../features/currentQuerySlice';
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
  const location = useLocation();

  const isCartoonsPage = location.pathname === '/cartoons';

  const ordersList = [
    { title: 'По рейтингу', value: 'RATING' },
    { title: 'По голосам', value: 'NUM_VOTE' },
  ];

  const yearsList = new Array(40).fill(null).map((_, index) => ({
    title: new Date().getFullYear() - index,
    value: new Date().getFullYear() - index,
  }));

  const handleFilterChange = (key, value) => {
    dispatch(resetPage());
    dispatch(selectQuery({ [key]: value }));
  };

  return (
    <div className={styles.select__container}>
      <div className={styles.select__group}>
        <label className={styles.select__label}>Сортировка</label>
        <select
          className={styles.select__input}
          value={order}
          onChange={e => handleFilterChange('order', e.target.value)}
        >
          {ordersList.map(order => (
            <option key={order.value} value={order.value}>
              {order.title}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.select__group}>
        <label className={styles.select__label}>Страна</label>
        <select
          className={styles.select__input}
          value={countries}
          onChange={e => handleFilterChange('countries', e.target.value)}
        >
          {countriesList.map(country => (
            <option key={country.id} value={country.id}>
              {country.country}
            </option>
          ))}
        </select>
      </div>
      {!isCartoonsPage && (
        <div className={styles.select__group}>
          <label className={styles.select__label}>Жанр</label>
          <select
            className={styles.select__input}
            value={genreId}
            onChange={e => handleFilterChange('genreId', e.target.value)}
          >
            {genresList.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.genre}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className={styles.select__group}>
        <label className={styles.select__label}>Год</label>
        <select
          className={styles.select__input}
          value={year}
          onChange={e => handleFilterChange('year', e.target.value)}
        >
          {yearsList.map(year => (
            <option key={year.value} value={year.value}>
              {year.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button className="button" onClick={() => dispatch(resetQuery())}>
          Сбросить
        </button>
      </div>
    </div>
  );
}
