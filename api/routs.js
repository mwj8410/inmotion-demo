const movieController = require('./controllers/movie.controller');
const userController = require('./controllers/user.controller');

module.exports = [
  // Movie handlers
  [ 'GET', 'movie/:id', movieController.getMovie ],
  [ 'GET', 'movie/all', movieController.getMoviesAll ],
  [ 'GET', 'movie/search', movieController.getMoviesBySearch ],

  [ 'POST', 'movie', movieController.createMovie ],

  // User handlers
   ['GET', 'user:id?', userController.getUser ]
];
