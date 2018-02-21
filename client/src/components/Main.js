import React from 'react';
import axios from 'axios';
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

	render() {
		return(
		  <div>
		    <div>{this.props.items.map((item, i) => (
		    	<AuctionItem item={item} key={i}/>
		    ))}
		    <button onClick={this.handleClick.bind(this)}>Get Data</button>
		    </div>
		  </div>
		);
	}
}

export default Main;
