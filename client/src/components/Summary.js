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
	    highPrice: 0,
      lowPrice: 0,
      average: 0,
      supply: 0,
    };
    
    this.createGraph = this.createGraph.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
	}

	componentWillReceiveProps(nextProps) {
    let highPrice = 0;
    let lowPrice = 0;
    let priceData = [];
    let totalAvg = 0;
    let totalSupply = 0;
    let num = 0;
    let dumpDates = [];

    console.log('nextProps.dumps ', nextProps.dumps)
		nextProps.dumps.forEach((dump) => {
      let x = dump.name;
      priceData.push(dump.avgBuyout);
      if (lowPrice === 0 || dump.avgBuyout < lowPrice) {
        lowPrice = dump.avgBuyout;
				// high.time = dump.name;
			}
      if (highPrice === 0 || dump.avgBuyout > highPrice) {
        highPrice = dump.avgBuyout;
				// low.time = dump.name;
      }

      totalSupply += dump.totalSupply;
      totalAvg += dump.avgBuyout;
      num++;
      dumpDates.push(dump.name);
		});

    this.setState({
      highPrice: highPrice,
      lowPrice: lowPrice,
      average: Math.round(totalAvg / num),
      supply: Math.round(totalSupply / num),
    });
    console.log('priceData ', priceData)

    // this.createGraph(dumpDates, priceData);
    this.updateGraph(dumpDates, priceData);
	}

  componentDidMount() {
    this.createGraph();
  }

  updateGraph(dataDump, priceData) {
    var svgWidth = 500;
    var svgHeight = 300;
    var barPadding = 5;
    var barWidth = (svgWidth / priceData.length);
    var svg = d3.select('svg')

    // ================== //
    // ***** Y-AXIS ***** //
    // ================== //

    // define scale for y axis
    var yAxisScale = d3.scaleLinear()
      .domain([0, d3.max(priceData)])
      .range([svgHeight, 0]);

    // create y axis
    var y_axis = d3.axisLeft()
      .scale(yAxisScale);

    // add y axis to svg element
    d3.select('#y_axis')
      .call(y_axis);

    // ================== //
    // ***** X-AXIS ***** //
    // ================== //

    var parseTime = d3.timeParse("%d-%b-%y");
    dataDump.forEach(function (d) {
      d.date = parseTime(d.date);
      // d.close = +d.close; // not parsing hours and minutes
    });

    // define x axis
    var xScale = d3.scaleTime()
      .domain(d3.extent(dataDump, function (d) { return d.date; }))
      .range([0, svgWidth]);

    // create x axis
    var x_axis = d3.axisBottom(xScale)
      .ticks(dataDump.length-1)
      .tickFormat(d3.timeFormat("%d-%b-%y"))

    // add x axis to svg element
    svg.append("g")
      .attr("transform", "translate(0, " + (svgHeight) + ")")
      .attr("id", "#x_axis")
      .call(x_axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // ================ //
    // ***** BARS ***** //
    // ================ //
      
    // define scale for bars
    var yBarScale = d3.scaleLinear()
      .domain([0, d3.max(priceData)])
      .range([0, svgHeight]);

    // create bars
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

  }

  createGraph(dataDump=[], priceData=[]) {
    var parseTime = d3.timeParse("%d-%b-%y");
    dataDump.forEach(function (d) {
      d.date = parseTime(d.date);
      // d.close = +d.close; // not parsing hours and minutes
    });

    // define svg element boundaries
    var svgWidth = 500;
    var svgHeight = 300;
    var barPadding = 5;
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
      .attr("transform", "translate(0, 0)")
      .attr("id", "y_axis")
      .call(y_axis);

    // define x axis
    var xScale = d3.scaleTime()
      .domain(d3.extent(dataDump, function (d) { return d.date; }))
      .range([0, svgWidth]);

    // create x axis
    var x_axis = d3.axisBottom(xScale)
      .ticks(dataDump.length)
      .tickFormat(d3.timeFormat("%d-%b-%y"))

    // add x axis to svg element
    svg.append("g")
      .attr("transform", "translate(0, " + (svgHeight) + ")")
      .attr("id", "#x_axis")
      .call(x_axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // create bars
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

    // add x axis label
    svg.append("text")
      .attr("x", svgWidth / 2)
      .attr("y", svgHeight + 75)
      .style("text-anchor", "middle")
      .text("Date");

    // add y axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("x", 0 - (svgHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Gold");

    // add title
    svg.append("text")
      .attr("x", svgWidth / 2)
      .attr("y", -10)
      .style("text-anchor", "middle")
      .text("Average Daily Price");
  }
  
	render() {
		return(
			<div>
        <div className="summaryHeader">{`Market Summary`}</div>
        <div>{`Lowest price was ${this.state.lowPrice}`}</div>
        <div>{`Highest price was ${this.state.highPrice}`}</div>
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
