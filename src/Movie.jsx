import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Movie() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=8598ab16&plot=full`)
      .then(res => res.json())
      .then(data => {
        if (data.Response === 'True') {
          setMovie(data);
          setError('');
        } else {
          setError(data.Error);
        }
      });
  }, [imdbID]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/">← Back to search</Link>
      <h1>{movie.Title} ({movie.Year})</h1>
      {movie.Poster !== 'N/A' && <img src={movie.Poster} alt={movie.Title} />}
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
      <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer">
        View on IMDb
      </a>
    </div>
  );
}

export default Movie;
