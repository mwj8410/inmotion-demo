import './detailPanel.scss';

const DetailCard = require('../detailCard/detailCard.jsx');

module.exports = React.createClass({
  // Internal Bindings
  getInitialState: function () {    
    return {};
  },

  // Handlers

  displayName: 'detailPanel',
  render: function () {
    return (
      <div className="col-xs-12 col-sm-8 detail-panel">
        <DetailCard />
      </div>

    );
  }
});
