import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    let results = Object.values(this.props.items);
    results = results.slice(0, results.length);
    let obj = {results: results};
    console.log('render ', obj);
		return (
      <div>
        <div>
          {results.map((dump, i) => {
            return (<Item dump={dump} key={i} stamp={this.props.items[i].stamp}/>);
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps ', state.items[0].stamp);
  return ( {items: state.items} );
};

const ItemListConnected = connect(mapStateToProps)(ItemList);

export default ItemListConnected;

        // <div>
        //   {dumpArr.map((dump, i) => (
        //     <Item dump={dump} key={i} />
        //  ))}
        // </div>