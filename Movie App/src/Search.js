import React from 'react'
import { useGlobalContext } from './context';

const Search = () => {
  const {query, setQuery, isError} = useGlobalContext();
  return (
    <>
  <section className='search-section'>
    <h1>Welcome to the Movie App</h1>
    <h2>Search Your Favorite Movie</h2>
    <form action='#' onSubmit={(e) => e.preventDefault()}>
    <div>
      <input type= "text" placeholder='Search here!'
      value={query}
      onChange={(e) => setQuery(e.target.value)}>
      </input>
    </div>
    </form>
  <div className='card-error'>
    <p>{isError.show && isError.message}</p>

  </div>
  </section>
  
      
    </>
  );
};

export default Search;
