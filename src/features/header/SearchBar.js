import React, { useState } from 'react';

export default function SearchBar({search, setSearch}) {
  const [beforeSearch, setBeforeSearch] = useState('');

  const handleSearch = (event) => {
    setBeforeSearch(event.target.value);
  };

  const onSearch = (event) => {
    setSearch(beforeSearch);

    event.preventDefault();
  }

  return (
    <div className='search-bar'>
      <form onSubmit={onSearch}>
        <input 
          type="text" 
          placeholder='Search'
          onChange={handleSearch}
          value={beforeSearch}
        />
        <button 
          type="submit"
        >
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  );
}