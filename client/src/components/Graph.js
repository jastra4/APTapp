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

    nextProps.dailySummaries.forEach((dump, i, arr) => {
      priceData.unshift(dump.avgBuyout);
      dumpDates.push(dump.name);
    });

    if (dumpDates.length > 0 && priceData.length > 0) {
      let reversedDates = dumpDates.reverse();
      this.updateGraph(dumpDates, priceData, reversedDates);
    }
  }

  updateGraph(dataDump, priceData, reversedDates) {
    // set svg element dimensions
    var chartDiv = document.getElementById("myGraph");
    var svgWidth = (chartDiv.clientWidth);
    var svgHeight = chartDiv.clientHeight;
    var barPadding = svgWidth * 0.01;
    var barWidth = ((svgWidth * 0.9)/ priceData.length);
    var svg = d3.select('svg')

    // ================== //
    // ***** Y-AXIS ***** //
    // ================== //

    // define y axis scale
    var yAxisScale = d3.scaleLinear()
      .domain([0, d3.max(priceData)])
      .range([svgHeight * 0.7, 0]);

    // create y axis
    var y_axis = d3.axisLeft()
      .scale(yAxisScale);

    // modify y axis
    d3.select('#y_axis')
      .call(y_axis);

    // // ================ //
    // // ***** BARS ***** //
    // // ================ //

    // set scale for bars
    var yBarScale = d3.scaleLinear()
      .domain([0, d3.max(priceData)])
      .range([0, svgHeight * 0.7]);

    // create bars
    var barChart = svg.selectAll("rect")
      .data(priceData)
    
    barChart.exit().remove();

    var barX = 0;
    barChart.enter().append("rect").merge(barChart)
      .attr("y", function (d) {
        return svgHeight - yBarScale(d);
      })
      .attr("height", function (d) {
        return yBarScale(d);
      })
      .attr("class", "bar")
      .attr("width", barWidth - barPadding-5)
      .attr("transform", function (d, i) {

        let xAxisWidth = (svgWidth - barWidth) * 0.885;
        let parseTime = d3.timeParse("%d-%b-%y");
        let lastDate = parseTime(reversedDates[0].date);
        let firstDate = parseTime(reversedDates[reversedDates.length - 1].date);
        let dateSpread = lastDate.getTime() - firstDate.getTime();
        
        let x = 0;

        if (i !== 0) {
          let date1 = parseTime(reversedDates[i - 1].date);
          let date2 = parseTime(reversedDates[i].date);;
          let diff = date1.getTime() - date2.getTime();
          let spread = diff / dateSpread * xAxisWidth;
          barX += spread;
        }
        var translate = [barX + (svgWidth * 0.1) + 1, -svgHeight * 0.2];
        return "translate(" + translate + ")";
      });

    // ================== //
    // ***** X-AXIS ***** //
    // ================== //

    var parseTime = d3.timeParse("%d-%b-%y");
    dataDump.forEach(function (d) {
      d.date = parseTime(d.date);
    });

    // define x axis scale
    let xAxisScale = d3.scaleTime()
      .domain(d3.extent(dataDump, function (d) { return d.date; }))
      .range([0, (svgWidth - barWidth) * 0.885]);

    // create x axis
    let xAxis = d3
      .axisBottom()
      .scale(xAxisScale)
      .tickValues(dataDump.map(function (d) { return d.date }))
      .tickFormat(d3.timeFormat("%b-%d"));

    // ================== //
    // ****** LINE ****** //
    // ================== //

    // find average price
    var total = 0;
    priceData.forEach((price) => {
      total += price;
    })
    var average = total / priceData.length;
    var lineData = [];
    dataDump.forEach((d, i) => {
      lineData.push({ price: average, d: d.date });
    });

    // set x and y ranges
    var x = d3.scaleTime()
      .range([0, svgWidth * 0.88])
      .domain(d3.extent(dataDump, function (d) {
        return d.date;
      }));

    var y = d3.scaleLinear()
      .range([svgHeight * 0.7, 0])
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

    // remove the old line
    var oldLine = svg.selectAll("path")
      .data([lineData]);
    oldLine.exit().remove();

    // add the new line
    svg.append("path")
      .data([lineData])
      .attr("class", "line")
      .attr("id", "valueLine")
      .attr("d", valueline)
      .attr("transform", "translate(" + (svgWidth * 0.1) + ", " + 40 + ")");

    // modify x axis
    d3.select('#x_axis')
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", ".8em")
      .attr("dy", "2em")
      .attr("transform", "rotate(-65)");
  }

  createGraph(dataDump = [], priceData = []) {
    var parseTime = d3.timeParse("%d-%b-%y");
    dataDump.forEach(function (d) {
      d.date = parseTime(d.date);
    });
    
    // set svg element dimensions
    var chartDiv = document.getElementById("myGraph");
    var svgWidth = (chartDiv.clientWidth);
    var svgHeight = chartDiv.clientHeight;
    
    // apply svg element dimensions
    var svg = d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // set scale for y axis
    var yAxisScale = d3.scaleLinear()
      .domain([0, d3.max(priceData)])
      .range([svgHeight * 0.7, 0]);

    // define y axis
    var y_axis = d3.axisLeft()
      .scale(yAxisScale);

    // add y axis to svg element
    svg.append("g")
      .attr("transform", "translate(" + svgWidth * 0.1 + ", " + svgHeight * 0.1 +")")
      .attr("id", "y_axis")
      .call(y_axis);

    // set scale for x axis
    var xScale = d3.scaleTime()
      .domain(d3.extent(dataDump, function (d) { return d.date; }))
      .range([0, svgWidth * 0.8]);

    // define x axis
    var x_axis = d3.axisBottom(xScale)
      .ticks(dataDump.length)
      .tickFormat(d3.timeFormat("%d-%b-%y"))

    // add x axis to svg element
    svg.append("g")
      .attr("transform", "translate(" + svgWidth * 0.1 + ", " + (svgHeight * 0.8) + ")")
      .attr("id", "x_axis")
      .call(x_axis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    // add x axis label
    svg.append("text")
      .attr("x", svgWidth / 2)
      .attr("y", svgHeight * 0.98)
      .style("text-anchor", "middle")
      .text("Date (updated daily at 11:00 UTC)");

    // add y axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", svgWidth * 0)
      .attr("x", 0 - (svgHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Price (in wow gold)");

    // add title
    svg.append("text")
      .attr("x", svgWidth * 0.5)
      .attr("y", svgHeight * 0.05)
      .style("text-anchor", "middle")
      .text("Historical Daily Price Averages");
  }

  render() {
    return (
      <div>
        <svg className="bar-chart" id="myGraph"></svg>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({ dailySummaries: state.dailySummaries });
};

const GraphConnected = connect(mapStateToProps)(Graph);

export default GraphConnected;
