import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { iconComponents, MOVIE_LISTS, TOP_LISTS } from '../../../constants';
import styles from './NavBar.module.scss';

const Icon = ({ iconName, className }) => {
  const IconComponent = iconComponents[iconName];
  return <IconComponent className={className} />;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsOpen(prevState => !prevState);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__toolbar}>
          <button
            className={styles.navbar__button}
            onClick={handleDrawerToggle}
            aria-label="open menu"
            aria-expanded={isOpen}
          >
            <span className={styles.navbar__burger}></span>
            <span className={styles.navbar__burger}></span>
            <span className={styles.navbar__burger}></span>
          </button>

          {isOpen && (
            <div className={styles.navbar__overlay} onClick={closeDrawer} />
          )}

          <div
            className={`${styles.navbar__drawer} ${isOpen ? styles.drawerOpen : ''}`}
          >
            <div className={styles.navbar__menu}>
              <ul className={styles.navbar__list}>
                {TOP_LISTS.map(item => (
                  <li key={item.title} className={styles.navbar__listItem}>
                    <RouterLink to={item.url} className={styles.navbar__link}>
                      <div className={styles.navbar__listItemButton}>
                        <div className={styles.navbar__listItemIcon}>
                          <Icon
                            iconName={item.icon}
                            className={styles.navbar__movieItemIcon}
                          />
                        </div>
                        <span className={styles.navbar__listItemText}>
                          {item.title}
                        </span>
                      </div>
                    </RouterLink>
                  </li>
                ))}
              </ul>
              <div className={styles.navbar__divider} />
              <ul className={styles.navbar__list}>
                {MOVIE_LISTS.map(item => (
                  <li key={item.title} className={styles.navbar__listItem}>
                    <RouterLink to={item.url} className={styles.navbar__link}>
                      <div className={styles.navbar__listItemButton}>
                        <div className={styles.navbar__listItemIcon}>
                          <Icon
                            iconName={item.icon}
                            className={styles.navbar__movieItemIcon}
                          />
                        </div>
                        <span className={styles.navbar__listItemText}>
                          {item.title}
                        </span>
                      </div>
                    </RouterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <a className={styles.navbar__logo} href="/">
            Filmora
          </a>
        </div>
      </div>
    </nav>
  );
}
