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
			min: 0,
		};
	}

	componentWillReceiveProps(nextProps) {
		let avgBuyout = 0;
		let totalCount = 0;
		nextProps.items.forEach((dump) => {
			dump.results.forEach((item) => {
				avgBuyout += item.buyout;
				totalCount += item.quantity;
			});
		});

		let min = {minBuyout: 0, name: undefined};
		nextProps.dumps.forEach((dump) => {
			if (min.minBuyout === 0 || dump.minBuyout < min.minBuyout) {
				min = dump;
			}
		});

		this.setState({ min: min.name });

		avgBuyout = avgBuyout / (totalCount || 1);
		this.setState({
			avgBuyout: Math.floor((avgBuyout / 10000)),
		});
	}

	render() {
		return(
			<div>
				<div>{`Best buy ${this.state.min}`}</div>
				<div>{`Average unit price ${this.state.avgBuyout}`}</div>
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
