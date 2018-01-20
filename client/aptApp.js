import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import '../style.scss';

class AptApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div>Hello world</div>
    )
  }
}

ReactDOM.render((
  <Provider store={store} >
    <AptApp />
  </Provider>
), document.getElementById('root'));
