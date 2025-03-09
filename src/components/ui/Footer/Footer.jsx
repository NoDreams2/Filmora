import React from 'react';

import './Footer.scss';
import '../../common/logo.scss';

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo" aria-label="basement website">
      <div className="footer__container">
        <div className="footer__copyright-container">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} &laquo;FILMORA&raquo; 18+
          </p>
          <p>Данный сайт создан исключительно в обучающих целях.</p>
          <p>Все права принадлежат правообладателям.</p>
        </div>
        <Link className="logo" to="/" aria-label="logo Filmora">
          Filmora
        </Link>
      </div>
    </footer>
  );
}
