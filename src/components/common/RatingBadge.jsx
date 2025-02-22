import classNames from 'classnames';
import React from 'react';

import { formatRating, getRatingColor } from '../../utils/utils';
import styles from './RatingBadge.module.scss';

export default function RatingBadge({ rating }) {
  return (
    <div className={styles.ratingWrapper}>
      <span
        className={classNames(
          styles.MovieCard__rating,
          styles[`MovieCard__rating_${getRatingColor(rating)}`],
        )}
      >
        {formatRating(rating)}
      </span>
    </div>
  );
}
