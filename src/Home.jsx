import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) return;

    fetch(`https://www.omdbapi.com/?s=${query}&apikey=8598ab16&type=movie`)
      .then(res => res.json())
      .then(data => {
        if (data.Response === 'True') {
          setMovies(data.Search);
          setError('');
        } else {
          setMovies([]);
          setError(data.Error);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={search} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>}

      <div>
        {movies.map(movie => (
          <div key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>
              <h3>{movie.Title} ({movie.Year})</h3>
            </Link>
            {movie.Poster !== 'N/A' && <img src={movie.Poster} alt={movie.Title} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
