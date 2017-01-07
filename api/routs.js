const movieController = require('./controllers/movie.controller');
const userController = require('./controllers/user.controller');

module.exports = [
  // User handlers
  ['GET', 'user', userController.getUser ]
];
