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

  componentWillReceiveProps(nextProps) {
   console.log('componentWillReceiveProps ', nextProps);
   let minBuyout = 0;
   let maxBuyout = 0;
   let avgBuyout = 0;
   let avgAuctionSize = 0;
   let totalSupply = 0;
   nextProps.dump.results.forEach((item, i) => {
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
   avgAuctionSize = totalSupply / (nextProps.dump.results.length || 1);
   this.setState({
     minBuyout: Math.floor((minBuyout / 10000)),
     maxBuyout: Math.floor((maxBuyout / 10000)),
     avgBuyout: Math.floor((avgBuyout / 10000)),
     avgAuctionSize: Math.floor(totalSupply / (nextProps.dump.results.length || 1)),
     totalSupply: totalSupply,
   });    
  }

  componentDidMount() {
   console.log('componentDidMount ', this.props.dump.results);
   let minBuyout = 0;
   let maxBuyout = 0;
   let avgBuyout = 0;
   let avgAuctionSize = 0;
   let totalSupply = 0;
   this.props.dump.results.forEach((item, i) => {
     if ((item.buyout/item.quantity) > maxBuyout) {
       maxBuyout = (item.buyout/item.quantity);
     }
     if ((item.buyout/item.quantity) < minBuyout || minBuyout === 0) {
       minBuyout = (item.buyout/item.quantity);
     }
     avgBuyout += item.buyout;
     totalSupply += item.quantity;
   });
   avgBuyout = avgBuyout / (totalSupply || 1);
   avgAuctionSize = totalSupply / (this.props.dump.length || 1);
   this.setState({
     minBuyout: Math.floor((minBuyout / 10000)),
     maxBuyout: Math.floor((maxBuyout / 10000)),
     avgBuyout: Math.floor((avgBuyout / 10000)),
     avgAuctionSize: Math.floor(totalSupply / (this.props.dump.length || 1)),
     totalSupply: totalSupply,
   });
  }

  render () {
    console.log(this.props);
		return (
      <h5>
        <div>{this.props.stamp}</div>
        <div>{`Minimum unit price: ${this.state.minBuyout}`}</div>
        <div>{`Maximum unit price: ${this.state.maxBuyout}`}</div>
        <div>{`Average unit price: ${this.state.avgBuyout}`}</div>
        <div>{`Auctions: ${this.props.dump.length}`}</div>
        <div>{`Total supply: ${this.state.totalSupply}`}</div>
      </h5>
		);
  }
}

export default Item;
