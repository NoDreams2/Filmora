import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { Button } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import './error-message.scss';

export default function ErrorMessage({ message }) {
  return (
    <div className="error-message__container">
      <div className="error-message__content">
        <ErrorIcon className="error-message__icon" />
        <span className="error-message__title">Ой, что-то пошло не так!</span>
        <span className="error-message__text">
          {message ||
            'Не удалось загрузить данные. Пожалуйста, попробуйте позже.'}
        </span>
        <div className="error-message__actions">
          <Button
            onClick={() => window.location.reload()}
            className="error-message__button"
          >
            Обновить страницу
          </Button>
          <Button
            component={RouterLink}
            to="/"
            className="error-message__button"
          >
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
}
