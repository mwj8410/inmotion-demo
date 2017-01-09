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
    Movie.find({ _id: req.query.id }, (err, docs) => {
      if (!err) {
        resp.send(docs);
      }
    });
  },

  getMoviesBySearch: (req, resp) => {
    var query;
    if (!req.query.title) {
      query = {};
    } else {
      query = {
        title: req.query.title
      }
    }
    Movie.find(query, (err, docs) => {
      if (!err) {
        resp.send(docs);
      }
    });
  },

  updateMovie: (req, resp) => {
    Movie.update(
      { _id: req.body.id },
      req.body,
      {},
      () => {
        resp.send();
      }
    );
  }
};
