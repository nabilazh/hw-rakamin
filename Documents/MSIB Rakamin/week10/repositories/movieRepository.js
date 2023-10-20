const Movie = require('./models/Movie');

const moviesData = [
  new Movie(1, 'Movie 1', 'genres 1'),
  new Movie(2, 'Movie 2', 'genres 2'),
  // ...
];

const movieRepository = {
  getAllMovies: async () => {
    return moviesData;
  },
};

module.exports = movieRepository;
