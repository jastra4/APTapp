import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import setItemList from '../../src/actions/itemsActions';
import ItemList from './ItemList';

class Main extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

	handleClick() {
	  axios.get(`/updateDB?region=${'US'}&&realm=${'Tichondrius'}`)
	    .then((res) => {
	    	console.log('success ', res);
	    })
	    .catch((res) => {
	    	console.log('error ', res);
	    });
	}

	search(e) {
		e.preventDefault();
		let input = $('#search').val();
		axios.get(`/queryDB?item=${input}`)
			.then((res) => {
				console.log('success ', res);
				this.props.loadItems(res.data);
			})
			.catch((res) => {
				console.log('error ', res);
			});
	}

	render() {
		console.log('Main props ', this.props);
		return(
		  <div>
		    <button onClick={this.handleClick.bind(this)}>Update DB</button>
		    <div>
		    	<form onSubmit={this.search.bind(this)}>
				    <input id="search" placeholder="enter item ID ex '12417'"/>
		    	</form>
		    </div>
				<ItemList items={this.props.items} />
		  </div>
		);
	}
}

const mapDispatchToProps = dispatch => (
  { loadItems: itemList => dispatch(setItemList(itemList)) }
);

const mapStateToProps = (state) => {
  return state;
};

const MainConnected = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainConnected;
