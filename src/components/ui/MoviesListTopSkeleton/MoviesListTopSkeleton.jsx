import React from 'react';

import MoviesListSkeleton from '../MoviesListSkeleton/MoviesListSkeleton';
import styles from './MoviesListTopSkeleton.module.scss';

export default function MoviesListTopSkeleton() {
  return (
    <div className={styles.skeleton__container}>
      <div className={styles.skeleton__header}>
        <div className={styles.skeleton__button}></div>
        <div className={styles.skeleton__title}></div>
      </div>
      <MoviesListSkeleton />
    </div>
  );
}
