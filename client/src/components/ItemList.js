import React from 'react';
import ItemConnected from './Item';
import { connect } from 'react-redux';
import loadingStatus from '../../src/actions/loadingActions';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    this.props.loadingStatus(false);
  }

  render () {
    if (this.props.allResults.length === 0) {
      return (
        <div className="dailySummaryList">
          <div className="header3">Daily Breakdown</div>
          <div>No Data</div>     
        </div>        
      );
    } else {
      return (
        <div className="dailySummaryList">
          <div className="header3">Daily Overview</div>
          <div>
            {this.props.allResults.map((dailyData, i) => {
              return (<ItemConnected dailyData={dailyData} key={i} />);
            })}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return ({ allResults: state.searchResults });
};

const mapDispatchToProps = dispatch => (
  { loadingStatus: (status) => dispatch(loadingStatus(status)) }
);

const ItemListConnected = connect(mapStateToProps, mapDispatchToProps)(ItemList);

export default ItemListConnected;
