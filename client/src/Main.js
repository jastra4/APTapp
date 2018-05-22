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

  componentWillUnmount() {
    // send request to server to close mysql connection
    // unless connetions are automatically closed when the app closes
  }

  render () {
    return (
      <div>
        <img src="https://i.imgur.com/jIa2Ebd.jpg" id="background"/>
        <div className="header1">Wowmiser
          <div className="header2">A World of Warcraft app</div>
        </div>
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
