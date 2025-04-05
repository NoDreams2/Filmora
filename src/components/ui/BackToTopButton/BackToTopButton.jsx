import React, { useEffect, useState } from 'react';

import './back-to-top-button.scss';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 1400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`back-to-top ${isVisible ? 'back-to-top_visible' : ''}`}>
      <button
        onClick={scrollToTop}
        className="back-to-top-button"
        aria-label="Наверх"
      ></button>
    </div>
  );
}
