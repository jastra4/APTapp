import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import DBitem from './DBitem';

class Professions extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        professions: [],
        reagent: [],
        consumable: [],
        equipment: [],
      };

    this.viewItems = this.viewItems.bind(this);
    this.add = this.add.bind(this);
  }

  viewItems(e) {
    e.preventDefault();
    // $('input[type="checkbox"]:checked').prop('checked', false);
    this.setState({
      // professions: [],
      reagent: [],
      consumable: [],
      equipment: [],
    })
    axios.get(`/viewItems?item=${this.state.professions}`)
      .then((res) => {
        console.log('res ', res.data);
        this.setState({
          //professions: [],
          reagent: res.data.reagent,
          consumable: res.data.consumable,
          equipment: res.data.equipment,
        })
      })
      .catch((res) => {
        console.log('error ', res);
        this.setState({
          professions: []
        })
      });
  }

  add(val) {
    // add to profs if not selected, remove from profs if it was selected
    if (this.state.professions.includes(val) === false) {
      let arr = this.state.professions;
      arr.push(val);
      this.setState({
        professions: arr
      })
    } else {
      var index = this.state.professions.indexOf(val);
      this.state.professions.splice(index, 1)
      // this.setState({
      //   professions: this.state.professions.splice(index, 1)
      // })
    }
    console.log(this.state);
  }

  render() {

    return (
      <div className="DBview">
        <div className="DBprofs">
          <div className="profsHeader">Professions</div>
          <form>
            <input type="checkbox" value="Alchemy" onClick={() => {this.add('alchemy')} }></input>Alchemy<br></br>
            <input type="checkbox" value="Blacksmithing" onClick={() => { this.add('blacksmithing') }}></input>Blacksmithing<br></br>
            <input type="checkbox" value="Cooking" onClick={() => { this.add('cooking') }}></input>Cooking<br></br>
            <input type="checkbox" value="Enchanting" onClick={() => { this.add('enchanting') }}></input>Enchanting<br></br>
            <input type="checkbox" value="Engineering" onClick={() => { this.add('engineering') }}></input>Engineering<br></br>
            <input type="checkbox" value="First Aid" onClick={() => { this.add('first aid') }}></input>First Aid<br></br>
            <input type="checkbox" value="Inscription" onClick={() => { this.add('inscription') }}></input>Inscription<br></br>
            <input type="checkbox" value="Jewel Crafting" onClick={() => { this.add('jewel crafting') }}></input>Jewel Crafting<br></br>
            <input type="checkbox" value="Leatherworking" onClick={() => { this.add('leatherworking') }}></input>Leatherworking<br></br>
            <input type="checkbox" value="Tailoring" onClick={() => { this.add('tailoring') }}></input>Tailoring<br></br>
            <button className="DBbutton" onClick={this.viewItems}>Submit</button>
          </form>
        </div>
        <div className="test">
          <div className="DBlist">
            <div className="DBlistHeader">Reagents</div>
            <div className="DBlistItems">
              {this.state.reagent.map((data, i) => {
                return (<DBitem key={i} name={data.NAME}/> );
              })}
            </div>
          </div>
          <div className="DBlist">
            <div className="DBlistHeader">Comsumables</div>
            <div className="DBlistItems">
              {this.state.consumable.map((data, i) => {
                return (<DBitem key={i} name={data.NAME} />);
              })}
            </div>
          </div>
          <div className="DBlist">
            <div className="DBlistHeader">Equipment</div>
            <div className="DBlistItems">
              {this.state.equipment.map((data, i) => {
                return (<DBitem key={i} name={data.NAME} />);
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Professions;

