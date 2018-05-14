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
	}

	componentWillReceiveProps(nextProps) {
    let highPrice = 0;
    let lowPrice = 0;
    let totalAvg = 0;
    let totalSupply = 0;

		nextProps.dumps.forEach((dump, i, arr) => {

      if (lowPrice === 0 || dump.avgBuyout < lowPrice) {
        lowPrice = dump.avgBuyout;
			}
      if (highPrice === 0 || dump.avgBuyout > highPrice) {
        highPrice = dump.avgBuyout;
      }

      totalSupply += dump.totalSupply;
      totalAvg += dump.avgBuyout;
    });
    
    this.setState({
      highPrice: highPrice,
      lowPrice: lowPrice,
      average: Math.round(totalAvg / nextProps.dumps.length),
      supply: Math.round(totalSupply / nextProps.dumps.length),
    });
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
