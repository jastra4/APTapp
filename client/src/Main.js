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
        <h2 className="header">Buy low, sell high.
          <div className="subHeader">(a World of Warcraft pricing tool)</div>
        </h2>
        <SearchConnected />
        <img src="https://i.imgur.com/L0eXr2h.jpg" id="background" alt=""/>
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
    <Main />
  </Provider>
), document.getElementById('root'));
