import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import oscar from '../../../assets/images/oscar.svg';
import {
  useGetAwardsQuery,
  useGetBudgetAndFeesQuery,
  useGetDataFilmQuery,
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
import styles from './MovieDetail.module.scss';

export default function MovieDetail() {
  const scrollRef = useRef(null);
  const { id } = useParams();
  const [isLeftEdge, setIsLeftEdge] = useState(true);
  const [isRightEdge, setIsRightEdge] = useState(false);

  const responseDataFilm = useGetDataFilmQuery(id);
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);
  const responseBudgetAndFees = useGetBudgetAndFeesQuery(id);
  const responseAwards = useGetAwardsQuery(id);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      checkScroll();
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  });

  if (
    responseDataFilm.isLoading ||
    responseSequelsAndPrequels.isLoading ||
    responseStaff.isLoading ||
    responseBudgetAndFees.isLoading ||
    responseAwards.isLoading
  ) {
    return <div>Загрузка...</div>;
  }

  if (
    responseDataFilm.error ||
    // TODO: Убрать комментарий после исправления ошибки на сервере
    // responseSequelsAndPrequels.error ||
    responseStaff.error ||
    responseBudgetAndFees.error ||
    responseAwards.error
  ) {
    return <ErrorMessage />;
  }

  const staffSlice = staffs => {
    const numberOfStaffs = staffs.map(staff =>
      staff.nameRu ? staff.nameRu : staff.nameEn,
    );
    if (staffs.length > 3) {
      return `${numberOfStaffs.slice(0, 3).join(', ')}, ...`;
    }
    return numberOfStaffs.join(', ');
  };

  const checkScroll = () => {
    const container = scrollRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setIsLeftEdge(scrollLeft === 0);
      setIsRightEdge(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  const scrollContainer = direction => {
    const container = scrollRef.current;
    const scrollAmount = 1000;
    if (container) {
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else if (direction === 'right') {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const oscarWins = responseAwards.data?.items.filter(
    award => award.name === 'Оскар' && award.win === true,
  );

  console.log(oscarWins);

  return (
    <div className={styles.MovieDetail__container}>
      <div className={styles.MovieDetail__leftPart}>
        <img
          className={styles.MovieDetail__leftPartPoster}
          src={responseDataFilm.data.posterUrlPreview}
        />
        <div className={styles.MovieDetail__leftPartButtons}>
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
      <div className={styles.MovieDetail__rightPart}>
        <div className={styles.MovieDetail__rightPartMainTitle}>
          <div className={styles.MovieDetail__rightPartTitleDesc}>
            <h2 className={styles.MovieDetail__rightPartTitle}>
              {responseDataFilm.data.nameRu ||
                responseDataFilm.data.nameEn ||
                responseDataFilm.data.nameOriginal}{' '}
              ({responseDataFilm.data.year})
            </h2>
            {responseDataFilm.data.shortDescription ? (
              <p className={styles.MovieDetail__rightPartdescription}>
                {responseDataFilm.data.shortDescription}
              </p>
            ) : (
              <span>Описание отсутствует</span>
            )}
          </div>
          <div className={styles.MovieDetail__rightPartRating}>
            <span className={styles.MovieDetail__rightPartRatingKinopoisk}>
              {responseDataFilm.data.ratingKinopoisk ? (
                formatRating(responseDataFilm.data.ratingKinopoisk)
              ) : (
                <span
                  className={styles.MovieDetail__rightPartNoRatingKinopoisk}
                >
                  Оценки еще не набрались
                </span>
              )}
            </span>
            {responseDataFilm.data.ratingKinopoiskVoteCount && (
              <span className={styles.MovieDetail__rightPartVoteCount}>
                {responseDataFilm.data.ratingKinopoiskVoteCount.toLocaleString(
                  'ru-RU',
                )}{' '}
                {getDeclensionRatingText(
                  responseDataFilm.data.ratingKinopoiskVoteCount,
                )}
              </span>
            )}
          </div>
        </div>
        <div className={styles.MovieDetail__rightPartAboutFilm}>
          <div className={styles.MovieDetail__rightPartAboutFilmContainer}>
            <h3 className={styles.MovieDetail__rightPartTitleAbout}>
              О фильме
            </h3>
            {responseDataFilm.data.year && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>
                  Год Производства
                </span>
                <span className={styles.MovieDetail__rightPartValue}>
                  {responseDataFilm.data.year}
                </span>
              </div>
            )}
            {responseDataFilm.data.country && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>Страна</span>
                <span className={styles.MovieDetail__rightPartValue}>
                  {responseDataFilm.data.countries
                    .map(country => country.country)
                    .join(', ')}
                </span>
              </div>
            )}
            {responseDataFilm.data.genre && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>Жанр</span>
                <span className={styles.MovieDetail__rightPartValue}>
                  {responseDataFilm.data.genres
                    .map(genre => genre.genre)
                    .join(', ')}
                </span>
              </div>
            )}
            {responseDataFilm.data.slogan && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>Слоган</span>
                <span className={styles.MovieDetail__rightPartValue}>
                  {responseDataFilm.data.slogan}
                </span>
              </div>
            )}
            {responseStaff.data.some(el => el.professionKey === 'DIRECTOR') && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>
                  Режиссер
                </span>
                <span className={styles.MovieDetail__rightPartValue}>
                  {staffSlice(
                    responseStaff.data.filter(
                      el => el.professionKey === 'DIRECTOR',
                    ),
                  )}
                </span>
              </div>
            )}
            {responseStaff.data.some(el => el.professionKey === 'WRITER') && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>
                  Сценарий
                </span>
                <span className={styles.MovieDetail__rightPartValue}>
                  {staffSlice(
                    responseStaff.data.filter(
                      el => el.professionKey === 'WRITER',
                    ),
                  )}
                </span>
              </div>
            )}
            {responseStaff.data.some(el => el.professionKey === 'PRODUCER') && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>
                  Продюсер
                </span>
                <span className={styles.MovieDetail__rightPartValue}>
                  {staffSlice(
                    responseStaff.data.filter(
                      el => el.professionKey === 'PRODUCER',
                    ),
                  )}
                </span>
              </div>
            )}
            {responseStaff.data.some(el => el.professionKey === 'OPERATOR') && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>
                  Оператор
                </span>
                <span className={styles.MovieDetail__rightPartValue}>
                  {staffSlice(
                    responseStaff.data.filter(
                      el => el.professionKey === 'OPERATOR',
                    ),
                  )}
                </span>
              </div>
            )}
            {responseStaff.data.some(el => el.professionKey === 'COMPOSER') && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>
                  Композитор
                </span>
                <span className={styles.MovieDetail__rightPartValue}>
                  {staffSlice(
                    responseStaff.data.filter(
                      el => el.professionKey === 'COMPOSER',
                    ),
                  )}
                </span>
              </div>
            )}
            {responseStaff.data.some(el => el.professionKey === 'DESIGN') && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>
                  Художник
                </span>
                <span className={styles.MovieDetail__rightPartValue}>
                  {staffSlice(
                    responseStaff.data.filter(
                      el => el.professionKey === 'DESIGN',
                    ),
                  )}
                </span>
              </div>
            )}
            {responseStaff.data.some(el => el.professionKey === 'EDITOR') && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>Монтаж</span>
                <span className={styles.MovieDetail__rightPartValue}>
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
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>Бюджет</span>
                <span className={styles.MovieDetail__rightPartValue}>
                  $
                  {responseBudgetAndFees.data.items
                    .find(el => el.type === 'BUDGET')
                    .amount.toLocaleString('ru-RU')}
                </span>
              </div>
            )}
            {responseBudgetAndFees.data.items.some(el => el.type === 'USA') && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>
                  Сборы в США
                </span>
                <span className={styles.MovieDetail__rightPartValue}>
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
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>
                  Сборы в мире
                </span>
                <span className={styles.MovieDetail__rightPartValue}>
                  $
                  {responseBudgetAndFees.data.items
                    .find(el => el.type === 'WORLD')
                    .amount.toLocaleString('ru-RU')}
                </span>
              </div>
            )}
            {responseBudgetAndFees.data.items.some(el => el.type === 'RUS') && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>
                  Сборы в России
                </span>
                <span className={styles.MovieDetail__rightPartValue}>
                  $
                  {responseBudgetAndFees.data.items
                    .find(el => el.type === 'RUS')
                    .amount.toLocaleString('ru-RU')}
                </span>
              </div>
            )}
            {responseDataFilm.data.filmLength && (
              <div className={styles.MovieDetail__rightPartAboutContainer}>
                <span className={styles.MovieDetail__rightPartKey}>Время</span>
                <span className={styles.MovieDetail__rightPartValue}>
                  {responseDataFilm.data.filmLength} мин
                </span>
              </div>
            )}
          </div>
          <div className={styles.MovieDetail__rightPartActorsContainer}>
            <div
              className={styles.MovieDetail__rightPartActorsAndOscarsContainer}
            >
              <h3 className={styles.MovieDetail__rightPartActorsTitle}>
                В главных ролях
              </h3>
              {responseStaff.data.some(el => el.professionKey === 'ACTOR') && (
                <div className={styles.MovieDetail__rightPartActorsList}>
                  {responseStaff.data
                    .filter(el => el.professionKey === 'ACTOR')
                    .slice(0, 10)
                    .map(actor => (
                      <div
                        key={actor.staffId}
                        className={styles.MovieDetail__rightPartActorsName}
                      >
                        {actor.nameRu ? actor.nameRu : actor.nameEn}
                      </div>
                    ))}
                </div>
              )}
              {responseStaff.data.some(el => el.professionKey === 'ACTOR') && (
                <span className={styles.MovieDetail__rightPartNumActors}>
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
            <div className={styles.MovieDetail__rightPartOscarContainer}>
              <div>
                <img
                  className={styles.MovieDetail__rightPartOscarImg}
                  src={oscar}
                  alt="Статуэтка"
                />
                <span className={styles.MovieDetail__rightPartOscarNum}>
                  {oscarWins.length}
                </span>
                <div className={styles.MovieDetail__rightPartOscarText}>
                  <h5 className={styles.MovieDetail__rightPartOscarTitle}>
                    Оскар
                  </h5>
                  <div
                    className={styles.MovieDetail__rightPartOscarYearsAndWins}
                  >
                    <time className={styles.MovieDetail__rightPartOscarYear}>
                      {oscarWins[0].year}
                    </time>
                    <div className={styles.MovieDetail__rightPartOscarWins}>
                      <h6
                        className={styles.MovieDetail__rightPartOscarWinsTitle}
                      >
                        Победитель
                      </h6>
                      {oscarWins.map(win => (
                        <span
                          key={win.nominationName}
                          className={styles.MovieDetail__rightPartNominations}
                        >
                          {win.nominationName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {responseSequelsAndPrequels.data && (
          <div className={styles.MovieDetail__SequelsAndPrequelsContainer}>
            <h4
              className={styles.MovieDetail__SequelsAndPrequelsContainerTitle}
            >
              Сиквелы, приквелы и ремейки
            </h4>
            <div className={styles.MovieDetail__SequelsAndPrequelsCardsWrapper}>
              <button
                className={classNames(
                  styles.MovieDetail__ScrollButton,
                  styles.MovieDetail__ScrollButtonLeft,
                  {
                    [styles.MovieDetail__ScrollButtonHidden]: isLeftEdge,
                    [styles.MovieDetail__ScrollButtonVisible]: isLeftEdge,
                  },
                )}
                onClick={() => scrollContainer('left')}
              >
                &lt;
              </button>
              <div
                className={styles.MovieDetail__SequelsAndPrequelsCardsContainer}
                ref={scrollRef}
              >
                {responseSequelsAndPrequels.data.map(el => (
                  <MovieCard key={el.filmId} movie={el} />
                ))}
              </div>
              <button
                className={classNames(
                  styles.MovieDetail__ScrollButton,
                  styles.MovieDetail__ScrollButtonRight,
                  {
                    [styles.MovieDetail__ScrollButtonHidden]: isRightEdge,
                    [styles.MovieDetail__ScrollButtonVisible]: isRightEdge,
                  },
                )}
                onClick={() => scrollContainer('right')}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
