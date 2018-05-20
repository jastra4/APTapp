import React from 'react';
import { connect } from 'react-redux';
import { setDumpTotals, clearDumpTotals} from '../../src/actions/dumpActions';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minBuyout: 0,
      maxBuyout: 0,
      avgBuyout: 0,
      avgAuctionSize: 0,
      totalSupply: 0,
    };
  }

  componentDidMount() {
    if (this.props.dump.results !== null) {
      this.getMarketColor(this.props.dump, this.props.stamp);
    } else {
      this.setState({
        minBuyout: 0,
        maxBuyout: 0,
        avgBuyout: 0,
        avgAuctionSize: 0,
        totalSupply: 0,
      }, () => {
        this.props.loadDumpTotals({
          minBuyout: this.state.minBuyout,
          maxBuyout: this.state.maxBuyout,
          avgBuyout: this.state.avgBuyout,
          auctions: 0,
          totalSupply: this.state.totalSupply,
          name: this.props.stamp,
        });
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== undefined) {
      if (nextProps.dump.results !== null) {
        this.getMarketColor(nextProps.dump, nextProps.stamp);
      } else {
        this.setState({
          minBuyout: 0,
          maxBuyout: 0,
          avgBuyout: 0,
          avgAuctionSize: 0,
          totalSupply: 0,
        }, () => {
          this.props.loadDumpTotals({
            minBuyout: this.state.minBuyout,
            maxBuyout: this.state.maxBuyout,
            avgBuyout: this.state.avgBuyout,
            auctions: 0,
            totalSupply: this.state.totalSupply,
            name: nextProps.stamp,
          });
        })
      }
    }
  }

  getMarketColor(data, timeStamp) {
    let minBuyout = 0;
    let maxBuyout = 0;
    let avgBuyout = 0;
    let avgAuctionSize = 0;
    let totalSupply = 0;

    data.results.forEach((item, i) => {
      if ((item.buyout / item.quantity) > maxBuyout) {
        maxBuyout = (item.buyout / item.quantity);
      }
      if ((item.buyout / item.quantity) < minBuyout || minBuyout === 0) {
        minBuyout = (item.buyout / item.quantity);
      }
      avgBuyout += item.buyout;
      totalSupply += item.quantity;
    });
    avgBuyout = avgBuyout / (totalSupply || 1);
    avgAuctionSize = totalSupply / (data.length || 1);

    this.setState({
      minBuyout: Math.floor((minBuyout / 10000)),
      maxBuyout: Math.floor((maxBuyout / 10000)),
      avgBuyout: Math.floor((avgBuyout / 10000)),
      avgAuctionSize: Math.floor(totalSupply / (data.length || 1)),
      totalSupply: totalSupply,
    }, () => {
      this.props.loadDumpTotals({
        minBuyout: this.state.minBuyout,
        maxBuyout: this.state.maxBuyout,
        avgBuyout: this.state.avgBuyout,
        auctions: data.results.length,
        totalSupply: this.state.totalSupply,
        name: timeStamp,
      });
    });
  }

  render () {
    if (this.props.dump.results === null) {
      return (
        <div className="dailySummary">
          <div className="header4">{`${this.props.stamp.date}`}</div>
          <div>{`Min price: ${this.state.minBuyout}`}</div>
          <div>{`Max price: ${this.state.maxBuyout}`}</div>
          <div>{`Average price: ${this.state.avgBuyout}`}</div>
          <div>{`Auctions: ${0}`}</div>
          <div>{`Supply: ${this.state.totalSupply}`}</div>
        </div>
      );
    } else {
      return (
        <div className="dailySummary">
          <div className="header4">{`${this.props.stamp.date}`}</div>
          <div>{`Min price: ${this.state.minBuyout}`}</div>
          <div>{`Max price: ${this.state.maxBuyout}`}</div>
          <div>{`Average price: ${this.state.avgBuyout}`}</div>
          <div>{`Auctions: ${this.props.dump.results.length}`}</div>
          <div>{`Supply: ${this.state.totalSupply}`}</div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => (
  { loadDumpTotals: dumpTotals => dispatch(setDumpTotals(dumpTotals)),
    clearDumpTotals: dumpTotals => dispatch(clearDumpTotals(dumpTotals)),
  }
);

const ItemConnected = connect(null, mapDispatchToProps)(Item);

export default ItemConnected;
