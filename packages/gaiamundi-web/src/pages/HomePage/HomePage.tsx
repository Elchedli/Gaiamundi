import React from 'react';
import logo from './logo.svg';
import './HomePage.css';

export const HomePage: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Développement en cours ...</p>
      </header>
    </div>
  );
};

export default HomePage;
