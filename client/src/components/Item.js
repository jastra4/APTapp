import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
		return (
		  <h4>
		  	<div>{`Owner: ${this.props.item.owner}`}</div>
        <div>{`Realm: ${this.props.item.ownerRealm}`}</div>
        <div>{`Bid: ${this.props.item.bid}`}</div>
        <div>{`Buyout: ${this.props.item.buyout}`}</div>
        <div>{`Quantity: ${this.props.item.quantity}`}</div>
        <div>{`Time left: ${this.props.item.timeLeft}`}</div>
		  </h4>
		);
  }
}

export default Item;
