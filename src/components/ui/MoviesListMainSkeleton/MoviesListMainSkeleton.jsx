import React from 'react';

import styles from './MoviesListMainSkeleton.module.scss';

export default function MoviesListMainSkeleton() {
  return (
    <div className={styles.skeleton__container}>
      <div className={styles.skeleton__forms}></div>
    </div>
  );
}
