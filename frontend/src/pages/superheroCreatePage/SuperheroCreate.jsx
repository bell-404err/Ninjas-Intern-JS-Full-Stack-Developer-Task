import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHero } from '../../api/superheroes/superheroService.js';
import './superheroCreate.css';

const SuperheroCreate = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [realName, setRealName] = useState('');
  const [originDescription, setOriginDescription] = useState('');
  const [superpowers, setSuperpowers] = useState('');
  const [catchPhrase, setCatchPhrase] = useState('');
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('realName', realName);
    formData.append('originDescription', originDescription);
    formData.append('superpowers', superpowers);
    formData.append('catchPhrase', catchPhrase);

    files.forEach((file) => formData.append('images', file));

    try {
      setIsSubmitting(true);
      const newHero = await createHero(formData);
      navigate(`/superhero/${newHero.id}`);
    } catch (err) {
      console.error('Error creating hero:', err);
      alert('Failed to create hero');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create">
      <h2 className="create__title">Create Hero</h2>
      <form onSubmit={handleSubmit} className="create__form">
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
          className="input"
        />

        <input
          type="text"
          placeholder="Real name"
          value={realName}
          onChange={(e) => setRealName(e.target.value)}
          required
          className="input"
        />

        <textarea
          placeholder="Origin description"
          value={originDescription}
          onChange={(e) => setOriginDescription(e.target.value)}
          required
          className="textarea"
        />

        <textarea
          placeholder="Superpowers"
          value={superpowers}
          onChange={(e) => setSuperpowers(e.target.value)}
          required
          className="textarea"
        />

        <input
          type="text"
          placeholder="Catch phrase"
          value={catchPhrase}
          onChange={(e) => setCatchPhrase(e.target.value)}
          required
          className="input"
        />

        <div className="create__upload">
          <h3>Upload Images (max 5)</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="input-file"
          />
        </div>

        <div className="create__actions">
          <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
          <button type="button" className="btn btn--secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuperheroCreate;
