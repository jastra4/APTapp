import React from 'react';
import { connect } from 'react-redux';
import { updateMarketSummary } from '../../src/actions/summaryActions';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minBuyout: null,
      maxBuyout: null,
      avgBuyout: null,
      numAuctions: null,
      totalSupply: null,
      name: { date: null },
    };
  }

  componentDidMount() {
    this.getDailySummary(this.props.dailyData);
  }

  componentWillReceiveProps(nextProps) {
    this.getDailySummary(nextProps.dailyData);
  }

  getDailySummary(dailyData) {
    let results = dailyData.results;
    let dateObj = dailyData.stamp;

    let summary = {
      minBuyout: 0,
      maxBuyout: 0,
      avgBuyout: 0,
      numAuctions: results.length,
      totalSupply: 0,
      name: dateObj,
    };

    results.forEach((item, i) => {
      if ((item.buyout / item.quantity) > summary.maxBuyout) {
        summary.maxBuyout = (item.buyout / item.quantity);
      }
      if ((item.buyout / item.quantity) < summary.minBuyout || summary.minBuyout === 0) {
        summary.minBuyout = (item.buyout / item.quantity);
      }
      summary.avgBuyout += item.buyout;
      summary.totalSupply += item.quantity;
    });
    summary.avgBuyout = summary.avgBuyout / (summary.totalSupply || 1);
    summary.minBuyout = Math.floor((summary.minBuyout / 10000));
    summary.maxBuyout = Math.floor((summary.maxBuyout / 10000));
    summary.avgBuyout = Math.floor((summary.avgBuyout / 10000));

    this.setState({
      minBuyout: summary.minBuyout,
      maxBuyout: summary.maxBuyout,
      avgBuyout: summary.avgBuyout,
      numAuctions: summary.numAuctions,
      totalSupply: summary.totalSupply,
      name: summary.name,
    }, () => {
      this.props.updateMarketSummary(summary);
    });
  }

  render () {
    return (
      <div className="dailySummary">
        <div className="header4">{`${this.state.name.date}`}</div>
        <div>{`Min price: ${this.state.minBuyout}`}</div>
        <div>{`Max price: ${this.state.maxBuyout}`}</div>
        <div>{`Average price: ${this.state.avgBuyout}`}</div>
        <div>{`Auctions: ${this.state.numAuctions}`}</div>
        <div>{`Supply: ${this.state.totalSupply}`}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  { updateMarketSummary: dailySummary => dispatch(updateMarketSummary(dailySummary)), }
);

const ItemConnected = connect(null, mapDispatchToProps)(Item);

export default ItemConnected;
