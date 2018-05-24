import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { connect } from 'react-redux';
import { loadResults } from '../../src/actions/searchActions';
import { loadingStatus } from '../../src/actions/loadingActions';
import { clearMarketSummary } from '../../src/actions/summaryActions';

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
        console.log('res ', res.data);
        this.setState({itemName: input});
        this.props.clearMarketSummary();
        this.props.loadItems(res.data);
			})
			.catch((res) => {
        this.props.clearMarketSummary();
        this.props.loadItems([]);
        this.props.loadingStatus(false);
        this.setState({ itemName: 'item not found' });
			});
  }
  

	render() {
    if (this.props.loading === true) {
      return (
        <div>
          <div className="intro">Use this app to find a competitive price to buy or sell items on the World of Warcraft auction house (in game). It works with a Blizzard API to collect data on hundreds of thousands of items from other players and applies an algorithm to get you market color.</div>
          <div className="disclaimer">* Due to database limits, real time updates from Blizzard have been suspended. 500 MB of historical data is still available.</div>

          <form>
            <input list="items" id="queryDB" className="searchBar" placeholder="Item name (ex Dreamleaf or Felwort)"></input>
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
            <button type="submit" onClick={this.queryDB}>Search</button>
          </form>
          <div className="searchedItem">loading...</div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="intro">Use this app to find a competitive price to buy or sell items on the World of Warcraft auction house (in game). It works with a Blizzard API to collect data on hundreds of thousands of items from other players and applies an algorithm to get you market color.</div>
          <div className="disclaimer">* Due to database limits, real time updates from Blizzard have been suspended. 500 MB of historical data is still available.</div>
          
          <form>
            <input list="items" id="queryDB" className="searchBar" placeholder="Item name (ex Dreamleaf or Felwort)"></input>
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
            <button type="submit" onClick={this.queryDB}>Search</button>
          </form>
          <div className="searchedItem">{this.state.itemName}</div>
        </div>
      );
    }
	}
}

const mapDispatchToProps = dispatch => (
  { 
    loadItems: itemList => dispatch(loadResults(itemList)),
    clearMarketSummary: () => dispatch(clearMarketSummary()),
    loadingStatus: (status) => dispatch(loadingStatus(status)),
  }
);

const mapStateToProps = (state) => {
  return ({ loading: state.loading, });
};

const SearchConnected = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchConnected;
