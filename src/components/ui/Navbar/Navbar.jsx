import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import imgSearch from '../../../assets/images/search.svg';
import { iconComponents, MOVIE_LISTS, TOP_LISTS } from '../../../constants';

import './nav-bar.scss';
import '../../common/logo.scss';

import Search from '../Search';

const Icon = ({ iconName, className }) => {
  const IconComponent = iconComponents[iconName];
  return <IconComponent className={className} />;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchVisible(prev => !prev);
  }, []);

  useEffect(() => {
    const handleESC = e => {
      if (e.key === 'Escape') {
        closeDrawer();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleESC);
      document.querySelector('.navbar__drawer').focus();
    }

    return () => document.removeEventListener('keydown', handleESC);
  }, [isOpen]);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__toolbar">
          <button
            className="navbar__button"
            onClick={handleDrawerToggle}
            aria-label="open menu"
            aria-controls="main-menu"
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <span className="navbar__burger"></span>
            <span className="navbar__burger"></span>
            <span className="navbar__burger"></span>
          </button>

          {isOpen && <div className="navbar__overlay" onClick={closeDrawer} />}
          <nav
            className={`navbar__drawer ${isOpen ? 'navbar__drawer_open' : ''}`}
            aria-label="main menu"
            id="main-menu"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="navbar__menu">
              <ul className="navbar__list">
                {TOP_LISTS.map(item => (
                  <li key={item.title} className="navbar__list-item">
                    <Link
                      to={item.url}
                      className="navbar__link"
                      onClick={handleDrawerToggle}
                    >
                      <div className="navbar__list-item-button">
                        <div>
                          <Icon iconName={item.icon} />
                        </div>
                        <span className="navbar__list-item-text">
                          {item.title}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="navbar__divider" />
              <ul className="navbar__list">
                {MOVIE_LISTS.map(item => (
                  <li key={item.title} className="navbar__list-item">
                    <Link
                      to={item.url}
                      className="navbar__link"
                      onClick={handleDrawerToggle}
                    >
                      <div className="navbar__list-item-button">
                        <div>
                          <Icon iconName={item.icon} />
                        </div>
                        <span className="navbar__list-item-text">
                          {item.title}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="navbar__logo-search">
            <Link className="logo" to="/" aria-label="logo Filmora">
              Filmora
            </Link>
            <Search
              isMobileVisible={isSearchVisible}
              onClose={() => setIsSearchVisible(false)}
            />
            <div className="navbar__search-theme">
              <img
                className="navbar__search-img"
                src={imgSearch}
                alt="Поиск"
                onClick={toggleSearch}
              />
              <span className="navbar__theme">тема</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
