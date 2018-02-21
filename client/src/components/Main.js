import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import AuctionItem from './auctionItem';

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

	// TODO:
	// add to store
	// display
	// do calcs
	// display calcs
	search(e) {
		e.preventDefault();
		let input = $('#search').val();
		axios.get(`/queryDB?item=${input}`)
			.then((res) => {
				console.log('success ', res);
			})
			.catch((res) => {
				console.log('error ', res);
			});
	}

	render() {
		return(
		  <div>
		    <div>{this.props.items.map((item, i) => (
		    	<AuctionItem item={item} key={i}/>
		    ))}
		    <button onClick={this.handleClick.bind(this)}>Update DB</button>
		    <div>
		    	<form onSubmit={this.search.bind(this)}>
				    <input id="search" placeholder="enter item ID ex '12417'"/>
		    	</form>
		    </div>
		    </div>
		  </div>
		);
	}
}

// export default Main;

const mapDispatchToProps = dispatch => (
  {}

  // { loadMessages: messageInfo => dispatch(setMessages(messageInfo)) }
);

const mapStateToProps = (state) => {
  // const messagesById = state.messages.byId;
  // const messagesForChat = Object.keys(messagesById).map(key => messagesById[key]);
  return state;
};

const MainConnected = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainConnected;

