import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

import '.././../common/button.scss';

import styles from './SelectMovies.module.scss';

export default function SelectMovies() {
  return (
    <div className={styles.select__container}>
      <FormControl fullWidth size="small">
        <InputLabel className={styles.select__inputLabel}>
          Сортировка
        </InputLabel>
        <Select label="Сортировка">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel className={styles.select__inputLabel}>Страна</InputLabel>
        <Select label="Страна">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel className={styles.select__inputLabel}>Жанр</InputLabel>
        <Select label="Жанр">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel className={styles.select__inputLabel}>Год</InputLabel>
        <Select label="Год">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <div>
        <button className="button">Сбросить</button>
      </div>
    </div>
  );
}
