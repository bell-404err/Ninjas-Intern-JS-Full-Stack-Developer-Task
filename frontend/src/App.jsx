import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './app.css';

const App = () => {

  const navigate = useNavigate();

  return (
    <div className="wrapper">
        <header className="header">
          <div className="header__btn" onClick={() => navigate('/')}>
            <h1 className="header__title"> Ninjas </h1>
            <p className="header__subtitle">Test Task</p>
          </div>

          <button
            className="btn btn--primary header__create"
            onClick={() => navigate("/create")}
          >
            + Add Hero
          </button>

          <div className="header__author">
            <p>by Bogdan Onopriienko</p>
          </div>
        </header>

        <main className="main">
          <Outlet/>
        </main>

        <footer className="footer">
          <ul>
            <li> <a href="https://github.com/bell-404err" target="_blank" rel="noreferrer"> GitHub </a> </li>
            <li> <a href="https://www.linkedin.com/in/bohdan-onopriienko-640059287/" target="_blank" rel="noreferrer"> LinkedIn </a> </li>
            <li> <a href="https://t.me/bell_404err" target="_blank" rel="noreferrer"> Telegram </a> </li>
          </ul>
        </footer>
      </div>
  );
};

export default App;
