import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from '../src/store/store.js';
import SearchConnected from './components/Search';
import SummaryConnected from './components/Summary';
import ItemListConnected from './components/ItemList';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <h2 className="header">BestBid
          <div className="subHeader">A World of Warcraft app</div>
        </h2>
        <SearchConnected />
        <img src="https://i.imgur.com/L0eXr2h.jpg" id="background" alt="" />
        
        <div className="main">
          <SummaryConnected />
          <ItemListConnected />
        </div>
        <svg className="bar-chart" ></svg>
        
      </div>
    )
  }
}

ReactDOM.render((
  <Provider store={ Store } >
    <Main />
  </Provider>
), document.getElementById('root'));

// <img src="https://i.imgur.com/L0eXr2h.jpg" id="background" alt="" />
// style="float:left; padding-left:10%; padding-top:2%"
