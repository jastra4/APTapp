import React from 'react';
import { connect } from 'react-redux';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.createGraph();
  }

  componentWillReceiveProps(nextProps) {
    let dumpDates = [];
    let priceData = [];

    nextProps.dumps.forEach((dump, i, arr) => {
      priceData.unshift(dump.avgBuyout);
      dumpDates.push(dump.name);
    });

    if (dumpDates.length > 0 && priceData.length > 0) {
      this.updateGraph(dumpDates, priceData);
    }
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

    // define y axis scale
    var yAxisScale = d3.scaleLinear()
      .domain([0, d3.max(priceData)])
      .range([svgHeight, 0]);

    // create y axis
    var y_axis = d3.axisLeft()
      .scale(yAxisScale);

    // modify y axis
    d3.select('#y_axis')
      .call(y_axis);

    // ================== //
    // ***** X-AXIS ***** //
    // ================== //
    var parseTime = d3.timeParse("%d-%b-%y");
    dataDump.forEach(function (d) {
      d.date = parseTime(d.date);
    });

    // define x axis scale
    let xAxisScale = d3
      .scaleTime()
      .range([0, (svgWidth - barWidth)])
      .domain(d3.extent(dataDump, function (d) { 
        return d.date; 
      }));

    // create x axis
    let xAxis = d3
      .axisBottom()
      .scale(xAxisScale)
      .tickValues(dataDump.map(function (d) { return d.date }))
      //.tickFormat(d3.timeFormat("%d-%b-%y"));

    // modify x axis
    d3.select('#x_axis')
      .call(xAxis);

    // ================== //
    // ***** AVG-LINE ***** //
    // ================== //

    var total = 0;
    priceData.forEach((price) => {
      total += price;
    })
    var average = total/priceData.length;

    var lineData = [];
    dataDump.forEach((d, i) => {
      lineData.push({ price: average, d: d.date }) // priceData[i]
    });

    // set the ranges
    var x = d3.scaleTime()
      .range([0, svgWidth])
      .domain(d3.extent(dataDump, function (d) {
        return d.date; 
      }));

    var y = d3.scaleLinear()
      .range([svgHeight, 0])
      .domain([0, d3.max(priceData, function (d) { 
        return d; 
      })]);

    // define the line
    var valueline = d3.line()
      .x(function (d) { 
        return x(d.d);
      })
      .y(function (d) { 
        return y(d.price); 
      });

    // Add the valueline path.
    var test = svg.selectAll("path")
      .data([lineData]);

    test.exit().remove();
    //test.enter().append("path").merge(test).attr("d", valueline);
    svg.append("path") 
      // using .select instead of .append
      // this deals with average lines from past searches
      // but on the first search the y axis dissapears
      // also the line is still behind the bars
      .data([lineData])
      .attr("class", "line")
      .attr("d", valueline);

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

    barChart.exit().remove();
    barChart.enter().append("rect").merge(barChart)
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

  createGraph(dataDump = [], priceData = []) {
    var parseTime = d3.timeParse("%d-%b-%y");
    dataDump.forEach(function (d) {
      d.date = parseTime(d.date);
      // d.close = +d.close; // not parsing hours and minutes
    });

    // define svg element boundaries
    var svgWidth = 500;
    //var svgWidth = (window.innerWidth/3.5);
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
      .attr("id", "x_axis")
      .call(x_axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // create bars
    // var barChart = svg.selectAll("rect")
    //   .data(priceData)
    //   .enter()
    //   .append("rect")
    //   .attr("y", function (d) {
    //     return svgHeight - yBarScale(d);
    //   })
    //   .attr("height", function (d) {
    //     return yBarScale(d);
    //   })
    //   .attr("width", barWidth - barPadding)
    //   .attr("transform", function (d, i) {
    //     var translate = [barWidth * i, 0];
    //     return "translate(" + translate + ")";
    //   });

    // add x axis label
    svg.append("text")
      .attr("x", svgWidth / 2)
      .attr("y", svgHeight + 75)
      .style("text-anchor", "middle")
      .text("Date (updated daily at 11:00 UTC)");

    // add y axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("x", 0 - (svgHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Price (in wow gold)");

    // add title
    svg.append("text")
      .attr("x", svgWidth / 2)
      .attr("y", -20)
      .style("text-anchor", "middle")
      .text("Historical Daily Price Averages");

    // create average line - see create bars
    svg.append("path")
      .data([])
      .attr("class", "line")
      //.attr("d", 0);
  }

  render() {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({ dumps: state.dumps });
};

const GraphConnected = connect(mapStateToProps)(Graph);

export default GraphConnected;


{/* <path class="line" d="M500,85
                      
L200,80                    
L100,80
L250,80                     
L100,80
L83,80                        
L0,80"></path> */}