import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { Button } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import styles from './ErrorMessage.module.scss';

export default function ErrorMessage({ message }) {
  return (
    <div className={styles.error__container}>
      <div className={styles.error__content}>
        <ErrorIcon className={styles.error__icon} />
        <span className={styles.error__title}>Ой, что-то пошло не так!</span>
        <span className={styles.error__text}>
          {message ||
            'Не удалось загрузить данные. Пожалуйста, попробуйте позже.'}
        </span>
        <div className={styles.error__actions}>
          <Button
            onClick={() => window.location.reload()}
            className={styles.error__button}
          >
            Обновить страницу
          </Button>
          <Button
            component={RouterLink}
            to="/"
            className={styles.error__button}
          >
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
}
