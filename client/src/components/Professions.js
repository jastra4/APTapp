import React from 'react';
import axios from 'axios';

class Professions extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};

    this.viewItems = this.viewItems.bind(this);
  }

  viewItems(e) {
    axios.get(`/viewItems?item=${'alchemy'}`) // whatever profession is checked
      .then((res) => {
          console.log('res ', res.data);
      })
      .catch((res) => {
      });
  }

  render() {
    return (
      <div>This is the professions page</div>
    );
  }
}

export default Professions;

