import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { iconComponents, MOVIE_LISTS, TOP_LISTS } from '../../../constants';

import './NavBar.scss';
import '../../common/logo.scss';

const Icon = ({ iconName, className }) => {
  const IconComponent = iconComponents[iconName];
  return <IconComponent className={className} />;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
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
          <Link className="logo" to="/" aria-label="logo Filmora">
            Filmora
          </Link>
        </div>
      </div>
    </nav>
  );
}
