import React from 'react';

import styles from './MoviesListSkeleton.module.scss';

export default function MoviesListSkeleton() {
  return (
    <div className={styles.skeleton__grid}>
      {[...Array(20)].map((_, index) => (
        <div key={index} className={styles.skeleton__card}>
          <div className={styles.skeleton__image}></div>
          <div className={styles.skeleton__rating}></div>
          <div className={styles.sleketon__text}>
            <div className={styles.skeleton__textLineShort}></div>
            <div className={styles.skeleton__textLine}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
