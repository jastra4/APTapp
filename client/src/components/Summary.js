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
			avgBuyout: 0,
			avgBid: 0,
			total: 0,
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		let avgBuyout = 0;
		let avgBid = 0;
		let total = 0;
		nextProps.items.forEach((item) => {
			avgBuyout += item.buyout;
			avgBid += item.bid;
			total += item.quantity;
		});
		avgBuyout = Math.floor(avgBuyout / (nextProps.items.length || 1) / 10000);
		avgBid = Math.floor(avgBid / (nextProps.items.length || 1) / 10000);
		this.setState({
			avgBuyout,
			avgBid,
			total,
		});
	}

	render() {
		return(
			<div>
			  <div>{`Number of auctions: ${this.props.items.length}`}</div>
			  <div>{`Number of items available: ${this.state.total}`}</div>
			  <div>{`Average buyout price (in gold): ${this.state.avgBuyout}`}</div>
			  <div>{`Average bid price (in gold): ${this.state.avgBid}`}</div>
		  </div>
		);
	}
}

const mapStateToProps = (state) => {
  return ( {items: state.items} );
};

const SummaryConnected = connect(mapStateToProps)(Summary);

export default SummaryConnected;
