import React from 'react';

import oscar from '../../../../../assets/images/oscar.svg';

import './oscar-wins.scss';

const OscarWins = ({ oscarWins }) => {
  return (
    <>
      {oscarWins && oscarWins.length > 0 && (
        <div className="detail__right-part-oscar-container">
          <div>
            <img
              className="detail__right-part-oscar-img"
              src={oscar}
              alt="Oscar statue"
            />
            <span className="detail__right-part-oscar-num">
              {oscarWins.length}
            </span>
            <div className="detail__right-part-oscar-text">
              <h5 className="detail__right-part-oscar-title">Награды</h5>
              <div className="detail__right-part-oscar-years-and-wins">
                <time className="detail__right-part-oscar-year">
                  {oscarWins[0].year}
                </time>
                <div className="detail__right-part-oscar-wins">
                  <h6 className="detail__right-part-oscar-wins-title">
                    Победители
                  </h6>
                  {oscarWins.map(win => (
                    <span
                      key={win.nominationName}
                      className="detail__right-part-nominations"
                    >
                      {win.nominationName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OscarWins;
