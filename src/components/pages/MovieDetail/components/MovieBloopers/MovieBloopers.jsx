import PropTypes from 'prop-types';
import React from 'react';

import './movie-bloopers.scss';

const MovieBloopers = ({ bloopers, visibleCount, onLoadMore }) => {
  const visibleBloopers = bloopers.slice(0, visibleCount);

  return (
    <div className="detail__bottom-part-knows">
      <h4 className="detail__bottom-part-knows-title detail__bottom-part-knows-title_maring-bottom">
        Ошибки в фильме
      </h4>
      <div className="detail__bottom-part-knows-attention">
        Внимание! Список ошибок в фильме может содержать спойлеры. Будьте
        осторожны.
      </div>
      <ul className="detail__bottom-part-knows-list">
        {visibleBloopers.map((blooper, index) => (
          <li
            key={index}
            className="detail__bottom-part-knows-item"
            dangerouslySetInnerHTML={{ __html: blooper.text }}
          />
        ))}
      </ul>
      {bloopers.length > visibleCount && (
        <button
          className="button detail__bottom-part-button"
          onClick={onLoadMore}
        >
          Показать еще
        </button>
      )}
    </div>
  );
};

MovieBloopers.propTypes = {
  bloopers: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  visibleCount: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default MovieBloopers;
