import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { formatRating, getRatingColor } from '../../utils/utils';

import './rating-badge.scss';

export default function RatingBadge({ rating }) {
  const location = useLocation();

  const checkCurrentPath = location.pathname === '/';

  return (
    <div className="rating__wrapper">
      <span
        className={classNames(
          'rating__container',
          `rating__container_${getRatingColor(rating)}`,
          checkCurrentPath && 'rating__container_bottom',
        )}
      >
        {formatRating(rating)}
      </span>
    </div>
  );
}
