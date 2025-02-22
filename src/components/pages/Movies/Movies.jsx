import React, { useEffect, useMemo, useState } from 'react';

import '../../../services/kinopoiskApi';

import { Link } from '@mui/material';
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';
import { Link as RouterLink } from 'react-router-dom';

import useMoviesQuery from '../../../hooks/useMoviesQuery';
import RatingBadge from '../../common/RatingBadge';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import styles from './Movies.module.scss';
import MoviesSkeleton from './MoviesSkeleton';

export default function Movies() {
  const [activeCarousels, setActiveCarousels] = useState([]);
  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartoons,
  } = useMoviesQuery();

  useEffect(() => {
    if (!isLoading && !hasError) {
      const delays = carouselArr.map((_, index) =>
        setTimeout(() => {
          setActiveCarousels(prev => [...prev, index]);
        }, index * 7000),
      );
      return () => delays.forEach(clearTimeout);
    }
  }, [isLoading, hasError]);

  const serializeDataForCarousel = useMemo(
    () => data =>
      data.map(row => (
        <RouterLink key={row.id} to={`/movie/${row.kinopoiskId}`}>
          <BearSlideImage
            className={styles.Movies__image}
            imageUrl={row.posterUrlPreview}
          />
          {row.ratingKinopoisk && (
            <RatingBadge
              className={styles.Movies__rating}
              rating={row.ratingKinopoisk}
            />
          )}
        </RouterLink>
      )),
    [],
  );

  const carouselArr = useMemo(() => {
    if (isLoading || hasError) return [];

    return [
      {
        title: 'Популярные фильмы',
        url: '/popular',
        data: serializeDataForCarousel(responsePopular.data?.items || []),
      },
      {
        title: 'Лучшие фильмы',
        url: '/best',
        data: serializeDataForCarousel(responseBest.data?.items || []),
      },
      {
        title: 'Фильмы',
        url: '/films',
        data: serializeDataForCarousel(responseFilms.data?.items || []),
      },
      {
        title: 'Сериалы',
        url: '/serials',
        data: serializeDataForCarousel(responseSerials.data?.items || []),
      },
      {
        title: 'Мультфильмы',
        url: '/cartoons',
        data: serializeDataForCarousel(responseCartoons.data?.items || []),
      },
    ];
  }, [
    isLoading,
    hasError,
    responsePopular.data,
    responseBest.data,
    responseFilms.data,
    responseSerials.data,
    responseCartoons.data,
    serializeDataForCarousel,
  ]);

  if (isLoading) return <MoviesSkeleton />;
  if (hasError)
    return (
      <ErrorMessage message="Не удалось загрузить список фильмов. Проверьте интернет-соединение и попробуйте снова." />
    );

  return (
    <>
      {carouselArr.map((carousel, index) => (
        <div className={styles.movies__container} key={carousel.title}>
          <Link
            className={styles.movies__title}
            component={RouterLink}
            to={carousel.url}
          >
            {carousel.title}
          </Link>
          <BearCarousel
            data={carousel.data}
            slidesPerView={1}
            slidesPerGroup={3}
            isEnableNavButton
            isEnableLoop
            isEnableAutoPlay={activeCarousels.includes(index)}
            autoPlayTime={11000}
            spaceBetween={14}
            breakpoints={{
              1: { autoPlayTime: 0 },
              375: { slidesPerView: 2 },
              500: { slidesPerView: 3 },
              618: { slidesPerView: 4 },
              900: { slidesPerView: 5 },
            }}
          />
        </div>
      ))}
    </>
  );
}
