import './detailCard.scss';

require('../../services/dataManager');

module.exports = React.createClass({
  // Internal Bindings
  getInitialState: function () {
    return {
      isCreate: false,
      isOpen: false,
      movieDetails: {}
    };
  },

  componentDidMount: function () {
    document.addEventListener('openMovie', this.fetchDetails);
    document.addEventListener('createMovie', this.openForCreate);
  },
  componentWillUnmount: function () {
    document.removeEventListener('openMovie', this.fetchDetails);
    document.removeEventListener('createMovie', this.openForCreate);
  },

  // Handlers
  createNewMovie: function(event) {
    window.dataManager.createNewMovie(this.state.movieDetails,
      () => {
        this.setState({
          isCreate: false,
          isOpen: true,
          movieDetails: this.state.movieDetails
        });
      });
  },
  fetchDetails: function (event) {
    window.dataManager.getDetails(event.movieId, data => {
      this.setState({
        isCreate: false,
        isOpen: true,
        movieDetails: {
          actors: data.actors,
          genre: data.genre,
          id: data.id,
          title: data.title,
          year: data.year
        }
      });
    });
  },

  handleChangeTitle: function (event) {
    var updateState = this.state;
    updateState.movieDetails.title = event.target.value;
    this.setState(updateState);
  },
  handleChangeGenre: function (event) {
    var updateState = this.state;
    updateState.movieDetails.genre = event.target.value;
    this.setState(updateState);
  },
  handleChangeYear: function (event) {
    var updateState = this.state;
    updateState.movieDetails.year = event.target.value;
    this.setState(updateState);
  },
  handleChangeActors: function (event) {
    var updateState = this.state;
    updateState.movieDetails.actors = event.target.value;
    this.setState(updateState);
  },

  openForCreate: function () {
    this.setState({
      isCreate: true,
      isOpen: true,
      movieDetails: {
        actors: '',
        genre: '',
        title: '',
        year: ''
      }
    });
  },
  updateDetails: function () {
    window.dataManager.updateMovie(
      this.state.movieDetails.id,
      this.state.movieDetails,
      () => {
        var event = new Event('updateResults');
        document.dispatchEvent(event);
      }
    );
  },

  displayName: 'detailCard',
  render: function () {
    return (

      <div className={'detail-card ' + (this.state.isOpen ? 'open' : 'closed')}>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-xs-2 control-label">Title</label>
            <div className="col-xs-10">
              <input type="text" className="form-control" onChange={this.handleChangeTitle} placeholder="Title" value={ this.state.movieDetails.title } />
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-2 control-label">Genre</label>
            <div className="col-xs-10">
              <input type="text" className="form-control" onChange={this.handleChangeGenre} placeholder="Genre" value={ this.state.movieDetails.genre } />
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-2 control-label">Year</label>
            <div className="col-xs-10">
              <input type="text" className="form-control" onChange={this.handleChangeYear} placeholder="Year" value={ this.state.movieDetails.year } />
            </div>
          </div>

          <div className="form-group">
            <label className="col-xs-2 control-label">Actors</label>
            <div className="col-xs-10">
              <textarea className="form-control" rows="3" onChange={this.handleChangeActors} value={ this.state.movieDetails.actors }></textarea>
            </div>
          </div>

          <div className="form-group">
            <div className="col-xs-offset-2 col-xs-10">
              {
                this.state.isCreate
                  &&
                  <button className="btn btn-default" type="button" onClick={ this.createNewMovie }>Create</button>
                  ||
                  <button className="btn btn-default" type="button" onClick={ this.updateDetails }>Update</button>
              }
            </div>
          </div>
        </form>
      </div>

    );
  }
});
