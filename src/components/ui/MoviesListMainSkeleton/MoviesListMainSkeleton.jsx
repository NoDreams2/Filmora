import React from 'react';

import MoviesListSkeleton from '../MoviesListSkeleton/MoviesListSkeleton';
import styles from './MoviesListMainSkeleton.module.scss';

export default function MoviesListMainSkeleton() {
  return (
    <div className={styles.skeleton__container}>
      <div className={styles.skeleton__header}>
        <div className={styles.skeleton__title}></div>
        <div className={styles.skeleton__forms}></div>
      </div>
      <MoviesListSkeleton />
      <div className={styles.skeleton__pagintaion}></div>
    </div>
  );
}
