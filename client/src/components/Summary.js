import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import setItemList from '../../src/actions/itemsActions';
import ItemList from './ItemList';

class Summary extends React.Component {
	constructor (props) {
		super(props);
		this.state = { avgBuyout: 0 };
	}

	// calcs() {
	componentWillReceiveProps(nextProps) {
		let avgBuyout = 0;
		let totalCount = 0;
		nextProps.dumps.forEach((dump) => {
			dump.forEach((item) => {
				avgBuyout += item.buyout;
				totalCount ++;
			});
		});
		avgBuyout = avgBuyout / (totalCount || 1);
		this.setState({ avgBuyout: Math.floor((avgBuyout / 10000)) });
	}

	render() {
		console.log('Summary ', this.props);
		return(
			<div>
				<div>{`Average price (in gold) ${this.state.avgBuyout}`}</div>
			  <div>{`Number of data dumps: ${this.props.dumps.length}`}</div>
		  </div>
		);
	}
}

const mapStateToProps = (state) => {
  return ( {dumps: state.items} );
};

const SummaryConnected = connect(mapStateToProps)(Summary);

export default SummaryConnected;
