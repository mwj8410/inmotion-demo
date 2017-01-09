import './searchPanel.scss';

require('../../services/dataManager');

module.exports = React.createClass({
  // Internal Bindings
  getInitialState: function () {
    return {
      matchingTitles: window.dataManager.getDataSet(),
      searchTerm: ''
    };
  },

  componentDidMount: function () {
    document.addEventListener('updateResults', this.refreshResultList);
  },
  componentWillUnmount: function () {
    document.removeEventListener('updateResults', this.refreshResultList);
  },

  // Handlers
  handleSearchChange: function (event) {
    var term = event.target.value;
    window.dataManager.searchMovies(
      term,
      () => {
        this.setState({
          searchTerm: term,
          matchingTitles: window.dataManager.getDataSet()
        });
      }
    );
  },
  openDetail: function (domEvent) {
    var event = new Event('openMovie');
    event.movieId = domEvent.target.getAttribute('id');
    document.dispatchEvent(event);
  },
  openNew: function (domEvent) {
    var event = new Event('createMovie');
    document.dispatchEvent(event);
  },
  refreshResultList: function () {
    window.dataManager.searchMovies(
      this.state.searchTerm,
      () => {
        this.setState({
          searchTerm: this.state.searchTerm,
          matchingTitles: window.dataManager.getDataSet()
        });
      }
    );
  },

  displayName: 'searchPanel',
  render: function () {
    return (

      <div className="col-xs-12 col-sm-4 search-panel">
        <div className="wrapper">

          <div className="col-xs-12">
            <input type="text" className="form-control" onChange={this.handleSearchChange} placeholder="Search" value={this.state.searchTerm} />
          </div>
          <br />
          <hr />

          <ul>
          {
            this.state.matchingTitles.map((item, i) =>
              <li
                  id={ item.id }
                  onClick={ this.openDetail }
                >{ item.title }</li>)
          }
          </ul>

          <hr />
          <button type="button" className="btn btn-primary" onClick={ this.openNew }>New</button>

        </div>
      </div>

    );
  }
});
