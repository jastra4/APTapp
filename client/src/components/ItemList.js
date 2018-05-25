import React from 'react';
import ItemConnected from './Item';
import { connect } from 'react-redux';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    if (this.props.allResults.length === 0) {
      return (
        <div className="dailySummaryList">
          <div className="header3">Daily Overview</div>
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

const ItemListConnected = connect(mapStateToProps)(ItemList);

export default ItemListConnected;
