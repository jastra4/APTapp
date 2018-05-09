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

		var xScale = d3.scaleLinear()
			.domain([0, priceData.length]) // d3.max(priceData)
			.range([0, svgWidth]);

		var yScale = d3.scaleLinear()
			.domain([0, d3.max(priceData)])
			.range([0, svgHeight]); // orig

		var yScale2 = d3.scaleLinear()
			.domain([0, d3.max(priceData)])
			.range([svgHeight, 0]); // switched args

		var x_axis = d3.axisBottom()
			//.tickValues(15)		
			.scale(xScale).ticks(15);

		var y_axis = d3.axisLeft()
			.scale(yScale2);

		svg.append("g")
			.attr("transform", "translate(0, 5)") // from 40, 10
			.call(y_axis);

		var xAxisTranslate = svgHeight; // from svgHeight - 20

		svg.append("g")
			.attr("transform", "translate(0, " + (xAxisTranslate) + ")") // from 50, xAxisTranslate
			.call(x_axis);
			
		var barChart = svg.selectAll("rect")
			.data(priceData)
			.enter()
			.append("rect")
			.attr("y", function (d) {
				return svgHeight - yScale(d);
			})
			.attr("height", function (d) {
				return yScale(d);
			})
			.attr("width", barWidth - barPadding)
			.attr("transform", function (d, i) {
				var translate = [barWidth * i, 0];
				return "translate(" + translate + ")";
			});

		var text = svg.selectAll("text")
			.data(priceData)
			.enter()
			.append("text")
			.text(function (d) {
				return d;
			})
			.attr("y", function (d, i) {
				return svgHeight - yScale(d) - 2;
			})
			.attr("x", function (d, i) {
				return barWidth * i;
			})
			.attr("fill", "#A64C38");

		svg.append("text")      // text label for the x axis
			.attr("x", svgWidth/2)
			.attr("y", svgHeight + 35)
			.style("text-anchor", "middle")
			.text("Blizzad Data Updates (hourly)");

		svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", -40)
			.attr("x", 0 - (svgHeight / 2))
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text("Gold");

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
