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
  const searchRef = useRef(null);

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
    setShowResults(true);
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form className="search__form" onSubmit={handleSubmit} ref={searchRef}>
      <input
        className="search__input"
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onFocus={handleFocus}
        placeholder="Поиск"
      />

      {showResults && data && data.items && (
        <ul className="search__list">
          {data.items.map(film => (
            <li className="search__item" key={film.kinopoiskId}>
              <Link className="search__link" to={''}>
                {film.nameRu}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
