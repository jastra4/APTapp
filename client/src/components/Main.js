import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import setItemList from '../../src/actions/itemsActions';
import ItemListConnected from './ItemList';

class Main extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};

		this.updateDB = this.updateDB.bind(this);
		this.queryDB = this.queryDB.bind(this);
	}

	updateDB() {
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
		    <div>
		    	<form onSubmit={this.queryDB}>
				    <input id="queryDB" placeholder="enter item ID ex '12417'"/>
		    	</form>
		    </div>
				<ItemListConnected />
		    <button onClick={this.updateDB}>Update DB</button>
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

const MainConnected = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainConnected;

// items={this.props.items} 