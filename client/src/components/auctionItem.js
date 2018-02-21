import React from 'react';

class AuctionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
  	console.log(this.props.item);
		return (
		  <div>
		  	<h1>{this.props.item.item}</h1>
		  </div>
		);
  }
}

export default AuctionItem;
