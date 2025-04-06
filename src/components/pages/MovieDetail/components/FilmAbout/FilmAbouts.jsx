import React, { useState } from 'react';

import './film-about.scss';

import { Link } from 'react-router-dom';

const FilmAbout = ({ filmData, staffData, budgetData }) => {
  const [expandedProfession, setExpandedProfession] = useState([]);

  const handleShowFullNames = professionKey => {
    setExpandedProfession([...expandedProfession, professionKey]);
  };

  const handleCloseFullNames = professionKey => {
    setExpandedProfession(
      expandedProfession.filter(key => key !== professionKey),
    );
  };

  const renderStaffWithLinks = staffs => {
    if (staffs.length === 0) return null;

    return staffs.map((staff, index) => (
      <React.Fragment key={staff.staffId}>
        <Link
          to={`/name/${staff.staffId}`}
          className="detail__center-part-value detail__center-part-value_link"
        >
          {staff.nameRu || staff.nameEn}
        </Link>
        {index < staffs.length - 1 ? ', ' : ', '}
      </React.Fragment>
    ));
  };

  const renderShortenedStaff = (staffs, professionKey) => {
    const displayedStaffs = staffs.slice(0, 3);
    const remainingCount = staffs.length - 3;
    const isExpanded = expandedProfession.includes(professionKey);

    return (
      <>
        {renderStaffWithLinks(displayedStaffs)}
        {remainingCount > 0 && !isExpanded && (
          <span
            className="detail__center-part-value_link"
            onClick={() => handleShowFullNames(professionKey)}
          >
            ... ( и ещё {remainingCount})
          </span>
        )}
        {isExpanded && (
          <>
            {renderStaffWithLinks(staffs.slice(3))}
            <button
              className="detail__center-part-button-close-names"
              onClick={() => handleCloseFullNames(professionKey)}
            >
              Скрыть
            </button>
          </>
        )}
      </>
    );
  };

  const renderStaffSection = (professionKey, title) => {
    const filteredStaff = staffData.filter(
      el => el.professionKey === professionKey,
    );

    if (filteredStaff.length === 0) return null;

    return (
      <div className="detail__center-part-about-container">
        <span className="detail__center-part-key">{title}</span>
        <span className="detail__center-part-value">
          {filteredStaff.length > 3
            ? renderShortenedStaff(filteredStaff, professionKey)
            : renderStaffWithLinks(filteredStaff)}
        </span>
      </div>
    );
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
        {renderStaffSection('DIRECTOR', 'Режиссер')}
        {renderStaffSection('WRITER', 'Сценарий')}
        {renderStaffSection('PRODUCER', 'Продюсер')}
        {renderStaffSection('OPERATOR', 'Оператор')}
        {renderStaffSection('COMPOSER', 'Композитор')}
        {renderStaffSection('DESIGN', 'Художник')}
        {renderStaffSection('EDITOR', 'Монтаж')}
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
