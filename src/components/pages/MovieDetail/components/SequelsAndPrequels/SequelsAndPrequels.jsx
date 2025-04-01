import classNames from 'classnames';
import React from 'react';

import MovieCard from '../../../../ui/MovieCard';

import './sequels-and-prequels.scss';

const SequelsAndPrequels = ({
  sequelsData,
  scrollContainer,
  sequelsScrollRef,
  isLeftEdge,
  isRightEdge,
}) => {
  return (
    <div className="detail__additional">
      <h3 className="detail__additional-title">Сиквелы, приквелы и ремейки</h3>
      <div className="detail__additional-wrapper">
        <button
          className={classNames(
            'detail__scroll-button',
            'detail__scroll-button-left',
            {
              ['detail__scroll-button-hidden']: isLeftEdge,
              ['detail__scroll-button-visible']: isLeftEdge,
            },
          )}
          onClick={() => scrollContainer(sequelsScrollRef, 'left')}
        >
          &lt;
        </button>
        <div
          className="detail__additional-cards-container"
          ref={sequelsScrollRef}
        >
          {sequelsData.map(el => (
            <MovieCard key={el.kinopoiskId} movie={el} />
          ))}
        </div>
        <button
          className={classNames(
            'detail__scroll-button',
            'detail__scroll-button-right',
            {
              ['detail__scroll-button-hidden']: isRightEdge,
              ['detail__scroll-button-visible']: isRightEdge,
            },
          )}
          onClick={() => scrollContainer(sequelsScrollRef, 'right')}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
export default SequelsAndPrequels;
