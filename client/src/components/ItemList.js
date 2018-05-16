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
    if (this.props.items.length === 0) {
      return (
        <div>
          <div className="dailyListHeader">Daily Breakdown</div>
          <div>No Data</div>     
        </div>        
      );
    } else {
      let results = Object.values(this.props.items);
      results = results.slice(0, results.length);
      let obj = {results: results};
      return (
        <div className="itemList"> 
          <div className="dailyListHeader">Daily Breakdown</div>
          <div>
            {results.map((dump, i) => {
              return (<ItemConnected dump={dump} key={i} stamp={this.props.items[i].stamp}/>);
            })}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return ( {items: state.items} );
};

const mapDispatchToProps = dispatch => (
  {
    loadingStatus: (status) => dispatch(loadingStatus(status)),
  }
);

const ItemListConnected = connect(mapStateToProps, mapDispatchToProps)(ItemList);

export default ItemListConnected;
