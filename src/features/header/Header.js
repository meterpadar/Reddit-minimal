import React from 'react';
import SearchBar from './SearchBar.js';

export default function Header({search, setSearch}) {
  const togglePhoneMenu = () => {
    const subredditsElement = document.getElementById('subreddits');

    if (subredditsElement.style.display === 'none' || subredditsElement.style.display === '') {
      subredditsElement.style.display = 'block';
    } else {
      subredditsElement.style.display = 'none';
    };
  }; 

  return (
    <div className='header'>
      <div className='logo'>
        <a href='/'>
          <i className="fab fa-reddit"></i>
          <span>Reddit</span>Minimal
        </a>
      </div>
      <SearchBar 
        search={search}
        setSearch={setSearch}
      />
      <button 
        className='phone-button-menu'
        onClick={togglePhoneMenu}
      >
        <i className="fas fa-bars"></i>
      </button>
    </div>
  );
}