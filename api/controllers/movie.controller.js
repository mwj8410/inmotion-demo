const Movie = require('../models/movie.model');

module.exports = {
  createMovie: (req, resp) => {
    var movie;
    if (req.get('content-type') !== 'application/json' && !req.body) {
      resp.status(404).end();
    }

    movie = new Movie(req.body);
    movie.save(err => {
      if (!err) {
        return resp.send();
      }
    });
  },

  getMovie: (req, resp) => {
    Movie.find(req.query.id, (err, docs) => {
      if (!err) {
        resp.send(docs);
      }
    });
  },

  getMoviesAll: (req, resp) => {
    Movie.find({}, (err, docs) => {
      if (!err) {
        resp.send(docs);
      }
    });
  },

  getMoviesBySearch: (req, resp) => {
    Movie.find(req.query.title, (err, docs) => {
      if (!err) {
        resp.send(docs);
      }
    });
  },
};
