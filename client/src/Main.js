import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from '../src/store/store.js';
import SearchConnected from './components/Search';
import SummaryConnected from './components/Summary';
import GraphConnected from './components/Graph';
import ItemListConnected from './components/ItemList';
import Professions from './components/Professions';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'marketView'
    };

    this.marketView = this.marketView.bind(this);
    this.itemsView = this.itemsView.bind(this);
    this.renderItemsView = this.renderItemsView.bind(this);
    this.renderMarketView = this.renderMarketView.bind(this);
  }

  marketView() {
    this.setState({
      view: 'marketView'
    })
  }

  itemsView() {
    this.setState({
      view: 'itemsView'
    })
  }

  renderMarketView () {
    if (this.state.view === 'marketView') {
      return (
      <div>
        <div className="intro">Use this app to find a competitive price to buy or sell items on the World of Warcraft auction house (in game). It works with a Blizzard API to collect data on hundreds of thousands of items from other players and applies an algorithm to get you market color.</div>
        <div className="disclaimer">* Due to database limits, real time updates from Blizzard have been suspended. 500 MB of historical data is still available.</div>
        <SearchConnected />
        <GraphConnected />
        <SummaryConnected />
        <ItemListConnected />
      </div>);
    } else {
      return (<div></div>);
    }
  }

  renderItemsView () {
    if (this.state.view === 'itemsView') {
      return (<div><Professions /></div>);
    } else {
      return (<div></div>);
    }
  }

  render () {
    return (
      <div>
        <img src="https://i.imgur.com/jIa2Ebd.jpg" id="background"/>
        <div className="header1">Wowmiser
          <div onClick={this.marketView} className="marketView">Market View</div>
          <div onClick={this.itemsView} className="itemView">Items View</div>
          <div>
            <div className="header2">A World of Warcraft app</div>
          </div>


          
        </div>
        {this.renderMarketView()}
        {this.renderItemsView()}
      </div>
    )
  }
}

ReactDOM.render((
  <Provider store={ Store } >
    <Main />
  </Provider>
), document.getElementById('root'));
