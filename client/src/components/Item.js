import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minBuyout: 0,
      maxBuyout: 0,
      avgBuyout: 0,
      avgAuctionSize: 0,
      totalSupply: 0,
    };
  }

  componentDidMount() {
   let minBuyout = 0;
   let maxBuyout = 0;
   let avgBuyout = 0;
   let avgAuctionSize = 0;
   let totalSupply = 0;
   this.props.itemList.forEach((item, i) => {
     if (item.buyout > maxBuyout) {
       maxBuyout = item.buyout;
     }
     if (item.buyout < minBuyout || minBuyout === 0) {
       minBuyout = item.buyout
     }
     avgBuyout += item.buyout;
     totalSupply += item.quantity;
   });
   avgBuyout = avgBuyout / (totalSupply || 1);
   avgAuctionSize = totalSupply / (this.props.itemList.length || 1);
   this.setState({
     minBuyout: Math.floor((minBuyout / 10000)),
     maxBuyout: Math.floor((maxBuyout / 10000)),
     avgBuyout: Math.floor((avgBuyout / 10000)),
     avgAuctionSize: Math.floor(totalSupply / (this.props.itemList.length || 1)),
     totalSupply: totalSupply,
   });
  }

  render () {
		return (
      <h5>
        <div>{`minBuyout: ${this.state.minBuyout}`}</div>
        <div>{`maxBuyout: ${this.state.maxBuyout}`}</div>
        <div>{`avgBuyout: ${this.state.avgBuyout}`}</div>
        <div>{`avgAuctionSize: ${this.state.avgAuctionSize}`}</div>
        <div>{`totalSupply: ${this.state.totalSupply}`}</div>
      </h5>
		);
  }
}

export default Item;
