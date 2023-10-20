const movieRepository = require('../repositories/movieRepository');

const movieController = {
  getAllMovies: async (req, res) => {
    const movies = await movieRepository.getAllMovies();
    res.json(movies);
  },
  // other controller methods...
};

module.exports = movieController;
