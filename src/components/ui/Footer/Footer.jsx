import React from 'react';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__copyrightContainer}>
          <p className={styles.footer__copyright}>
            &copy; {new Date().getFullYear()} &laquo;FILMORA&raquo; 18+
          </p>
          <p>Данный сайт создан исключительно в обучающих целях.</p>
          <p>Все права принадлежат правообладателям.</p>
        </div>
        <span className={styles.footer__logo}>Filmora</span>
      </div>
    </footer>
  );
}
