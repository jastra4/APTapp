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
        <div className="header">Wowmiser
          <div className="subHeader">A World of Warcraft app</div>
        </div>
        <SearchConnected />
        <img src="https://i.imgur.com/L0eXr2h.jpg" id="background" alt="" />

        <svg className="bar-chart" id="myGraph"></svg>
        <GraphConnected />  

        <div className="test">
          <SummaryConnected />
        </div>
        <div className="test">
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
