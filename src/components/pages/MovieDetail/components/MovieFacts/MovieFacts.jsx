import React from 'react';

import './movie-facts.scss';

const MovieFacts = ({
  factsWithoutSpoilers,
  visibleFactsWithoutSpoilers,
  factsWithSpoilers,
  visibleFactsWithSpoilers,
  loadMoreFacts,
}) => {
  return (
    <div className="detail__bottom-part-knows">
      <h4 className="detail__bottom-part-knows-title">Знаете ли вы, что...</h4>
      <ul className="detail__bottom-part-knows-list">
        {visibleFactsWithoutSpoilers.map((fact, index) => (
          <li
            key={index}
            className="detail__bottom-part-knows-item"
            dangerouslySetInnerHTML={{ __html: fact.text }}
          />
        ))}
        {factsWithoutSpoilers.length === visibleFactsWithoutSpoilers.length &&
          factsWithSpoilers.length > 0 && (
            <div className="detail__bottom-part-knows-attention">
              Внимание! Дальнейший список фактов о фильме содержит спойлеры.
              Будьте осторожны.
            </div>
          )}
        {visibleFactsWithSpoilers.map((fact, index) => (
          <li
            key={index + visibleFactsWithoutSpoilers.length}
            className="detail__bottom-part-knows-item"
            dangerouslySetInnerHTML={{ __html: fact.text }}
          />
        ))}
      </ul>
      {(factsWithoutSpoilers.length > visibleFactsWithoutSpoilers.length ||
        factsWithSpoilers.length > visibleFactsWithSpoilers.length) && (
        <button
          className="button detail__bottom-part-button"
          onClick={loadMoreFacts}
        >
          Показать еще
        </button>
      )}
    </div>
  );
};
export default MovieFacts;
