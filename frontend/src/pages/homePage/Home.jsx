import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useHeroList } from '../../hooks/useHeroList.js';
import SuperheroCard from '../../components/superheroCard/SuperheroCard.jsx';
import './home.css';

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useHeroList(page, 5);
  const navigate = useNavigate();

  if (isLoading) return <p className="home__status">Loading...</p>;
  if (isError) return <p className="home__status home__status--error">Error loading heroes</p>;

  return (
    <div className="home">
      <div className="home__header">
        <h2 className="home__title">Superheroes</h2>
      </div>

      <div className="home__list">
        {data.map((hero) => (
          <SuperheroCard key={hero.id} hero={hero}/>
        ))}
      </div>

      <div className="home__pagination">
        <button
          className="btn btn--secondary"
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="btn btn--secondary"
          onClick={() => setPage(p => p + 1)}
          disabled={data.length < 5}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
