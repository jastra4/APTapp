import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import setItemList from '../../src/actions/itemsActions';
import loadingStatus from '../../src/actions/loadingActions';
import { clearDumpTotals } from '../../src/actions/dumpActions';

class Search extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};

		this.queryDB = this.queryDB.bind(this);
	}

	queryDB(e) {
    this.props.loadingStatus(true);
    
		e.preventDefault();
		let input = $('#queryDB').val();
		$('#queryDB').val('');
		axios.get(`/queryDB?item=${input}`)
			.then((res) => {
        console.log('res ', res.data);
        this.props.clearDumpTotals({}); // clear dump totals in store
        this.props.loadItems(res.data);
			})
			.catch((res) => {
				console.log('error ', res);
			});
	}

	render() {
		return(
		  <div>
        <p className="intro">Use this app to help you calculate a competitive price to buy or sell items on the World of Warcraft auction house. It works with a Blizzard API to collect data on hundreds of thousands of items from other players and applies an algorithm to get you market color.</p>
        <p className="disclaimer">* Due to database limits, real time updates from Blizzard have been suspended. 500 MB of historical data is still available.</p>
	    	<form onSubmit={this.queryDB}>
			    <input className="search" id="queryDB" placeholder="search by item ID (ex. 124669)"/>
	    	</form>
		  </div>
		);
	}
}

const mapDispatchToProps = dispatch => (
  { 
    loadItems: itemList => dispatch(setItemList(itemList)),
    clearDumpTotals: dumpTotals => dispatch(clearDumpTotals(dumpTotals)),
    loadingStatus: (status) => dispatch(loadingStatus(status)),
  }
);

const mapStateToProps = (state) => {
  return ( {items: state.items} );
};

const SearchConnected = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchConnected;
