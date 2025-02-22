import React from 'react';

import styles from './MoviesSkeleton.module.scss';

export default function MoviesSkeleton() {
  return (
    <div className={styles.container}>
      {[...Array(5)].map((_, index) => (
        <div className={styles.skeletonContainer} key={index}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonCarousel}>
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className={styles.skeletonCard} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
