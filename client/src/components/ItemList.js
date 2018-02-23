import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
		return (
      <div>
  		  <div>
  		  	{this.props.items.map((itemList, i) => (
            <Item itemList={itemList} key={i} />
          ))}
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
