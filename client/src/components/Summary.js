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
	    high: { price: 0, time: null },
      low: { price: 0, time: null },
      runningAverage: {price: 0}
		};
	}

	componentWillReceiveProps(nextProps) {
		let high = { price: 0, time: null };
		let low = { price: 0, time: null };
    let priceData = [];
    let dateData = [];
    let total = 0;
    let num = 0;
    let runningAverage = 0;

		nextProps.dumps.forEach((dump) => {
      let x = dump.name;
      dateData.push(x);
      priceData.push(dump.avgBuyout);
			if (high.price === 0 || dump.minBuyout < high.price) {
				high.price = dump.minBuyout;
				high.time = dump.name;
			}
			if (low.price === 0 || dump.minBuyout > low.price) {
				low.price = dump.minBuyout;
				low.time = dump.name;
      }
      total += total + dump.avgBuyout;
      num++;
		});
    // console.log('dateData: ', dateData);

    // GRAPH BEGIN //

    // parse the date / time
    let fakeData = [{ date: "10-May-12", close: "58.13" }, { date:"11-May-12", close: "53.98"}];
    
    var parseTime = d3.timeParse("%d-%b-%y");
    fakeData.forEach(function (d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
    });

    // define svg element boundaries
    let svgWidth = 500; 
    let svgHeight = 300;
    let barPadding = 5;
		let barWidth = (svgWidth / priceData.length);

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
    var xScale = d3.scaleTime()
      .domain(d3.extent(fakeData, function (d) { return d.date; }))
      .range([0, svgWidth]);

    // create x axis
    var x_axis = d3.axisBottom(xScale)
      .ticks(fakeData.length-1)
      .tickFormat(d3.timeFormat("%d-%b-%y"))

    // add x axis to svg element
		svg.append("g")
      .attr("transform", "translate(0, " + (svgHeight) + ")")
      .call(x_axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");
      
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
			.attr("y", svgHeight + 75)
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
			high: high,
      low: low,
      runningAverage: runningAverage,
		});
	}

	render() {
		return(
			<div className="summary">
				<div>{`Lowest price was ${this.state.high.price}`}</div>
				<div>{`Highest price was ${this.state.low.price}`}</div>
        <div>{`Running 15 day average is ${this.state.runningAverage.price}`}</div>
        <div>{'On an average day there is x amount of this item for sale.'}</div>
		  </div>
		);
	}
}

const mapStateToProps = (state) => {
  return ( { items: state.items, dumps: state.dumps } );
};

const SummaryConnected = connect(mapStateToProps)(Summary);

export default SummaryConnected;
