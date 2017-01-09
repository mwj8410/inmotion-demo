(function() {
  // Private
  var api_url = 'http://localhost:9000/api',
      currentDataSet = [],
      processResults = data => {
        data.forEach(item => {
          item.id = item._id;
        });
        return data;
      };

  // Public
  window.dataManager = {
    createNewMovie(data, callback) {
      $.ajax({
          method: 'POST',
          url: `${api_url}/movie/`,
          processData: false,
          contentType: 'application/json',
          data: JSON.stringify(data),
        })
        .done(data => {
          callback();
        });
    },

    getDataSet(serchTerm, callback) {
      return currentDataSet;
    },

    getDetails(id, callback) {
      $.ajax({
          method: 'GET',
          url: `${api_url}/movie`,
          data: {
            id: id
          }
        })
        .done(data => {
          callback(processResults(data)[0]);
        });
    },

    searchMovies(searchTerm, callback) {
      $.ajax({
          method: 'GET',
          data: {
            title: searchTerm
          },
          url: `${api_url}/movieSearch`
        })
        .done(data => {
          if (!data) {
            currentDataSet = [];
            return callback();
          }
          currentDataSet = processResults(data);
          return callback();
        });
    },

    updateMovie(id, values, callback) {
      $.ajax({
          method: 'PUT',
          url: `${api_url}/movie/${id}`,
          processData: false,
          contentType: 'application/json',
          data: JSON.stringify(values)
        })
        .done(data => {
          return callback();
        });
    }
  }
})();
