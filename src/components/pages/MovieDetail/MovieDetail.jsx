import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetAwardsQuery,
  useGetBudgetAndFeesQuery,
  useGetDataFilmQuery,
  useGetFactsAndBloopersQuery,
  useGetListSimilarMoviesQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';

import './detail.scss';

import BackToTopButton from '../../ui/BackToTopButton/BackToTopButton';
import Loader from '../../ui/Loader/Loader';
import ActorsList from './components/ActorsList/ActorsList';
import { AlternativeEndings } from './components/AlternativeEndings/AlternativeEndings';
import FilmAbout from './components/FilmAbout/FilmAbouts';
import FilmRating from './components/FilmRating/FilmRating';
import MovieBloopers from './components/MovieBloopers/MovieBloopers';
import MovieFacts from './components/MovieFacts/MovieFacts';
import MovieRating from './components/MovieRating/MovieRating';
import SequelsAndPrequels from './components/SequelsAndPrequels/SequelsAndPrequels';
import SimilarMovies from './components/SimilarMovies/SimilarMovies';

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
    setVisibleFactsWithoutSpoilersCount(3);
    setVisibleFactsWithSpoilersCount(0);
    setBloopersCount(3);
  }, [id]);

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
    return <Loader />;
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
  const loadMoreBloopers = () => {
    if (bloopersCount < filteredBloopers.length) {
      setBloopersCount(prevCount => prevCount + 10);
    }
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
    <div className="detail__wrap">
      <div className="detail__container">
        <div className="detail__left-part">
          <img
            className="detail__left-part-poster"
            src={responseDataFilm.data.posterUrlPreview}
          />
          <div className="detail__left-part-buttons">
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
        <div className="detail__center-part">
          <div className="detail__center-part-main-title">
            <div className="detail__center-part-title-desc">
              <h2 className="detail__center-part-title">
                {responseDataFilm.data.nameRu ||
                  responseDataFilm.data.nameEn ||
                  responseDataFilm.data.nameOriginal}{' '}
                ({responseDataFilm.data.year})
              </h2>
              {responseDataFilm.data.shortDescription ? (
                <p className="detail__center-part-description">
                  {responseDataFilm.data.shortDescription}
                </p>
              ) : (
                <span>Описание отсутствует</span>
              )}
            </div>
          </div>

          <FilmAbout
            filmData={responseDataFilm.data}
            staffData={responseStaff.data}
            budgetData={responseBudgetAndFees.data}
          />

          {responseSequelsAndPrequels.data && (
            <SequelsAndPrequels
              sequelsData={responseSequelsAndPrequels.data}
              scrollContainer={scrollContainer}
              sequelsScrollRef={sequelsScrollRef}
              isLeftEdge={isSequelsLeftEdge}
              isRightEdge={isSequelsRightEdge}
            />
          )}
        </div>
        <div className="detail__right-part">
          {responseDataFilm.data.ratingKinopoisk ? (
            <FilmRating
              rating={responseDataFilm.data.ratingKinopoisk}
              voteCount={responseDataFilm.data.ratingKinopoiskVoteCount}
            />
          ) : (
            <span className="detail__right-part-rating-kinopoisk">0</span>
          )}
          <ActorsList staffData={responseStaff.data} oscarWins={oscarWins} />
        </div>
      </div>
      <div className="detail__bottom-part">
        {responseDataFilm.data.description && (
          <p className="detail__bottom-part-description">
            {responseDataFilm.data.description}
          </p>
        )}

        {responseDataFilm.data.ratingKinopoisk ? (
          <MovieRating rating={responseDataFilm.data.ratingKinopoisk} />
        ) : (
          <span className="detail__right-part-rating-kinopoisk"></span>
        )}

        {responseListSimilarMovies.data?.items.length > 0 && (
          <SimilarMovies
            similarMovies={responseListSimilarMovies.data.items}
            isLeftEdge={isSimilarsLeftEdge}
            isRightEdge={isSimilarsRightEdge}
            scrollContainer={scrollContainer}
            similarsScrollRef={similarsScrollRef}
          />
        )}

        {responseFactsAndBloopers.data?.items.length > 0 &&
          filteredFacts.length > 0 && (
            <MovieFacts
              factsWithoutSpoilers={factsWithoutSpoilers}
              visibleFactsWithoutSpoilers={visibleFactsWithoutSpoilers}
              factsWithSpoilers={factsWithSpoilers}
              visibleFactsWithSpoilers={visibleFactsWithSpoilers}
              loadMoreFacts={loadMoreFacts}
            />
          )}

        {responseFactsAndBloopers.data?.items.length > 0 &&
          filteredBloopers.length > 0 && (
            <MovieBloopers
              bloopers={filteredBloopers}
              visibleCount={bloopersCount}
              onLoadMore={loadMoreBloopers}
            />
          )}

        <AlternativeEndings
          movieTitle={
            responseDataFilm.data.nameRu ||
            responseDataFilm.data.nameEn ||
            responseDataFilm.data.nameOriginal
          }
          movieDescription={
            responseDataFilm.data.description ||
            responseDataFilm.data.shortDescription
          }
        />
      </div>
      <BackToTopButton />
    </div>
  );
}
