import React from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetBudgetAndFeesQuery,
  useGetDataFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from '../../../services/kinopoiskApi';
import { formatRating } from '../../../utils/utils';
import ErrorMessage from '../../ui/ErrorMessage';
import styles from './MovieDetail.module.scss';

export default function MovieDetail() {
  const { id } = useParams();

  const responseDataFilm = useGetDataFilmQuery(id);
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);
  const responseBudgetAndFees = useGetBudgetAndFeesQuery(id);

  if (
    responseDataFilm.isLoading ||
    responseSequelsAndPrequels.isLoading ||
    responseStaff.isLoading ||
    responseBudgetAndFees.isLoading
  ) {
    return <div>Загрузка...</div>;
  }

  if (
    responseDataFilm.error ||
    // TODO: Убрать комментарий после исправления ошибки на сервере
    // responseSequelsAndPrequels.error ||
    responseStaff.error ||
    responseBudgetAndFees.error
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
    return numberOfStaffs;
  };

  return (
    <div className={styles.MovieDetail__container}>
      <div className={styles.MovieDetail__leftPart}>
        <img
          className={styles.MovieDetail__leftPartPoster}
          src={responseDataFilm.data.posterUrlPreview}
        />
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
                оценок
              </span>
            )}
          </div>
        </div>
        <h3 className={styles.MovieDetail__rightPartTitleAbout}>О фильме</h3>
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
        {responseDataFilm.data.countries && (
          <div className={styles.MovieDetail__rightPartAboutContainer}>
            <span className={styles.MovieDetail__rightPartKey}>Страна</span>
            <span className={styles.MovieDetail__rightPartValue}>
              {responseDataFilm.data.countries
                .map(country => country.country)
                .join(', ')}
            </span>
          </div>
        )}
        {responseDataFilm.data.genres && (
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
            <span className={styles.MovieDetail__rightPartKey}>Режиссер</span>
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
            <span className={styles.MovieDetail__rightPartKey}>Сценарий</span>
            <span className={styles.MovieDetail__rightPartValue}>
              {staffSlice(
                responseStaff.data.filter(el => el.professionKey === 'WRITER'),
              )}
            </span>
          </div>
        )}
        {responseStaff.data.some(el => el.professionKey === 'PRODUCER') && (
          <div className={styles.MovieDetail__rightPartAboutContainer}>
            <span className={styles.MovieDetail__rightPartKey}>Продюсер</span>
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
            <span className={styles.MovieDetail__rightPartKey}>Оператор</span>
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
            <span className={styles.MovieDetail__rightPartKey}>Композитор</span>
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
            <span className={styles.MovieDetail__rightPartKey}>Художник</span>
            <span className={styles.MovieDetail__rightPartValue}>
              {staffSlice(
                responseStaff.data.filter(el => el.professionKey === 'DESIGN'),
              )}
            </span>
          </div>
        )}
        {responseStaff.data.some(el => el.professionKey === 'EDITOR') && (
          <div className={styles.MovieDetail__rightPartAboutContainer}>
            <span className={styles.MovieDetail__rightPartKey}>Монтаж</span>
            <span className={styles.MovieDetail__rightPartValue}>
              {staffSlice(
                responseStaff.data.filter(el => el.professionKey === 'EDITOR'),
              )}
            </span>
          </div>
        )}
        {responseBudgetAndFees.data.items.some(el => el.type === 'BUDGET') && (
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
        {responseBudgetAndFees.data.items.some(el => el.type === 'WORLD') && (
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
    </div>
  );
}
