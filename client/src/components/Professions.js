import React from 'react';
import axios from 'axios';
import $ from 'jquery';

class Professions extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        categories: [],
        test: ['one', 'two', 'three', 'four'],
      };

    this.viewItems = this.viewItems.bind(this);
    this.add = this.add.bind(this);
  }

  viewItems(e) {
    e.preventDefault();
    $('input[type="checkbox"]:checked').prop('checked', false);
    axios.get(`/viewItems?item=${this.state.categories}`)
      .then((res) => {
        console.log('res ', res.data);
        this.setState({
          categories: []
        })
      })
      .catch((res) => {
        console.log('error ', res);
        this.setState({
          categories: []
        })
      });
  }

  add(val) {
    let arr = this.state.categories;
    arr.push(val);
    this.setState({
      categories: arr
    })
  }

  render() {

    return (
      <div className="itemSelect">
        <div className="professions">Professions
          <form>
            <button className="sub" onClick={this.viewItems}>Submit</button>
            <input type="checkbox" value="Alchemy" onClick={() => {this.add('alchemy')} }></input>Alchemy<br></br>
            <input type="checkbox" value="Blacksmithing" onClick={() => { this.add('blacksmithing') }}></input>Blacksmithing<br></br>
            <input type="checkbox" value="Cooking" onClick={() => { this.add('cooking') }}></input>Cooking<br></br>
            <input type="checkbox" value="Enchanting"></input>Enchanting<br></br>
            <input type="checkbox" value="Engineering"></input>Engineering<br></br>
            <input type="checkbox" value="First Aid"></input>First Aid<br></br>
            <input type="checkbox" value="Fishing"></input>Fishing<br></br>
            <input type="checkbox" value="AlHerbalismchemy"></input>Herbalism<br></br>
            <input type="checkbox" value="Inscription"></input>Inscription<br></br>
            <input type="checkbox" value="Jewel Crafting"></input>Jewel Crafting<br></br>
            <input type="checkbox" value="Leatherworking"></input>Leatherworking<br></br>
            <input type="checkbox" value="Mining"></input>Mining<br></br>
            <input type="checkbox" value="Skinning"></input>Skinning<br></br>
            <input type="checkbox" value="Tailoring"></input>Tailoring<br></br>
          </form>
        </div>

        <div className="reagents">
          <div>Reagents</div>
          {this.state.test.map((data, i) => {
            return (<div key={i}>data</div> );
          })}
        </div>
        <div className="consumables">
          <div>Comsumables</div>
          {this.state.test.map((data, i) => {
            return (<div key={i}>data</div>);
          })}
        </div>
        <div className="equipable">
          <div>Equipable</div>
           {this.state.test.map((data, i) => {
            return (<div key={i}>data</div>);
          })}
        </div>

      </div>
    );
  }
}

export default Professions;

