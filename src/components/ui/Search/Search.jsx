import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetFilmsQuery } from '../../../services/kinopoiskApi';

import './search.scss';

import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Search({ isMobileVisible, onClose }) {
  const { countries, genreId, order, type, year, page } = useSelector(
    state => state.searchQuerySlice,
  );

  const [inputValue, setInputValue] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const expandTimeout = useRef(null);
  const resultsTimeout = useRef(null);

  const { data, isFetching, isError } = useGetFilmsQuery({
    countries,
    genreId,
    order,
    type,
    year,
    page,
    keyword: inputValue,
  });

  useEffect(() => {
    if (isMobileVisible && inputRef.current) {
      inputRef.current.focus();
      handleFocus();
    }
  }, [isMobileVisible]);

  const handleSubmit = e => {
    e.preventDefault();
    setShowResults(true);
  };

  const handleFocus = () => {
    setShowOverlay(true);
    setIsExpanded(true);
    setIsFocused(true);
    if (isMobileVisible) {
      setShowResults(true);
    } else {
      resultsTimeout.current = setTimeout(() => {
        setShowResults(true);
      }, 300);
    }
  };

  const handleBlur = () => {
    clearTimeout(expandTimeout.current);
    clearTimeout(resultsTimeout.current);
    setIsExpanded(false);
    setIsFocused(false);
    setShowOverlay(false);
    setShowResults(false);
    if (window.innerWidth <= 920 && onClose) {
      onClose();
    }
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
        className={`search__form ${isExpanded ? 'search__form_focused' : ''} ${isMobileVisible ? 'search__form_visible' : ''}`}
        onSubmit={handleSubmit}
        ref={searchRef}
      >
        <div className="search__input-container">
          <input
            ref={inputRef}
            className="search__input"
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Поиск"
          />
          {isFetching && (
            <div className="search__progress">
              <CircularProgress
                size={20}
                sx={{
                  color: '#00a1e7',
                }}
              />
            </div>
          )}
        </div>

        <div className="search__list-wrapper">
          <ul
            className={`search__list ${showResults ? 'search__list_visible' : ''}`}
          >
            {isError ? (
              <li className="search__error">Ошибка загрузки</li>
            ) : data?.items?.length > 0 ? (
              data.items.map(film => (
                <li className="search__item" key={film.kinopoiskId}>
                  <Link
                    className="search__link"
                    to={`/film/${film.kinopoiskId}`}
                    onMouseDown={() => {
                      setShowResults(false);
                      setInputValue('');
                      setIsExpanded(false);
                      setTimeout(() => {
                        window.location.href = `/film/${film.kinopoiskId}`;
                      }, 0);
                    }}
                  >
                    {`${film.nameRu || film.nameEn || film.nameOriginal} ${film.year ? ` - ${film.year}` : ''}`}
                  </Link>
                </li>
              ))
            ) : (
              inputValue &&
              !isFetching && (
                <li className="search__empty">Ничего не найдено</li>
              )
            )}
          </ul>
        </div>
      </form>
    </>
  );
}
