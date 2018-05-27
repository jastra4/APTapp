import React from 'react';

class DBitem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="DBlistItem">{this.props.name}</div>
    );
  }
}

export default DBitem;
