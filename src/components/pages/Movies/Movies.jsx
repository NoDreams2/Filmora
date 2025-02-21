import React from 'react';

import '../../../services/kinopoiskApi';

import { Link } from '@mui/material';
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';
import { Link as RouterLink } from 'react-router-dom';

import useMoviesQuery from '../../../hooks/useMoviesQuery';

export default function Movies() {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerials,
    responseCartoons,
  } = useMoviesQuery();

  if (isLoading) return <p>Loading...</p>;

  if (hasError) return <p>Error</p>;

  const serializeDataForCarousel = data =>
    data.map(row => (
      <RouterLink key={row.id} to={`/movie/${row.kinopoiskId}`}>
        <BearSlideImage imageUrl={row.posterUrlPreview} />
      </RouterLink>
    ));

  const carouselArr = [
    {
      title: 'Популярные фильмы',
      url: '/popular',
      data: serializeDataForCarousel(responsePopular.data.items),
    },
    {
      title: 'Лучшие фильмы',
      url: '/best',
      data: serializeDataForCarousel(responseBest.data.items),
    },
    {
      title: 'Фильмы',
      url: '/films',
      data: serializeDataForCarousel(responseFilms.data.items),
    },
    {
      title: 'Сериалы',
      url: '/serials',
      data: serializeDataForCarousel(responseSerials.data.items),
    },
    {
      title: 'Мультфильмы',
      url: '/cartoons',
      data: serializeDataForCarousel(responseCartoons.data.items),
    },
  ];
  console.log('Cartoons response:', responseCartoons.data?.items?.[0]?.genres);

  return (
    <>
      {carouselArr.map(carousel => (
        <div key={carousel.title}>
          <Link component={RouterLink} to={carousel.url}>
            {carousel.title}
          </Link>
          <BearCarousel
            data={carousel.data}
            slidesPerView={1}
            slidesPerGroup={3}
            isEnableNavButton
            isEnableLoop
            isEnableAutoPlay
            autoPlayTime={6000}
            breakpoints={{
              375: {
                autoPlayTime: 0,
              },
              500: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 5,
              },
            }}
          />
        </div>
      ))}
    </>
  );
}
