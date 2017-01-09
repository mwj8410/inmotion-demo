const movieController = require('./controllers/movie.controller');

module.exports = [
  // Movie handlers
  [ 'GET', 'movie', movieController.getMovie ],
  [ 'GET', 'movieSearch', movieController.getMoviesBySearch ],

  [ 'PUT', 'movie/:id', movieController.updateMovie ],

  [ 'POST', 'movie', movieController.createMovie ]

];
