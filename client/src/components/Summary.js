import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import setItemList from '../../src/actions/itemsActions';
import ItemList from './ItemList';

class Summary extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			minBuyout: 0,
			maxBuyout: 0,
			avgBuyout: 0,
			minBid: 0,
			maxBid: 0,
			avgBid: 0,
			minAuctionSize: 0,
			maxAuctionSize: 0,
			avgAuctionSize: 0,
			totalSupply: 0,
			bestBuy: {},
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		let minBuyout = 0;
		let maxBuyout = 0;
		let avgBuyout = 0;
		let minBid = 0;
		let maxBid = 0;
		let avgBid = 0;
		let minAuctionSize = 0;
		let maxAuctionSize = 0;
		let avgAuctionSize = 0;
		let totalSupply = 0;
		let bestBuy = {};
		nextProps.items.forEach((item, i) => {
			if (item.buyout > maxBuyout) {
				maxBuyout = item.buyout;
			}
			if (item.buyout < minBuyout || minBuyout === 0) {
				minBuyout = item.buyout
			}
			if (item.bid > maxBid) {
				maxBid = item.bid;
			}
			if (item.bid < minBid || minBid === 0) {
				minBid = item.bid;
			}
		  if (item.quantity > maxAuctionSize) {
		  	maxAuctionSize = item.quantity;
			}
			if (item.quantity < minAuctionSize || minAuctionSize === 0) {
				minAuctionSize = item.quantity;
			}
			if (bestBuy.buyout === undefined || (bestBuy.buyout/bestBuy.quantity) > (item.buyout/item.quantity)) {
				bestBuy = item;
				bestBuy.i = i;
			}
			avgBuyout += item.buyout;
			avgBid += item.bid;
			totalSupply += item.quantity;
		});
		avgBuyout = avgBuyout / (totalSupply || 1);
		avgBid = avgBid / (totalSupply || 1);
    avgAuctionSize = totalSupply / (nextProps.items.length || 1);
		this.setState({
			minBuyout: (minBuyout / 10000),
			maxBuyout: (maxBuyout / 10000),
			avgBuyout: (avgBuyout / 10000),
			minBid: (minBid / 10000),
			maxBid: (maxBid / 10000),
			avgBid: (avgBid / 10000),
			minAuctionSize: minAuctionSize,
			maxAuctionSize: maxAuctionSize,
			avgAuctionSize: Math.floor(totalSupply / (nextProps.items.length || 1)),
			bestBuy: bestBuy.i,
			totalSupply: totalSupply,
		});
	}

	render() {
		return(
			<div>
			  <div>{`Min buyout price: ${this.state.minBuyout}`}</div>
			  <div>{`Max buyout price: ${this.state.maxBuyout}`}</div>
			  <div>{`Average buyout price: ${this.state.avgBuyout}`}</div>
			  <div>{`Min bid price: ${this.state.minBid}`}</div>
			  <div>{`Max bid price: ${this.state.maxBid}`}</div>
			  <div>{`Average bid price: ${this.state.avgBid}`}</div>
			  <div>{`Min auction size: ${this.state.minAuctionSize}`}</div>
			  <div>{`Max auction size: ${this.state.maxAuctionSize}`}</div>
			  <div>{`Average auction size: ${this.state.avgAuctionSize}`}</div>
			  <div>{`Best buy: ${this.state.bestBuy}`}</div>
			  <div>{`Total supply: ${this.state.totalSupply}`}</div>
			  <div>{`Number of auctions: ${this.props.items.length}`}</div>
		  </div>
		);
	}
}

const mapStateToProps = (state) => {
  return ( {items: state.items} );
};

const SummaryConnected = connect(mapStateToProps)(Summary);

export default SummaryConnected;
