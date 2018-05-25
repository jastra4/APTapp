import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import { loadResults } from '../../src/actions/searchActions';
import { loadingStatus } from '../../src/actions/loadingActions';
import { clearMarketSummary } from '../../src/actions/summaryActions';

class Search extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};

		this.queryDB = this.queryDB.bind(this);
	}

	queryDB(e) {
    this.props.loadingStatus({ status: true, message: 'loading...' });
   
		e.preventDefault();
		let input = $('#queryDB').val();
		$('#queryDB').val('');
		axios.get(`/queryDB?item=${input}`)
			.then((res) => {
        console.log('res ', res.data);
        this.props.loadingStatus({ status: true, message: input });
        this.props.clearMarketSummary();
        this.props.loadItems(res.data);
			})
			.catch((res) => {
        this.props.clearMarketSummary();
        this.props.loadItems([]);
        this.props.loadingStatus({ status: false, message: 'item not found' });
			});
  }
  

	render() {
    return (
      <div>
        <form>
          <input list="items" id="queryDB" className="searchBar" placeholder="Item name (ex Dreamleaf or Felwort)"></input>
          <button type="submit" onClick={this.queryDB}>Search</button>
        </form>
        <div className="searchedItem">{this.props.loading.message}</div>
      </div>
    );
	}
}

const mapDispatchToProps = dispatch => (
  { 
    loadItems: itemList => dispatch(loadResults(itemList)),
    clearMarketSummary: () => dispatch(clearMarketSummary()),
    loadingStatus: (status) => dispatch(loadingStatus(status)),
  }
);

const mapStateToProps = (state) => {
  return ({ loading: state.loading, });
};

const SearchConnected = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchConnected;
