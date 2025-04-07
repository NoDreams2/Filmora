import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useGetStaffByIdQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';
import Loader from '../../ui/Loader/Loader';

import './name-detail.scss';

import BackToTopButton from '../../ui/BackToTopButton/BackToTopButton';

export default function NameDetail() {
  const [filmsCount, setFilmsCount] = useState(20);
  const [factsCount, setFactsCount] = useState(3);
  const { id } = useParams();

  const { data, isLoading, isError } = useGetStaffByIdQuery(id);

  if (isLoading) {
    return <Loader />;
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

  const sliceFilms = uniqueFilms.slice(0, filmsCount);
  const sliceFacts = data.facts?.slice(0, factsCount) || [];

  const loadMoreFilms = () => {
    if (filmsCount < uniqueFilms.length) {
      setFilmsCount(prevCount => prevCount + 20);
    }
  };

  const loadMoreFacts = () => {
    if (factsCount < data.facts?.length) {
      setFactsCount(prevCount => prevCount + 20);
    }
  };

  return (
    <div className="name-detail">
      <div className="name-detail__header">
        <div className="name-detail__poster-container">
          <img
            className="name-detail__poster"
            src={data.posterUrl}
            alt={data.nameRu || data.nameEn}
          />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={data.webUrl}
            className="name-detail__kinopoisk-link"
          >
            Профиль на Кинопоиске
          </a>
        </div>

        <div className="name-detail__info">
          <h1 className="name-detail__title">
            {data.nameRu || data.nameEn}
            {data.nameRu && data.nameEn && (
              <span className="name-detail__subtitle">{data.nameEn}</span>
            )}
          </h1>

          <div className="name-detail__bio">
            <h2 className="name-detail__section-title">Биография</h2>
            <div className="name-detail__bio-grid">
              {data.profession && (
                <div className="name-detail__bio-item">
                  <span className="name-detail__bio-key">Карьера</span>
                  <span className="name-detail__bio-value">
                    {data.profession}
                  </span>
                </div>
              )}
              {data.birthday && (
                <div className="name-detail__bio-item">
                  <span className="name-detail__bio-key">Дата рождения</span>
                  <span className="name-detail__bio-value">
                    {data.birthday}
                  </span>
                </div>
              )}
              {data.age > 0 && (
                <div className="name-detail__bio-item">
                  <span className="name-detail__bio-key">Возраст</span>
                  <span className="name-detail__bio-value">{data.age}</span>
                </div>
              )}
              {data.growth > 0 && (
                <div className="name-detail__bio-item">
                  <span className="name-detail__bio-key">Рост</span>
                  <span className="name-detail__bio-value">
                    {data.growth} см
                  </span>
                </div>
              )}
              {data.birthplace && (
                <div className="name-detail__bio-item">
                  <span className="name-detail__bio-key">Место рождения</span>
                  <span className="name-detail__bio-value">
                    {data.birthplace}
                  </span>
                </div>
              )}
              {data.death && (
                <div className="name-detail__bio-item">
                  <span className="name-detail__bio-key">Дата смерти</span>
                  <span className="name-detail__bio-value">{data.death}</span>
                </div>
              )}
              {data.deathplace && (
                <div className="name-detail__bio-item">
                  <span className="name-detail__bio-key">Место смерти</span>
                  <span className="name-detail__bio-value">
                    {data.deathplace}
                  </span>
                </div>
              )}
              {data.hasAwards > 0 && (
                <div className="name-detail__bio-item">
                  <span className="name-detail__bio-key">Награды</span>
                  <span className="name-detail__bio-value">
                    {data.hasAwards}
                  </span>
                </div>
              )}
              {data.films && data.films.length > 0 && (
                <div className="name-detail__bio-item">
                  <span className="name-detail__bio-key">Всего фильмов</span>
                  <span className="name-detail__bio-value">
                    {uniqueFilms.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="name-detail__content">
        <section className="name-detail__films">
          <h2 className="name-detail__section-title">Фильмография</h2>
          <div className="name-detail__films-list">
            {sliceFilms.map((film, index) => (
              <Link
                className="name-detail__film-link"
                key={film.filmId}
                to={`/film/${film.filmId}`}
              >
                <div className="name-detail__film-card">
                  <span className="name-detail__film-number">{index + 1}</span>
                  <span className="name-detail__film-title">
                    {film.nameRu || film.nameEn || 'Без названия'}
                  </span>
                  {film.rating ? (
                    <span className="name-detail__film-rating">
                      {film.rating}
                    </span>
                  ) : (
                    <span className="name-detail__film-rating">-</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
          {filmsCount < uniqueFilms.length && (
            <button className="name-detail__load-more" onClick={loadMoreFilms}>
              Показать ещё {Math.min(20, uniqueFilms.length - filmsCount)} из{' '}
              {uniqueFilms.length - filmsCount}
            </button>
          )}
        </section>

        {sliceFacts.length > 0 && (
          <section className="name-detail__facts">
            <h2 className="name-detail__section-title">Интересные факты</h2>
            <ul className="name-detail__facts-list">
              {sliceFacts.map((fact, index) => (
                <li
                  key={index}
                  className="name-detail__fact-item"
                  dangerouslySetInnerHTML={{ __html: fact }}
                />
              ))}
            </ul>
            {factsCount < data.facts.length && (
              <button
                className="name-detail__load-more"
                onClick={loadMoreFacts}
              >
                Показать ещё {Math.min(20, data.facts.length - factsCount)} из{' '}
                {data.facts.length - factsCount}
              </button>
            )}
          </section>
        )}
      </div>
      <BackToTopButton />
    </div>
  );
}
