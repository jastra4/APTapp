import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import setItemList from '../../src/actions/itemsActions';
import loadingStatus from '../../src/actions/loadingActions';
import { clearDumpTotals } from '../../src/actions/dumpActions';

class Search extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
      itemName: '',
    };

		this.queryDB = this.queryDB.bind(this);
	}

	queryDB(e) {
    this.props.loadingStatus(true);
    
		e.preventDefault();
		let input = $('#queryDB').val();
		$('#queryDB').val('');
		axios.get(`/queryDB?item=${input}`)
			.then((res) => {
        this.setState({itemName: input});
        console.log('res ', res.data, ' for ', input);
        this.props.clearDumpTotals({}); // clear dump totals in store
        this.props.loadItems(res.data);
			})
			.catch((res) => {
				console.log('error ', res);
			});
  }
  

	render() {
    if (this.props.loading === true) {
      return (
        <div>
          <div className="intro">Use this app to find a competitive price to buy or sell items on the World of Warcraft auction house (in game). It works with a Blizzard API to collect data on hundreds of thousands of items from other players and applies an algorithm to get you market color.</div>
          <div className="disclaimer">* Due to database limits, real time updates from Blizzard have been suspended. 500 MB of historical data is still available.</div>

          <form>
            <input list="items" id="queryDB" className="search" placeholder="Item name (ex Dreamleaf)"></input>
            <datalist id="items">
              <option value="Aethril"></option>
              <option value="Astral Glory"></option>
              <option value="Astral Healing Potion"></option>
              <option value="Avalanche Elixir"></option>
              <option value="Darkmoon Daggermaw"></option>
              <option value="Dreamleaf"></option>
              <option value="Felwort"></option>
              <option value="Flask of Ten Thousand Scars"></option>
              <option value="Flask of the Countless Armies"></option>
              <option value="Flask of the Seventh Demon"></option>
              <option value="Flask of the Whispered Pact"></option>
              <option value="Fjarnskaggl"></option>
              <option value="Foxflower"></option>
              <option value="Lavish Suramar Feast"></option>
              <option value="Leytorrent Potion"></option>
              <option value="Potion of Prolonged Power"></option>
              <option value="Starlight Rose"></option>
              <option value="Skystep Potion"></option>
              <option value="Unbending Potion"></option>
              <option value="Yseralline Seed"></option>
            </datalist>
            <input type="submit" onClick={this.queryDB}></input>
          </form>
          <div className="itemName">loading...</div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="intro">Use this app to find a competitive price to buy or sell items on the World of Warcraft auction house (in game). It works with a Blizzard API to collect data on hundreds of thousands of items from other players and applies an algorithm to get you market color.</div>
          <div className="disclaimer">* Due to database limits, real time updates from Blizzard have been suspended. 500 MB of historical data is still available.</div>
          
          <form>
            <input list="items" id="queryDB" className="search" placeholder="Item name (ex Dreamleaf)"></input>
            <datalist id="items">
              <option value="Aethril"></option>
              <option value="Astral Glory"></option>
              <option value="Astral Healing Potion"></option>
              <option value="Avalanche Elixir"></option>
              <option value="Darkmoon Daggermaw"></option>
              <option value="Dreamleaf"></option>
              <option value="Felwort"></option>
              <option value="Flask of Ten Thousand Scars"></option>
              <option value="Flask of the Countless Armies"></option>
              <option value="Flask of the Seventh Demon"></option>
              <option value="Flask of the Whispered Pact"></option>
              <option value="Fjarnskaggl"></option>
              <option value="Foxflower"></option>
              <option value="Lavish Suramar Feast"></option>
              <option value="Leytorrent Potion"></option>
              <option value="Potion of Prolonged Power"></option>
              <option value="Starlight Rose"></option>
              <option value="Skystep Potion"></option>
              <option value="Unbending Potion"></option>
              <option value="Yseralline Seed"></option>
            </datalist>
            <input type="submit" onClick={this.queryDB}></input>
          </form>
          <div className="itemName">{this.state.itemName}</div>
        </div>
      );
    }
	}
}

const mapDispatchToProps = dispatch => (
  { 
    loadItems: itemList => dispatch(setItemList(itemList)),
    clearDumpTotals: dumpTotals => dispatch(clearDumpTotals(dumpTotals)),
    loadingStatus: (status) => dispatch(loadingStatus(status)),
  }
);

const mapStateToProps = (state) => {
  return ({ items: state.items, loading: state.loading} );
};

const SearchConnected = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchConnected;
