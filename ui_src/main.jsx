import './main.style.scss';

// Components
const DetailPanel = require('./components/detailPanel/detailPanel.jsx');
const SearchPanel = require('./components/searchPanel/searchPanel.jsx');

require('./services/dataManager');

window.onload = () => {
  window.dataManager.searchMovies('', () => {
    ReactDOM.render(
      <div className="container-fluid">
        <div className="row main-content">
          <SearchPanel />
          <DetailPanel />
        </div>
      </div>,
      document.querySelector('#application-viewport')
    );
  });
};
