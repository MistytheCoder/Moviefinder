 import React from 'react';

class Finder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      search: '',
      error: ''
    };
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const query = this.state.search.trim();
    if (!query) return;

    fetch(`https://www.omdbapi.com/?s=${query}&apikey=8598ab16&type=movie`)
      .then(res => res.json())
      .then(data => {
        if (data.Response === 'True') {
          this.setState({ movies: data.Search, error: '' });
        } else {
          this.setState({ movies: [], error: data.Error });
        }
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.search} onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>

        {this.state.error && <p>{this.state.error}</p>}

        <div>
          {this.state.movies.map(movie => (
            <div key={movie.imdbID}>
              <a href={`https://www.imdb.com/title/${movie.imdbID}/`} target="_blank">
                <h3>{movie.Title} ({movie.Year})</h3>
              </a>
              {movie.Poster !== 'N/A' && <img src={movie.Poster} />}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Finder;
