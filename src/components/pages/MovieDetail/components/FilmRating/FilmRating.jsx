import React from 'react';

import './film-rating.scss';

import {
  formatRating,
  getDeclensionRatingText,
} from '../../../../../utils/format/text';

const FilmRating = ({ rating, voteCount }) => {
  return (
    <div className="detail__right-part-rating">
      <span className="detail__right-part-rating-kinopoisk">
        {formatRating(rating)}
      </span>
      {voteCount && (
        <span className="detail__right-part-vote-count">
          {voteCount.toLocaleString('ru-RU')}{' '}
          {getDeclensionRatingText(voteCount)}
        </span>
      )}
    </div>
  );
};
export default FilmRating;
