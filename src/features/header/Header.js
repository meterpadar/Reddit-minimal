import React from 'react';
import SearchBar from './SearchBar.js';

export default function Header({search, setSearch}) {
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
    </div>
  );
}