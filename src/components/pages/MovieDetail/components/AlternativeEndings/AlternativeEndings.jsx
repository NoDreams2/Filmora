import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';

import { generateAlternativeEnding } from '../../../../../services/openRouterApi';

import './alternative-endings.scss';

import { useParams } from 'react-router-dom';

export const AlternativeEndings = ({ movieTitle, movieDescription }) => {
  const [alternativeEndings, setAlternativeEndings] = useState('');
  const [isGeneratingEndings, setIsGeneratingEndings] = useState(false);
  const [showEndings, setShowEndings] = useState(false);
  const { id } = useParams();

  const handleGenerateEndings = async () => {
    setIsGeneratingEndings(true);
    try {
      const endings = await generateAlternativeEnding(
        movieTitle,
        movieDescription,
      );
      setAlternativeEndings(endings);
      setShowEndings(true);
    } finally {
      setIsGeneratingEndings(false);
    }
  };

  const handleHideEdings = () => {
    setShowEndings(false);
    setAlternativeEndings('');
  };

  useEffect(() => {
    setAlternativeEndings('');
  }, [id]);

  return (
    <div className="detail__bottom-part-alternative">
      <h4 className="detail__bottom-part-alternative-title">
        «Что, если?»: Альтернативные концовки от ИИ
      </h4>
      {showEndings && alternativeEndings ? (
        <>
          <p className="detail__bottom-part-alternative-text">
            {alternativeEndings
              ?.replace(/(\d+\))/g, '\n$1')
              .split('\n')
              .map((paragraph, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {paragraph}
                </React.Fragment>
              ))}
          </p>
          <div className="detail__bottom-part-buttons">
            <button
              className="button detail__bottom-part-alternative-button"
              onClick={handleGenerateEndings}
              disabled={isGeneratingEndings}
            >
              {isGeneratingEndings ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                'Попробовать еще раз'
              )}
            </button>
            <button className="button" onClick={handleHideEdings}>
              Скрыть
            </button>
          </div>
        </>
      ) : (
        <button
          className="button detail__bottom-part-alternative-button"
          onClick={handleGenerateEndings}
          disabled={isGeneratingEndings}
        >
          {isGeneratingEndings ? (
            <CircularProgress size={16} color="inherit" />
          ) : (
            'Сгенерировать концовку'
          )}
        </button>
      )}
    </div>
  );
};
