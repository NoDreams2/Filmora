import React from 'react';

import MoviesListSkeleton from '../MoviesListSkeleton/MoviesListSkeleton';
import styles from './MoviesListMainSkeleton.module.scss';

export default function MoviesListMainSkeleton() {
  return (
    <div className={styles.skeleton__container}>
      <div className={styles.skeleton__header}>
        <div className={styles.skeleton__title}>
          <div className={styles.skeleton__button}></div>
          <div className={styles.skeleton__titleText}></div>
        </div>
        <div className={styles.skeleton__forms}>
          <div className={styles.skeleton__form}></div>
          <div className={styles.skeleton__form}></div>
          <div className={styles.skeleton__form}></div>
          <div className={styles.skeleton__form}></div>
          <div className={styles.skeleton__formButton}></div>
        </div>
      </div>
      <MoviesListSkeleton />
    </div>
  );
}
