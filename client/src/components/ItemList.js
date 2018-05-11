import React from 'react';
import ItemConnected from './Item';
import { connect } from 'react-redux';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    let results = Object.values(this.props.items);
    results = results.slice(0, results.length);
    let obj = {results: results};
		return (
      <div> 
        <div class="dailyListHeader">Daily Breakdown</div>
        <div>
          {results.map((dump, i) => {
            return (<ItemConnected dump={dump} key={i} stamp={this.props.items[i].stamp}/>);
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ( {items: state.items} );
};

const ItemListConnected = connect(mapStateToProps)(ItemList);

export default ItemListConnected;
