import React from 'react';
import { connect } from 'react-redux';

class Summary extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
	    highPrice: 0,
      lowPrice: 0,
      average: 0,
      supply: 0,
    };
	}

	componentWillReceiveProps(nextProps) {
    let marketSummary = this.analyzeData(nextProps.dumps)
    
    this.setState({
      highPrice: marketSummary.highPrice,
      lowPrice: marketSummary.lowPrice,
      average: marketSummary.avgPrice,
      supply: marketSummary.supply,
    });
  }
  
  analyzeData(summaryList) {
    let marketSummary = {
      highPrice: 0,
      lowPrice: 0,
      avgPrice: 0,
      supply: 0,
    }

    summaryList.forEach((dailySummary) => {
      if (marketSummary.lowPrice === 0 || dailySummary.avgBuyout < marketSummary.lowPrice) {
        marketSummary.lowPrice = dailySummary.avgBuyout;
      }
      if (dailySummary.avgBuyout > marketSummary.highPrice) {
        marketSummary.highPrice = dailySummary.avgBuyout;
      }

      marketSummary.supply += dailySummary.totalSupply;
      marketSummary.avgPrice += dailySummary.avgBuyout;  
    })

    marketSummary.supply = Math.round(marketSummary.supply / summaryList.length);
    marketSummary.avgPrice = Math.round(marketSummary.avgPrice / summaryList.length);

    return marketSummary;
  }
  
	render() {
		return(
			<div>
        <div className="summaryHeader">{`Market Summary`}</div>
        <div>{`Lowest price was ${this.state.lowPrice}`}</div>
        <div>{`Highest price was ${this.state.highPrice}`}</div>
        <div>{`Running ${this.props.dumps.length} day average is ${this.state.average}`}</div>
        <div>{`Average daily supply of this item is ${this.state.supply}`}</div>
		  </div>
		);
	}
}

const mapStateToProps = (state) => {
  return ( { dumps: state.dumps } );
};

const SummaryConnected = connect(mapStateToProps)(Summary);

export default SummaryConnected;
