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
    let dateData = [];

		nextProps.dumps.forEach((dump) => {
      let x = dump.name;
      dateData.push(x);
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
    console.log('dateData: ', dateData);

    // GRAPH BEGIN //

    // define svg element boundaries
		var svgWidth = 500, svgHeight = 300, barPadding = 5;
		var barWidth = (svgWidth / priceData.length);

    // create svg element
		var svg = d3.select('svg')
			.attr("width", svgWidth)
			.attr("height", svgHeight);

    // define scale for bars
		var yBarScale = d3.scaleLinear()
			.domain([0, d3.max(priceData)])
			.range([0, svgHeight]);

    // define scale for y axis
		var yAxisScale = d3.scaleLinear()
			.domain([0, d3.max(priceData)])
			.range([svgHeight, 0]);

    // create y axis
		var y_axis = d3.axisLeft()
      .scale(yAxisScale);
    
    // add y axis to svg element
		svg.append("g")
			.attr("transform", "translate(0, 5)")
			.call(y_axis);

    // define x axis
    var xScale = d3.scaleLinear()
      .domain([0, dateData.length])
      .range([0, svgWidth]);

    // create x axis
    var x_axis = d3.axisBottom()
      .scale(xScale).ticks(priceData.length - 1);    

    // add x axis to svg element
		svg.append("g")
      .attr("transform", "translate(0, " + (svgHeight) + ")")
			.call(x_axis);
      
    // bars
		var barChart = svg.selectAll("rect")
			.data(priceData)
			.enter()
			.append("rect")
			.attr("y", function (d) {
				return svgHeight - yBarScale(d);
			})
			.attr("height", function (d) {
				return yBarScale(d);
			})
			.attr("width", barWidth - barPadding)
			.attr("transform", function (d, i) {
				var translate = [barWidth * i, 0];
				return "translate(" + translate + ")";
			});

    // bar labels
		var text = svg.selectAll("text")
			.data(priceData)
			.enter()
			.append("text")
			.text(function (d) {
				return d;
			})
			.attr("y", function (d, i) {
				return svgHeight - yBarScale(d) - 2;
			})
			.attr("x", function (d, i) {
				return barWidth * i;
			})
			.attr("fill", "#A64C38");

    // add x axis label
		svg.append("text")
			.attr("x", svgWidth/2)
			.attr("y", svgHeight + 35)
			.style("text-anchor", "middle")
			.text("Blizzad Data Updates");
    
    // add y axis label
		svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", -40)
			.attr("x", 0 - (svgHeight / 2))
			.attr("dy", "1em")
			.style("text-anchor", "middle")
      .text("Gold");
      
    // GRAPH END //

		this.setState({
			buy: buy,
			sell: sell,
		});
	}

	render() {
		return(
			<div className="summary">
				<div>{`Lowest price was ${this.state.buy.price} gold on ${this.state.buy.time}`}</div>
				<div>{`Highest price was price: ${this.state.sell.price} gold on ${this.state.sell.time}`}</div>
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
