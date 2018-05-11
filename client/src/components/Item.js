import React from 'react';
import { connect } from 'react-redux';
import setDumpTotals from '../../src/actions/dumpActions';

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
   }, () => {
     this.props.loadDumpTotals({
      minBuyout: this.state.minBuyout,
      maxBuyout: this.state.maxBuyout,
      avgBuyout: this.state.avgBuyout,
      auctions: this.props.dump.results.length,
      totalSupply: this.state.totalSupply,
      name: this.props.stamp,
     });
   });
  }

  render () {
		return (
      <div>
        <div class="dailyHeader">{`${this.props.stamp.date}`}</div>
        <div>{`Min price: ${this.state.minBuyout}`}</div>
        <div>{`Max price: ${this.state.maxBuyout}`}</div>
        <div>{`Average price: ${this.state.avgBuyout}`}</div>
        <div>{`Auctions: ${this.props.dump.results.length}`}</div>
        <div>{`Supply: ${this.state.totalSupply}`}</div>
      </div>
		);
  }
}

const mapDispatchToProps = dispatch => (
  { loadDumpTotals: dumpTotals => dispatch(setDumpTotals(dumpTotals)) }
);

const ItemConnected = connect(null, mapDispatchToProps)(Item);

export default ItemConnected;
