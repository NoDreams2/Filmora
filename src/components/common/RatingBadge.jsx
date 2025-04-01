import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router-dom';

import './rating-badge.scss';

import { getRatingColor } from '../../utils/format/rating';
import { formatRating } from '../../utils/format/text';

export default function RatingBadge({ rating }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div
      className={classNames('rating-badge', {
        'rating-badge--bottom': isHomePage,
      })}
    >
      <span
        className={`rating-badge__value rating-badge__value--${getRatingColor(rating)}`}
      >
        {formatRating(rating)}
      </span>
    </div>
  );
}
