import React from 'react';
import { useNavigate } from 'react-router-dom';
import placeholderImage from '../../assets/img/superhero-placeholder.png';
import { API_URL } from '../../config.js';
import './superheroCard.css';

const MAX_LENGTH = 150;

const getCharacterTitleImage = (hero) => {
  const firstImage = hero.images?.[0]?.url;
  return firstImage ? `${API_URL}${firstImage}` : placeholderImage;
};

const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const SuperheroCard = ({ hero }) => {
  const navigate = useNavigate();

  return (
    <div
      className="superhero-card"
      onClick={() => navigate(`/superhero/${hero.id}`)}
    >
      <h3 className="superhero-card__title">{hero.nickname}</h3>
      <hr className="superhero-card__divider"/>

      <img
        src={getCharacterTitleImage(hero)}
        alt={hero.nickname}
        className="superhero-card__image"
      />

      <div className="superhero-card__phrase">
        <p><i>{hero.catchPhrase}</i></p>
      </div>

      <p className="superhero-card__description">
        {truncateText(hero.originDescription, MAX_LENGTH)}
      </p>
    </div>
  );
};

export default SuperheroCard;
