import classNames from 'classnames';
import React from 'react';

import './movie-rating.scss';

const MovieRating = ({ rating }) => {
  return (
    <div className="detail__bottom-part-rating">
      <h4 className="detail__bottom-part-rating-title">Рейтинг фильма</h4>
      <div className="detail__bottom-part-stars-container">
        {Array.from({ length: 10 }, (_, index) => {
          const isFilled = index < Math.floor(rating);
          const isPartiallyFilled =
            index === Math.floor(rating) && rating % 1 !== 0;
          const fillPercentage = isPartiallyFilled ? (rating % 1) * 100 : 0;
          return (
            <span
              key={index}
              className={classNames('detail__bottom-part-star', {
                'detail__bottom-part-star-filled': isFilled,
                'detail__bottom-part-star-partially-filled': isPartiallyFilled,
              })}
              style={{
                background: isPartiallyFilled
                  ? `linear-gradient(to right, #00a1e7 ${fillPercentage}%, #ccc ${fillPercentage}%)`
                  : undefined,
              }}
            ></span>
          );
        })}
      </div>
    </div>
  );
};
export default MovieRating;
