import React from 'react';
import Item from './Item';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    console.log('ItemList props ', this.props);
		return (
		  <div>
		  	{this.props.items.map((item, i) => (
          <Item item={item} key={i} />
        ))}
		  </div>
		);
  }
}

export default ItemList;
