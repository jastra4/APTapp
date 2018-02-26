import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import setItemList from '../../src/actions/itemsActions';

class Search extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};

		this.updateDB = this.updateDB.bind(this);
		this.queryDB = this.queryDB.bind(this);
	}

	updateDB() {
		console.log('updateDB ran');
	  axios.get(`/updateDB?region=${'US'}&&realm=${'Tichondrius'}`)
	    .then((res) => {
	    	console.log('success ', res);
	    })
	    .catch((res) => {
	    	console.log('error ', res);
	    });
	}

	queryDB(e) {
		e.preventDefault();
		let input = $('#queryDB').val();
		axios.get(`/queryDB?item=${input}`)
			.then((res) => {
				console.log(res);
				this.props.loadItems(res.data);
			})
			.catch((res) => {
				console.log('error ', res);
			});
	}

	render() {
		return(
		  <div>
	    	<form onSubmit={this.queryDB}>
			    <input id="queryDB" placeholder="enter item ID ex '124102'"/>
	    	</form>
	    	<button onClick={this.updateDB}>Update</button>
		  </div>
		);
	}
}

const mapDispatchToProps = dispatch => (
  { loadItems: itemList => dispatch(setItemList(itemList)) }
);

const mapStateToProps = (state) => {
  return ( {items: state.items} );
};

const SearchConnected = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchConnected;
