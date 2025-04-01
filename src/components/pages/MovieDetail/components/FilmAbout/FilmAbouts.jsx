import React from 'react';

import './film-about.scss';

const FilmAbout = ({ filmData, staffData, budgetData }) => {
  const staffSlice = staffs => {
    const numberOfStaffs = staffs.map(staff =>
      staff.nameRu ? staff.nameRu : staff.nameEn,
    );
    if (staffs.length > 3) {
      return `${numberOfStaffs.slice(0, 3).join(', ')}, ...`;
    }
    return numberOfStaffs.join(', ');
  };
  return (
    <div className="detail__center-part-about-detail">
      <div className="detail__center-part-about-detail-container">
        <h3 className="detail__center-part-title-about">О фильме</h3>
        {filmData.year && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Год Производства</span>
            <span className="detail__center-part-value">{filmData.year}</span>
          </div>
        )}
        {filmData.country && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Страна</span>
            <span className="detail__center-part-value">
              {filmData.countries.map(country => country.country).join(', ')}
            </span>
          </div>
        )}
        {filmData.genre && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Жанр</span>
            <span className="detail__center-part-value">
              {filmData.genres.map(genre => genre.genre).join(', ')}
            </span>
          </div>
        )}
        {filmData.slogan && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Слоган</span>
            <span className="detail__center-part-value">{filmData.slogan}</span>
          </div>
        )}
        {staffData.some(el => el.professionKey === 'DIRECTOR') && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Режиссер</span>
            <span className="detail__center-part-value">
              {staffSlice(
                staffData.filter(el => el.professionKey === 'DIRECTOR'),
              )}
            </span>
          </div>
        )}
        {staffData.some(el => el.professionKey === 'WRITER') && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Сценарий</span>
            <span className="detail__center-part-value">
              {staffSlice(
                staffData.filter(el => el.professionKey === 'WRITER'),
              )}
            </span>
          </div>
        )}
        {staffData.some(el => el.professionKey === 'PRODUCER') && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Продюсер</span>
            <span className="detail__center-part-value">
              {staffSlice(
                staffData.filter(el => el.professionKey === 'PRODUCER'),
              )}
            </span>
          </div>
        )}
        {staffData.some(el => el.professionKey === 'OPERATOR') && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Оператор</span>
            <span className="detail__center-part-value">
              {staffSlice(
                staffData.filter(el => el.professionKey === 'OPERATOR'),
              )}
            </span>
          </div>
        )}
        {staffData.some(el => el.professionKey === 'COMPOSER') && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Композитор</span>
            <span className="detail__center-part-value">
              {staffSlice(
                staffData.filter(el => el.professionKey === 'COMPOSER'),
              )}
            </span>
          </div>
        )}
        {staffData.some(el => el.professionKey === 'DESIGN') && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Художник</span>
            <span className="detail__center-part-value">
              {staffSlice(
                staffData.filter(el => el.professionKey === 'DESIGN'),
              )}
            </span>
          </div>
        )}
        {staffData.some(el => el.professionKey === 'EDITOR') && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Монтаж</span>
            <span className="detail__center-part-value">
              {staffSlice(
                staffData.filter(el => el.professionKey === 'EDITOR'),
              )}
            </span>
          </div>
        )}
        {budgetData.items.some(el => el.type === 'BUDGET') && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Бюджет</span>
            <span className="detail__center-part-value">
              $
              {budgetData.items
                .find(el => el.type === 'BUDGET')
                .amount.toLocaleString('ru-RU')}
            </span>
          </div>
        )}
        {budgetData.items.some(el => el.type === 'USA') && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Сборы в США</span>
            <span className="detail__center-part-value">
              $
              {budgetData.items
                .find(el => el.type === 'USA')
                .amount.toLocaleString('ru-RU')}
            </span>
          </div>
        )}
        {budgetData.items.some(el => el.type === 'WORLD') && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Сборы в мире</span>
            <span className="detail__center-part-value">
              $
              {budgetData.items
                .find(el => el.type === 'WORLD')
                .amount.toLocaleString('ru-RU')}
            </span>
          </div>
        )}
        {budgetData.items.some(el => el.type === 'RUS') && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Сборы в России</span>
            <span className="detail__center-part-value">
              $
              {budgetData.items
                .find(el => el.type === 'RUS')
                .amount.toLocaleString('ru-RU')}
            </span>
          </div>
        )}
        {filmData.filmLength && (
          <div className="detail__center-part-about-container">
            <span className="detail__center-part-key">Время</span>
            <span className="detail__center-part-value">
              {filmData.filmLength} мин
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default FilmAbout;
