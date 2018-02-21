import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    console.log('Item ', this.props);
		return (
		  <div>
		  	<p>Item</p>
		  </div>
		);
  }
}

export default Item;
