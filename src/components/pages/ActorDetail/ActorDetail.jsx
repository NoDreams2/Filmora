import React from 'react';

import './actor-detail.scss';

import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useGetStaffByIdQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';

export default function ActorDetail() {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetStaffByIdQuery(id);

  if (isLoading) {
    return (
      <CircularProgress
        size="60px"
        sx={{ position: 'absolute', marginTop: '22%', color: '#00a1e7' }}
      />
    );
  }

  if (isError) {
    return <ErrorMessage />;
  }

  const uniqueFilms = data.films.filter(
    (film, index, self) =>
      index ===
      self.findIndex(
        f =>
          f.filmId === film.filmId &&
          f.nameRu === film.nameRu &&
          f.nameEn === film.nameEn,
      ),
  );

  return (
    <div className="detail__wrap">
      <div className="detail__container actor-detail__container">
        <div className="detail__left-part">
          <img className="detail__left-part-poster" src={data.posterUrl} />
          <div className="detail__left-part-buttons">
            <a target="_blank" rel="noopener noreferrer" href={data.webUrl}>
              <button className="button button_small">Кинопоиск</button>
            </a>
          </div>
        </div>
        <div className="detail__center-part actor-detail__center-part">
          <div className="detail__center-part-main-title">
            <div className="detail__center-part-title-desc">
              <h2 className="detail__center-part-title">{data.nameRu}</h2>
              <span>{data.nameEn}</span>
            </div>
          </div>
          <div className="detail__center-part-about-detail">
            <div className="detail__center-part-about-detail-container">
              <h3 className="detail__center-part-title-about">О Персоне</h3>
              {data.profession && (
                <div className="detail__center-part-about-container">
                  <span className="detail__center-part-key">Карьера</span>
                  <span className="detail__center-part-value">
                    {data.profession}
                  </span>
                </div>
              )}
              {data.growth && (
                <div className="detail__center-part-about-container">
                  <span className="detail__center-part-key">Рост</span>
                  <span className="detail__center-part-value">
                    {data.growth}
                  </span>
                </div>
              )}
              {data.birthday && (
                <div className="detail__center-part-about-container">
                  <span className="detail__center-part-key">Дата рождения</span>
                  <span className="detail__center-part-value">
                    {data.birthday}
                  </span>
                </div>
              )}
              {data.death && (
                <div className="detail__center-part-about-container">
                  <span className="detail__center-part-key">Дата смерти</span>
                  <span className="detail__center-part-value">
                    {data.death}
                  </span>
                </div>
              )}
              {data.age && (
                <div className="detail__center-part-about-container">
                  <span className="detail__center-part-key">Возраст</span>
                  <span className="detail__center-part-value">{data.age}</span>
                </div>
              )}
              {data.birthplace && (
                <div className="detail__center-part-about-container">
                  <span className="detail__center-part-key">
                    Место рождения
                  </span>
                  <span className="detail__center-part-value">
                    {data.birthplace}
                  </span>
                </div>
              )}
              {data.deathplace && (
                <div className="detail__center-part-about-container">
                  <span className="detail__center-part-key">Место смерти</span>
                  <span className="detail__center-part-value">
                    {data.deathplace}
                  </span>
                </div>
              )}
              {data.films && (
                <div className="detail__center-part-about-container">
                  <span className="detail__center-part-key">Всего фильмов</span>
                  <span className="detail__center-part-value">
                    {uniqueFilms.length}
                  </span>
                </div>
              )}
              {data.hasAwards && (
                <div className="detail__center-part-about-container">
                  <span className="detail__center-part-key">
                    Количество наград
                  </span>
                  <span className="detail__center-part-value">
                    {data.hasAwards}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="detail__bottom-part-films">
        <h3 className="detail__bottom-part-films-title">Фильмы</h3>
        {uniqueFilms.map((film, index) => (
          <div
            key={film.filmId}
            className="detail__bottom-part-films-container"
          >
            <span className="detail__bottom-part-films-num">{index + 1}</span>
            <span className="detail__bottom-part-films-name">
              {film.nameRu ? film.nameRu : film.nameEn}
            </span>
            <span className="detail__bottom-part-films-rating">
              {film.rating || '-'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
