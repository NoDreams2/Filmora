import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import oscar from '../../../assets/images/oscar.svg';
import {
  useGetAwardsQuery,
  useGetBudgetAndFeesQuery,
  useGetDataFilmQuery,
  useGetFactsAndBloopersQuery,
  useGetListSimilarMoviesQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from '../../../services/kinopoiskApi';
import {
  formatRating,
  getDeclensionActorsText,
  getDeclensionRatingText,
} from '../../../utils/utils';
import ErrorMessage from '../../ui/ErrorMessage';
import MovieCard from '../../ui/MovieCard';

import './movie-detail.scss';

export default function MovieDetail() {
  const sequelsScrollRef = useRef(null);
  const similarsScrollRef = useRef(null);
  const { id } = useParams();
  const [isSequelsLeftEdge, setIsSequelsLeftEdge] = useState(true);
  const [isSequelsRightEdge, setIsSequelsRightEdge] = useState(false);
  const [isSimilarsLeftEdge, setIsSimilarsLeftEdge] = useState(true);
  const [isSimilarsRightEdge, setIsSimilarsRightEdge] = useState(false);
  const [
    visibleFactsWithoutSpoilersCount,
    setVisibleFactsWithoutSpoilersCount,
  ] = useState(3);
  const [visibleFactsWithSpoilersCount, setVisibleFactsWithSpoilersCount] =
    useState(0);
  const [bloopersCount, setBloopersCount] = useState(3);

  const responseDataFilm = useGetDataFilmQuery(id);
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);
  const responseBudgetAndFees = useGetBudgetAndFeesQuery(id);
  const responseAwards = useGetAwardsQuery(id);
  const responseListSimilarMovies = useGetListSimilarMoviesQuery(id);
  const responseFactsAndBloopers = useGetFactsAndBloopersQuery(id);

  useEffect(() => {
    const sequelsContainer = sequelsScrollRef.current;
    const similarsContainer = similarsScrollRef.current;

    const handleSequelsScroll = () =>
      checkScroll(
        sequelsScrollRef,
        setIsSequelsLeftEdge,
        setIsSequelsRightEdge,
      );
    const handleSimilarsScroll = () =>
      checkScroll(
        similarsScrollRef,
        setIsSimilarsLeftEdge,
        setIsSimilarsRightEdge,
      );

    if (sequelsContainer) {
      sequelsContainer.addEventListener('scroll', handleSequelsScroll);
      checkScroll(
        sequelsScrollRef,
        setIsSequelsLeftEdge,
        setIsSequelsRightEdge,
      );
    }
    if (similarsContainer) {
      similarsContainer.addEventListener('scroll', handleSimilarsScroll);
      checkScroll(
        similarsScrollRef,
        setIsSimilarsLeftEdge,
        setIsSimilarsRightEdge,
      );
    }

    return () => {
      if (sequelsContainer)
        sequelsContainer.removeEventListener('scroll', handleSequelsScroll);
      if (similarsContainer)
        similarsContainer.removeEventListener('scroll', handleSimilarsScroll);
    };
  });

  if (
    responseDataFilm.isLoading ||
    responseSequelsAndPrequels.isLoading ||
    responseStaff.isLoading ||
    responseBudgetAndFees.isLoading ||
    responseAwards.isLoading ||
    responseListSimilarMovies.isLoading
  ) {
    return <div>Загрузка...</div>;
  }

  if (
    responseDataFilm.error ||
    // TODO: Убрать комментарий после исправления ошибки на сервере
    // responseSequelsAndPrequels.error ||
    responseStaff.error ||
    responseBudgetAndFees.error ||
    responseAwards.error ||
    responseListSimilarMovies.error
  ) {
    return <ErrorMessage />;
  }

  const filteredFacts =
    responseFactsAndBloopers.data?.items.filter(el => el.type === 'FACT') || [];
  const factsWithoutSpoilers = filteredFacts.filter(el => el.spoiler === false);
  const factsWithSpoilers = filteredFacts.filter(el => el.spoiler === true);
  const visibleFactsWithoutSpoilers = factsWithoutSpoilers.slice(
    0,
    visibleFactsWithoutSpoilersCount,
  );
  const visibleFactsWithSpoilers = factsWithSpoilers.slice(
    0,
    visibleFactsWithSpoilersCount,
  );
  const loadMoreFacts = () => {
    if (visibleFactsWithoutSpoilersCount < factsWithoutSpoilers.length) {
      setVisibleFactsWithoutSpoilersCount(prevCount => prevCount + 10);
    } else {
      setVisibleFactsWithSpoilersCount(prevCount => prevCount + 10);
    }
  };

  const filteredBloopers =
    responseFactsAndBloopers.data?.items.filter(el => el.type === 'BLOOPER') ||
    [];
  const visiblefilteredBloopers = filteredBloopers.slice(0, bloopersCount);
  const loadMoreBloopers = () => {
    if (bloopersCount < filteredBloopers.length) {
      setBloopersCount(prevCount => prevCount + 10);
    }
  };

  const staffSlice = staffs => {
    const numberOfStaffs = staffs.map(staff =>
      staff.nameRu ? staff.nameRu : staff.nameEn,
    );
    if (staffs.length > 3) {
      return `${numberOfStaffs.slice(0, 3).join(', ')}, ...`;
    }
    return numberOfStaffs.join(', ');
  };

  const checkScroll = (ref, setIsLeft, setIsRight) => {
    const container = ref.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setIsLeft(scrollLeft === 0);
      setIsRight(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  const scrollContainer = (ref, direction, scrollAmount = 500) => {
    const container = ref.current;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const oscarWins = responseAwards.data?.items.filter(
    award => award.name === 'Оскар' && award.win === true,
  );

  return (
    <div className="movie-detail__wrap">
      <div className="movie-detail__container">
        <div className="movie-detail__left-part">
          <img
            className="movie-detail__left-part-poster"
            src={responseDataFilm.data.posterUrlPreview}
          />
          <div className="movie-detail__left-part-buttons">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={responseDataFilm.data.webUrl}
            >
              <button className="button button_small">Кинопоиск</button>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.imdb.com/title/${responseDataFilm.data.imdbId}`}
            >
              <button className="button button_small">IMDB</button>
            </a>
          </div>
        </div>
        <div className="movie-detail__center-part">
          <div className="movie-detail__center-part-main-title">
            <div className="movie-detail__center-part-title-desc">
              <h2 className="movie-detail__center-part-title">
                {responseDataFilm.data.nameRu ||
                  responseDataFilm.data.nameEn ||
                  responseDataFilm.data.nameOriginal}{' '}
                ({responseDataFilm.data.year})
              </h2>
              {responseDataFilm.data.shortDescription ? (
                <p className="movie-detail__center-part-description">
                  {responseDataFilm.data.shortDescription}
                </p>
              ) : (
                <span>Описание отсутствует</span>
              )}
            </div>
          </div>
          <div className="movie-detail__center-part-about-film">
            <div className="movie-detail__center-part-about-film-container">
              <h3 className="movie-detail__center-part-title-about">
                О фильме
              </h3>
              {responseDataFilm.data.year && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">
                    Год Производства
                  </span>
                  <span className="movie-detail__center-part-value">
                    {responseDataFilm.data.year}
                  </span>
                </div>
              )}
              {responseDataFilm.data.country && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">Страна</span>
                  <span className="movie-detail__center-part-value">
                    {responseDataFilm.data.countries
                      .map(country => country.country)
                      .join(', ')}
                  </span>
                </div>
              )}
              {responseDataFilm.data.genre && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">Жанр</span>
                  <span className="movie-detail__center-part-value">
                    {responseDataFilm.data.genres
                      .map(genre => genre.genre)
                      .join(', ')}
                  </span>
                </div>
              )}
              {responseDataFilm.data.slogan && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">Слоган</span>
                  <span className="movie-detail__center-part-value">
                    {responseDataFilm.data.slogan}
                  </span>
                </div>
              )}
              {responseStaff.data.some(
                el => el.professionKey === 'DIRECTOR',
              ) && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">
                    Режиссер
                  </span>
                  <span className="movie-detail__center-part-value">
                    {staffSlice(
                      responseStaff.data.filter(
                        el => el.professionKey === 'DIRECTOR',
                      ),
                    )}
                  </span>
                </div>
              )}
              {responseStaff.data.some(el => el.professionKey === 'WRITER') && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">
                    Сценарий
                  </span>
                  <span className="movie-detail__center-part-value">
                    {staffSlice(
                      responseStaff.data.filter(
                        el => el.professionKey === 'WRITER',
                      ),
                    )}
                  </span>
                </div>
              )}
              {responseStaff.data.some(
                el => el.professionKey === 'PRODUCER',
              ) && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">
                    Продюсер
                  </span>
                  <span className="movie-detail__center-part-value">
                    {staffSlice(
                      responseStaff.data.filter(
                        el => el.professionKey === 'PRODUCER',
                      ),
                    )}
                  </span>
                </div>
              )}
              {responseStaff.data.some(
                el => el.professionKey === 'OPERATOR',
              ) && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">
                    Оператор
                  </span>
                  <span className="movie-detail__center-part-value">
                    {staffSlice(
                      responseStaff.data.filter(
                        el => el.professionKey === 'OPERATOR',
                      ),
                    )}
                  </span>
                </div>
              )}
              {responseStaff.data.some(
                el => el.professionKey === 'COMPOSER',
              ) && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">
                    Композитор
                  </span>
                  <span className="movie-detail__center-part-value">
                    {staffSlice(
                      responseStaff.data.filter(
                        el => el.professionKey === 'COMPOSER',
                      ),
                    )}
                  </span>
                </div>
              )}
              {responseStaff.data.some(el => el.professionKey === 'DESIGN') && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">
                    Художник
                  </span>
                  <span className="movie-detail__center-part-value">
                    {staffSlice(
                      responseStaff.data.filter(
                        el => el.professionKey === 'DESIGN',
                      ),
                    )}
                  </span>
                </div>
              )}
              {responseStaff.data.some(el => el.professionKey === 'EDITOR') && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">Монтаж</span>
                  <span className="movie-detail__center-part-value">
                    {staffSlice(
                      responseStaff.data.filter(
                        el => el.professionKey === 'EDITOR',
                      ),
                    )}
                  </span>
                </div>
              )}
              {responseBudgetAndFees.data.items.some(
                el => el.type === 'BUDGET',
              ) && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">Бюджет</span>
                  <span className="movie-detail__center-part-value">
                    $
                    {responseBudgetAndFees.data.items
                      .find(el => el.type === 'BUDGET')
                      .amount.toLocaleString('ru-RU')}
                  </span>
                </div>
              )}
              {responseBudgetAndFees.data.items.some(
                el => el.type === 'USA',
              ) && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">
                    Сборы в США
                  </span>
                  <span className="movie-detail__center-part-value">
                    $
                    {responseBudgetAndFees.data.items
                      .find(el => el.type === 'USA')
                      .amount.toLocaleString('ru-RU')}
                  </span>
                </div>
              )}
              {responseBudgetAndFees.data.items.some(
                el => el.type === 'WORLD',
              ) && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">
                    Сборы в мире
                  </span>
                  <span className="movie-detail__center-part-value">
                    $
                    {responseBudgetAndFees.data.items
                      .find(el => el.type === 'WORLD')
                      .amount.toLocaleString('ru-RU')}
                  </span>
                </div>
              )}
              {responseBudgetAndFees.data.items.some(
                el => el.type === 'RUS',
              ) && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">
                    Сборы в России
                  </span>
                  <span className="movie-detail__center-part-value">
                    $
                    {responseBudgetAndFees.data.items
                      .find(el => el.type === 'RUS')
                      .amount.toLocaleString('ru-RU')}
                  </span>
                </div>
              )}
              {responseDataFilm.data.filmLength && (
                <div className="movie-detail__center-part-about-container">
                  <span className="movie-detail__center-part-key">Время</span>
                  <span className="movie-detail__center-part-value">
                    {responseDataFilm.data.filmLength} мин
                  </span>
                </div>
              )}
            </div>
          </div>
          {responseSequelsAndPrequels.data && (
            <div className="movie-detail__additional">
              <h3 className="movie-detail__additional-title">
                Сиквелы, приквелы и ремейки
              </h3>
              <div className="movie-detail__additional-wrapper">
                <button
                  className={classNames(
                    'movie-detail__scroll-button ',
                    'movie-detail__scroll-button-left',
                    {
                      ['movie-detail__scroll-button-hidden']: isSequelsLeftEdge,
                      ['movie-detail__scroll-button-visible']:
                        isSequelsLeftEdge,
                    },
                  )}
                  onClick={() => scrollContainer(sequelsScrollRef, 'left')}
                >
                  &lt;
                </button>
                <div
                  className="movie-detail__additional-cards-container"
                  ref={sequelsScrollRef}
                >
                  {responseSequelsAndPrequels.data.map(el => (
                    <MovieCard key={el.kinopoiskId} movie={el} />
                  ))}
                </div>
                <button
                  className={classNames(
                    'movie-detail__scroll-button',
                    'movie-detail__scroll-button-right',
                    {
                      ['movie-detail__scroll-button-hidden']:
                        isSequelsRightEdge,
                      ['movie-detail__scroll-button-visible']:
                        isSequelsRightEdge,
                    },
                  )}
                  onClick={() => scrollContainer(sequelsScrollRef, 'right')}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="movie-detail__right-part">
          {responseDataFilm.data.ratingKinopoisk && (
            <div className="movie-detail__right-part-rating">
              <span className="movie-detail__right-part-rating-kinopoisk">
                {formatRating(responseDataFilm.data.ratingKinopoisk)}
              </span>
              {responseDataFilm.data.ratingKinopoiskVoteCount && (
                <span className="movie-detail__right-part-vote-count">
                  {responseDataFilm.data.ratingKinopoiskVoteCount.toLocaleString(
                    'ru-RU',
                  )}{' '}
                  {getDeclensionRatingText(
                    responseDataFilm.data.ratingKinopoiskVoteCount,
                  )}
                </span>
              )}
            </div>
          )}
          <div className="movie-detail__right-part-actors-container">
            <div className="movie-detail__right-part-actors-and-oscars-container">
              <h3 className="movie-detail__right-part-actors-title">
                В главных ролях
              </h3>
              {responseStaff.data.some(el => el.professionKey === 'ACTOR') && (
                <div className="movie-detail__right-part-actors-list">
                  {responseStaff.data
                    .filter(el => el.professionKey === 'ACTOR')
                    .slice(0, 10)
                    .map(actor => (
                      <div
                        key={actor.staffId}
                        className="movie-detail__right-part-actors-name"
                      >
                        {actor.nameRu ? actor.nameRu : actor.nameEn}
                      </div>
                    ))}
                </div>
              )}
              {responseStaff.data.some(el => el.professionKey === 'ACTOR') && (
                <span className="movie-detail__right-part-num-actors">
                  {
                    responseStaff.data.filter(
                      el => el.professionKey === 'ACTOR',
                    ).length
                  }{' '}
                  {getDeclensionActorsText(
                    responseStaff.data.filter(
                      el => el.professionKey === 'ACTOR',
                    ).length,
                  )}
                </span>
              )}
            </div>
            {oscarWins && oscarWins.length > 0 && (
              <div className="movie-detail__right-part-oscar-container">
                <div>
                  <img
                    className="movie-detail__right-part-oscar-img"
                    src={oscar}
                    alt="Статуэтка"
                  />
                  <span className="movie-detail__right-part-oscar-num">
                    {oscarWins.length}
                  </span>
                  <div className="movie-detail__right-part-oscar-text">
                    <h5 className="movie-detail__right-part-oscar-title">
                      Оскар
                    </h5>
                    <div className="movie-detail__right-part-oscar-years-and-wins">
                      <time className="movie-detail__right-part-oscar-year">
                        {oscarWins[0].year}
                      </time>
                      <div className="movie-detail__right-part-oscar-wins">
                        <h6 className="movie-detail__right-part-oscar-wins-title">
                          Победитель
                        </h6>
                        {oscarWins.map(win => (
                          <span
                            key={win.nominationName}
                            className="movie-detail__right-part-nominations"
                          >
                            {win.nominationName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="movie-detail__bottom-part">
        {responseDataFilm.data.description && (
          <p className="movie-detail__bottom-part-movie-description">
            {responseDataFilm.data.description}
          </p>
        )}
        <div className="movie-detail__bottom-part-rating">
          <h4 className="movie-detail__bottom-part-rating-title">
            Рейтинг фильма
          </h4>
          <div className="movie-detail__bottom-part-stars-container">
            {Array.from({ length: 10 }, (_, index) => {
              const rating = responseDataFilm.data.ratingKinopoisk;
              const isFilled = index < Math.floor(rating);
              const isPartiallyFilled =
                index === Math.floor(rating) && rating % 1 !== 0;
              const fillPercentage = isPartiallyFilled ? (rating % 1) * 100 : 0;

              return (
                <span
                  key={index}
                  className={classNames('movie-detail__bottom-part-star', {
                    'movie-detail__bottom-part-star-filled': isFilled,
                    'movie-detail__bottom-part-star-partially-filled':
                      isPartiallyFilled,
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
        {responseListSimilarMovies.data?.items.length > 0 && (
          <div className="movie-detail__additional detail__additional_padding-not detail__additional_full-width movie-detail__additional_margin-bottom">
            <h4 className="movie-detail__additional-title">
              Если вам понравился этот фильм
            </h4>
            <div className="movie-detail__additional-wrapper">
              <button
                className={classNames(
                  'movie-detail__scroll-button movie-detail__scroll-button_top',
                  'movie-detail__scroll-button-left',
                  {
                    ['movie-detail__scroll-button-hidden']: isSimilarsLeftEdge,
                    ['movie-detail__scroll-button-visible']: isSimilarsLeftEdge,
                  },
                )}
                onClick={() => scrollContainer(similarsScrollRef, 'left')}
              >
                &lt;
              </button>
              <div
                className="movie-detail__additional-cards-container"
                ref={similarsScrollRef}
              >
                {responseListSimilarMovies.data.items.map(el => (
                  <MovieCard key={el.kinopoiskId} movie={el} />
                ))}
              </div>
              <button
                className={classNames(
                  'movie-detail__scroll-button movie-detail__scroll-button_top',
                  'movie-detail__scroll-button-right',
                  {
                    ['movie-detail__scroll-button-hidden']: isSimilarsRightEdge,
                    ['movie-detail__scroll-button-visible']:
                      isSimilarsRightEdge,
                  },
                )}
                onClick={() => scrollContainer(similarsScrollRef, 'right')}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
        {responseFactsAndBloopers.data?.items.length > 0 &&
          filteredFacts.length > 0 && (
            <div className="movie-detail__bottom-part-knows">
              <h4 className="movie-detail__bottom-part-knows-title">
                Знаете ли вы, что...
              </h4>
              <ul className="movie-detail__bottom-part-knows-list">
                {visibleFactsWithoutSpoilers.map((fact, index) => (
                  <li
                    key={index}
                    className="movie-detail__bottom-part-knows-item"
                    dangerouslySetInnerHTML={{ __html: fact.text }}
                  />
                ))}

                {factsWithoutSpoilers.length ===
                  visibleFactsWithoutSpoilers.length &&
                  factsWithSpoilers.length > 0 && (
                    <div className="movie-detail__bottom-part-knows-attention">
                      Внимание! Дальнейший список фактов о фильме содержит
                      спойлеры. Будьте осторожны.
                    </div>
                  )}

                {visibleFactsWithSpoilers.map((fact, index) => (
                  <li
                    key={index + visibleFactsWithoutSpoilers.length}
                    className="movie-detail__bottom-part-knows-item"
                    dangerouslySetInnerHTML={{ __html: fact.text }}
                  />
                ))}
              </ul>
              {(factsWithoutSpoilers.length >
                visibleFactsWithoutSpoilersCount ||
                factsWithSpoilers.length > visibleFactsWithSpoilersCount) && (
                <button
                  className="button movie-detail__bottom-part-button"
                  onClick={loadMoreFacts}
                >
                  Показать еще
                </button>
              )}
            </div>
          )}
        {responseFactsAndBloopers.data?.items.length > 0 &&
          filteredBloopers.length > 0 && (
            <div className="movie-detail__bottom-part-knows">
              <h4 className="movie-detail__bottom-part-knows-title movie-detail__bottom-part-knows-title_maring-bottom">
                Ошибки в фильме
              </h4>
              <div className="movie-detail__bottom-part-knows-attention">
                Внимание! Список ошибок в фильме может содержать спойлеры.
                Будьте осторожны.
              </div>
              <ul className="movie-detail__bottom-part-knows-list">
                {visiblefilteredBloopers.map((fact, index) => (
                  <li
                    key={index}
                    className="movie-detail__bottom-part-knows-item"
                    dangerouslySetInnerHTML={{ __html: fact.text }}
                  />
                ))}
              </ul>
              {filteredBloopers.length > visiblefilteredBloopers && (
                <button
                  className="button movie-detail__bottom-part-button"
                  onClick={loadMoreBloopers}
                >
                  Показать еще
                </button>
              )}
            </div>
          )}
      </div>
    </div>
  );
}
