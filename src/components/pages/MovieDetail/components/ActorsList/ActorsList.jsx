import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './actors-list.scss';

import { getDeclensionActorsText } from '../../../../../utils/format/text';
import OscarWins from '../OscarWins/OscarWins';

const ActorsList = ({ staffData, oscarWins }) => {
  const [showAllActors, setShowAllActors] = useState(false);

  const toggleActorsList = () => {
    setShowAllActors(!showAllActors);
  };

  const actors = staffData.filter(el => el.professionKey === 'ACTOR');

  return (
    <div className="detail__right-part-actors-container">
      <div className="detail__right-part-actors-and-oscars-container">
        <h3 className="detail__right-part-actors-title">В главных ролях</h3>
        {actors.length > 0 && (
          <div className="detail__right-part-actors-list">
            {actors.map(actor => (
              <Link
                key={actor.staffId}
                to={`/name/${actor.staffId}`}
                className="detail__right-part-actors-name"
              >
                {actor.nameRu ? actor.nameRu : actor.nameEn}
              </Link>
            ))}
          </div>
        )}
        {actors.length > 0 && (
          <span
            className="detail__right-part-num-actors"
            onClick={toggleActorsList}
          >
            {actors.length} {getDeclensionActorsText(actors.length)}
          </span>
        )}
      </div>
      {oscarWins && oscarWins.length > 0 && <OscarWins oscarWins={oscarWins} />}
    </div>
  );
};
export default ActorsList;
