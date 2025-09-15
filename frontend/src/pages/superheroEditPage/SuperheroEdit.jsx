import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHero } from "../../hooks/useHero.js";
import { updateHero } from "../../api/superheroes/superheroService.js";
import { API_URL } from "../../config.js";
import placeholderImage from "../../assets/img/superhero-placeholder.png";
import "./superheroEdit.css";

const SuperheroEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: hero, isLoading, isError } = useHero(id);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return <p className="edit__status">Loading...</p>;
  if (isError) return <p className="edit__status edit__status--error">Error loading hero</p>;

  const [nickname, setNickname] = useState(hero.nickname || "");
  const [realName, setRealName] = useState(hero.realName || "");
  const [originDescription, setOriginDescription] = useState(hero.originDescription || "");
  const [superpowers, setSuperpowers] = useState(hero.superpowers || "");
  const [catchPhrase, setCatchPhrase] = useState(hero.catchPhrase || "");
  const [images, setImages] = useState(hero.images || []);

  const handleImageDelete = (imgId) => {
    setImages((prev) => prev.filter((img) => img.id !== imgId));
  };

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("realName", realName);
    formData.append("originDescription", originDescription);
    formData.append("superpowers", superpowers);
    formData.append("catchPhrase", catchPhrase);

    images.forEach((img) => formData.append("existingImages", img.id));
    files.forEach((file) => formData.append("images", file));

    try {
      setIsSubmitting(true);
      await updateHero(id, formData);
      navigate(`/superhero/${id}`);
    } catch (err) {
      console.error("Error updating hero:", err);
      alert("Failed to update hero");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getImageUrl = (img) =>
    img?.url ? `${API_URL}${img.url}` : placeholderImage;

  return (
    <div className="edit">
      <h2 className="edit__title">Edit Hero</h2>
      <form onSubmit={handleSubmit} className="edit__form">
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

        <div className="edit__images">
          <h3>Current Images</h3>
          {images.length ? (
            <div className="edit__images-grid">
              {images.map((img) => (
                <div key={img.id} className="edit__image-wrapper">
                  <img
                    src={getImageUrl(img)}
                    alt="hero"
                    className="edit__image"
                  />
                  <button
                    type="button"
                    className="edit__image-delete"
                    onClick={() => handleImageDelete(img.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No images yet</p>
          )}
        </div>

        <div className="edit__upload">
          <h3>Add New Images</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="input-file"
          />
        </div>

        <div className="edit__actions">
          <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button type="button" className="btn btn--secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuperheroEdit;
