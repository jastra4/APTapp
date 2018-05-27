import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import DBitem from './DBitem';

class Professions extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        categories: [],
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
      categories: [],
      reagent: [{ NAME: 'Dreamleaf' }, { NAME: 'Felwort' }, { NAME: 'Astral Glory' }],
      consumable: [{ NAME: 'avalanche elixir' }, { NAME: 'astral healing potion' }, { NAME: 'flask of ten thousand scars' }],
      equipment: [{ NAME: 'demonsteel helm' }, { NAME: 'empyrial breastplate' }, { NAME: 'infernal alchemist stone' }],
    })
    // axios.get(`/viewItems?item=${this.state.categories}`)
    //   .then((res) => {
    //     console.log('res ', res.data);
    //     this.setState({
    //       categories: [],
    //       reagent: res.data.reagent,
    //       consumable: res.data.consumable,
    //       equipment: res.data.equipment,
    //     })
    //   })
    //   .catch((res) => {
    //     console.log('error ', res);
    //     this.setState({
    //       categories: []
    //     })
    //   });
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
      <div className="DBview">
        <div className="DBprofs">
          <div className="profsHeader">Professions</div>
          <form>
            <input type="checkbox" value="Alchemy" onClick={() => {this.add('alchemy')} }></input>Alchemy<br></br>
            <input type="checkbox" value="Blacksmithing" onClick={() => { this.add('blacksmithing') }}></input>Blacksmithing<br></br>
            <input type="checkbox" value="Cooking" onClick={() => { this.add('cooking') }}></input>Cooking<br></br>
            <input type="checkbox" value="Enchanting"></input>Enchanting<br></br>
            <input type="checkbox" value="Engineering"></input>Engineering<br></br>
            <input type="checkbox" value="First Aid"></input>First Aid<br></br>
            <input type="checkbox" value="Inscription"></input>Inscription<br></br>
            <input type="checkbox" value="Jewel Crafting"></input>Jewel Crafting<br></br>
            <input type="checkbox" value="Leatherworking"></input>Leatherworking<br></br>
            <input type="checkbox" value="Tailoring"></input>Tailoring<br></br>
            <button className="DBbutton" onClick={this.viewItems}>Submit</button>
          </form>
        </div>

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
    );
  }
}

export default Professions;

