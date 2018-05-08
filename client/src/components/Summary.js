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
			buy: { price: 0, time: null },
			sell: { price: 0, time: null },
		};
	}

	componentWillReceiveProps(nextProps) {
		let buy = { price: 0, time: null };
		let sell = { price: 0, time: null };
		let priceData = [];
		nextProps.dumps.forEach((dump) => {
			priceData.push(dump.avgBuyout);
			if (buy.price === 0 || dump.minBuyout < buy.price) {
				buy.price = dump.minBuyout;
				buy.time = dump.name;
			}
			if (sell.price === 0 || dump.minBuyout > sell.price) {
				sell.price = dump.minBuyout;
				sell.time = dump.name;
			}
		});

		var svgWidth = 500, svgHeight = 300, barPadding = 5;
		var barWidth = (svgWidth / priceData.length);

		var svg = d3.select('svg')
			.attr("width", svgWidth)
			.attr("height", svgHeight);

		var barChart = svg.selectAll("rect")
			.data(priceData)
			.enter()
			.append("rect")
			.attr("y", function (d) {
				return svgHeight - (d * 10)
			})
			.attr("height", function (d) {
				return d * 10;
			})
			.attr("width", barWidth - barPadding)
			.attr("transform", function (d, i) {
				var translate = [barWidth * i, 0];
				return "translate(" + translate + ")";
			});

		this.setState({
			buy: buy,
			sell: sell,
		});
	}

	render() {
		return(
			<div className="summary">
				<div>{`Lowest price was ${this.state.buy.price} gold on ${JSON.parse(this.state.buy.time)}`}</div>
				<div>{`Highest price was price: ${this.state.sell.price} gold on ${JSON.parse(this.state.sell.time)}`}</div>
			  <div>{`Number of data points: ${this.props.items.length}`}</div>
		  </div>
		);
	}
}

const mapStateToProps = (state) => {
  return ( { items: state.items, dumps: state.dumps } );
};

const SummaryConnected = connect(mapStateToProps)(Summary);

export default SummaryConnected;
