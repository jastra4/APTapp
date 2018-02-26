import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from '../src/store/store.js';
import SearchConnected from './components/Search';
import SummaryConnected from './components/Summary';
import ItemListConnected from './components/ItemList';

// todo:
// add each dump to store
// indicate best buy/sell times in summary

class AptApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <h2 className="title">Make your own luck.</h2>
        <img src="https://i.imgur.com/L0eXr2h.jpg" id="background" alt=""/>
        <SearchConnected />
        <div className="main">
          <SummaryConnected />
          <ItemListConnected />
        </div>
      </div>
    )
  }
}

ReactDOM.render((
  <Provider store={ Store } >
    <AptApp />
  </Provider>
), document.getElementById('root'));
