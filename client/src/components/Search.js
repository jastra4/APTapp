import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import setItemList from '../../src/actions/itemsActions';

class Search extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};

		// this.updateDB = this.updateDB.bind(this);
		this.queryDB = this.queryDB.bind(this);
	}

	// updateDB() {
	//   axios.get(`/updateDB?region=${'US'}&&realm=${'Thrall'}`)
	//     .then((res) => {
	//     	console.log('success ', res);
	//     })
	//     .catch((res) => {
	//     	console.log('error ', res);
	//     });
	// }

	queryDB(e) {
		e.preventDefault();
		let input = $('#queryDB').val();
		$('#queryDB').val('');
		axios.get(`/queryDB?item=${input}`)
			.then((res) => {
				console.log('res ', res.data);
				this.props.loadItems(res.data);
			})
			.catch((res) => {
				console.log('error ', res);
			});
	}

	render() {
		return(
		  <div>
			<p className="intro"> Type your item's number and hit enter.</p>
			
	    	<form onSubmit={this.queryDB}>
			    <input className="search" id="queryDB" placeholder="search by item ID (ex. 124102)"/>
	    	</form>

			<p className="intro">
			  This app pulls real world data directly from Blizzard and applies an algorithm to get you market color about your item.
			  <br></br>
			  This will help you determine a competitive price to list your item at on the World of Warcraft auction house.
			  <br></br>
			  * Due to database limits updates from Blizzard have been suspended. 500 MB of historical data is still available.
			</p>
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
