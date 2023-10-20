// repositories/movieRepository.js
const Movie = require('./models/Movie');

const moviesData = [
  new Movie(1, 'Movie 1', 'title 1'),
  new Movie(2, 'Movie 2', 'title 2'),
  // ...
];

const movieRepository = {
  getAllMovies: async () => {
    return moviesData;
  },
  // other repository methods...
};

module.exports = movieRepository;
