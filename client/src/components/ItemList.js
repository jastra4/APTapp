import React from 'react';
import Item from './Item';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { test: false };
  }

  render () {
    console.log('ItemList ', this.props.items);
    if (this.props.items[0] !== undefined) {
      var test = JSON.parse(this.props.items[0][0]).split('');
      test = test.slice(0, 10).join('');
      console.log(test);
      console.log(Date.now());
    }
		return (
      <div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
        <div>Sunday</div>
  		  <div>
  		  	{this.props.items.map((itemList, i) => (
            <Item itemList={itemList} key={i} />
          ))}
  		  </div>
      </div>
		);
  }
}

export default ItemList;
