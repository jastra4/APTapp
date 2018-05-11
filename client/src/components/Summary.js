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
      average: 0,
      supply: 0,
		};
	}

	componentWillReceiveProps(nextProps) {
		let high = { price: 0, time: null };
		let low = { price: 0, time: null };
    let priceData = [];
    let totalAvg = 0;
    let totalSupply = 0;
    let num = 0;
    let dumpDates = [];

		nextProps.dumps.forEach((dump) => {
      console.log(dump);
      let x = dump.name;
      priceData.push(dump.avgBuyout);
      if (high.price === 0 || dump.avgBuyout < high.price) {
        high.price = dump.avgBuyout;
				high.time = dump.name;
			}
      if (low.price === 0 || dump.avgBuyout > low.price) {
        low.price = dump.avgBuyout;
				low.time = dump.name;
      }

      totalSupply += dump.totalSupply;
      totalAvg += dump.avgBuyout;
      num++;
      dumpDates.push(dump.name);
		});

    // GRAPH BEGIN //

    // parse the date / time
    // let fakeData = [{ date: "10-May-12", close: "58.13" }, { date:"11-May-12", close: "53.98"}];
    
    var parseTime = d3.timeParse("%d-%b-%y");
    dumpDates.forEach(function (d) {
      d.date = parseTime(d.date);
      // d.close = +d.close;
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
      .domain(d3.extent(dumpDates, function (d) { return d.date; }))
      .range([0, svgWidth]);

    // create x axis
    var x_axis = d3.axisBottom(xScale)
      .ticks(dumpDates.length)
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
      
    // GRAPH END //

		this.setState({
			high: high,
      low: low,
      average: Math.round(totalAvg / num),
      supply: Math.round(totalSupply / num),
		});
	}



componentDidMount() {
  let fakeData = [];

  var parseTime = d3.timeParse("%d-%b-%y");
  fakeData.forEach(function (d) {
    d.date = parseTime(d.date);
    d.close = +d.close;
  });

  // define svg element boundaries
  let svgWidth = 500;
  let svgHeight = 300;
  let barPadding = 5;
  let barWidth = (svgWidth / 0);

  // create svg element
  var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // define scale for bars
  var yBarScale = d3.scaleLinear()
    .domain([0, 0])
    .range([0, svgHeight]);

  // define scale for y axis
  var yAxisScale = d3.scaleLinear()
    .domain([0, 0])
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
    .ticks(fakeData.length - 1)
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

  // add x axis label
  svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight + 75)
    .style("text-anchor", "middle")
    .text("Date");

  svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", -10)
    .style("text-anchor", "middle")
    .text("Average Daily Price");

  // add y axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -45)
    .attr("x", 0 - (svgHeight / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Gold");
}
  
	render() {
		return(
			<div>
        <div class="summaryHeader">{`Market Summary`}</div>
				<div>{`Lowest price was ${this.state.high.price}`}</div>
				<div>{`Highest price was ${this.state.low.price}`}</div>
        <div>{`Running ${this.props.items.length} day average is ${this.state.average}`}</div>
        <div>{`Average daily supply of this item is ${this.state.supply}`}</div>
		  </div>
		);
	}
}

const mapStateToProps = (state) => {
  return ( { items: state.items, dumps: state.dumps } );
};

const SummaryConnected = connect(mapStateToProps)(Summary);

export default SummaryConnected;
