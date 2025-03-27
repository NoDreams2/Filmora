import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetFilmsQuery } from '../../../services/kinopoiskApi';

import './search.scss';

import { Link } from 'react-router-dom';

export default function Search() {
  const { countries, genreId, order, type, year, page, keyword } = useSelector(
    state => state.searchQuerySlice,
  );

  const [inputValue, setInputValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const searchRef = useRef(null);
  const expandTimeout = useRef(null);
  const resultsTimeout = useRef(null);
  const overlayTimeout = useRef(null);

  const { data, isLoading } = useGetFilmsQuery({
    countries,
    genreId,
    order,
    type,
    year,
    page,
    keyword: inputValue,
  });

  const handleSubmit = e => {
    e.preventDefault();
    setShowResults(true);
  };

  const handleFocus = () => {
    overlayTimeout.current = setTimeout(() => {
      setShowOverlay(true);
    }, 300);

    expandTimeout.current = setTimeout(() => {
      setIsExpanded(true);
    }, 700);

    resultsTimeout.current = setTimeout(() => {
      setShowResults(true);
    }, 700);

    setIsFocused(true);
  };

  const handleBlur = () => {
    clearTimeout(expandTimeout.current);
    clearTimeout(resultsTimeout.current);
    setIsExpanded(false);
    setShowResults(false);
    setIsFocused(false);
    setShowOverlay(false);
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        handleBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(expandTimeout.current);
      clearTimeout(resultsTimeout.current);
    };
  }, []);

  return (
    <>
      {isFocused && (
        <div
          className={`search__overlay ${showOverlay ? 'search__overlay_focused' : ''}`}
          onClick={handleBlur}
        ></div>
      )}
      <form
        className={`search__form ${isExpanded ? 'search__form_focused' : ''}`}
        onSubmit={handleSubmit}
        ref={searchRef}
      >
        <input
          className="search__input"
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Поиск"
        />

        <ul
          className={`search__list ${showResults ? 'search__list_visible' : ''}`}
        >
          {data?.items?.map(film => (
            <li className="search__item" key={film.kinopoiskId}>
              <Link
                className="search__link"
                to={`/movie/${film.kinopoiskId}`}
                onClick={() => {
                  setShowResults(false);
                  setInputValue('');
                  setIsExpanded(false);
                }}
              >
                {film.nameRu}
              </Link>
            </li>
          ))}
        </ul>
      </form>
    </>
  );
}
