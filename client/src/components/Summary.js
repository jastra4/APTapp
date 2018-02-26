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
			// avgBuyout: 0,
			buy: { price: 0, time: null },
			sell: { price: 0, time: null },
		};
	}

	componentWillReceiveProps(nextProps) {
		let buy = { price: 0, time: null };
		let sell = { price: 0, time: null };
		nextProps.dumps.forEach((dump) => {
			if (buy.price === 0 || dump.minBuyout < buy.price) {
				buy.price = dump.minBuyout;
				buy.time = dump.name;
			}
			if (sell.price === 0 || dump.minBuyout > sell.price) {
				sell.price = dump.minBuyout;
				sell.time = dump.name;
			}
		});

		this.setState({
			buy: buy,
			sell: sell,
		});
	}

	render() {
		return(
			<div className="summary">
				<div>{`Best time to buy: ${this.state.buy.time}`}</div>
				<div>{`Buy price: ${this.state.buy.price} gold`}</div>
				<div>{`Best time to sell: ${this.state.sell.time}`}</div>
				<div>{`Sell price: ${this.state.sell.price} gold`}</div>
			  <div>{`Number of data dumps: ${this.props.items.length}`}</div>
		  </div>
		);
	}
}

const mapStateToProps = (state) => {
  return ( { items: state.items, dumps: state.dumps } );
};

const SummaryConnected = connect(mapStateToProps)(Summary);

export default SummaryConnected;
