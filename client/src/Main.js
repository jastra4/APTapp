import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from '../src/store/store.js';
import SearchConnected from './components/Search';
import SummaryConnected from './components/Summary';
import GraphConnected from './components/Graph';
import ItemListConnected from './components/ItemList';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        <img src="https://i.imgur.com/jIa2Ebd.jpg" id="background"/>
        <div className="header1">Wowmiser
          <div className="header2">A World of Warcraft app</div>
        </div>
        <div className="intro">Use this app to find a competitive price to buy or sell items on the World of Warcraft auction house (in game). It works with a Blizzard API to collect data on hundreds of thousands of items from other players and applies an algorithm to get you market color.</div>
        <div className="disclaimer">* Due to database limits, real time updates from Blizzard have been suspended. 500 MB of historical data is still available.</div>
        <SearchConnected />
        <GraphConnected />  
        <SummaryConnected />
        <ItemListConnected />
      </div>
    )
  }
}

ReactDOM.render((
  <Provider store={ Store } >
    <Main />
  </Provider>
), document.getElementById('root'));
