import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHero } from '../../hooks/useHero.js';
import { deleteHero } from '../../api/superheroes/superheroService.js';
import { API_URL } from '../../config.js';
import placeholderImage from '../../assets/img/superhero-placeholder.png';
import './superheroView.css';

const SuperheroView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: hero, isLoading, isError } = useHero(id);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isLoading) return <p className="view__status">Loading...</p>;
  if (isError) return <p className="view__status view__status--error">Error loading hero</p>;

  const getImageUrl = (img) =>
    img?.url ? `${API_URL}${img.url}` : placeholderImage;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this hero?')) return;
    try {
      setIsDeleting(true);
      await deleteHero(id);
      navigate('/');
    } catch (err) {
      console.error('Error deleting hero:', err);
      alert('Failed to delete hero');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="view">
      <div className="view__card">
        <h2 className="view__title">{hero.nickname}</h2>
        <hr className="view__divider" />

        <div className="view__image-block">
          {hero.images?.length ? (
            hero.images.map((img) => (
              <div key={img.id} className="view__image-wrapper">
                <img
                  src={getImageUrl(img)}
                  alt={hero.nickname}
                  className="view__image"
                />
              </div>
            ))
          ) : (
            <div className="view__image-wrapper">
              <p>No images uploaded</p>
              <img src={placeholderImage} alt="No images" className="view__image"/>
            </div>
          )}
        </div>

        <div className="view__info">
          <p><b>Real name:</b> {hero.realName}</p>
          <p><b>Origin:</b> {hero.originDescription}</p>
          <p><b>Superpowers:</b> {hero.superpowers}</p>
          <div className="view__phrase">
            <i>{hero.catchPhrase}</i>
          </div>
        </div>

        <div className="view__actions">
          <button className="btn btn--primary" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
          <button className="btn btn--danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperheroView;
