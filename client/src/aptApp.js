import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from '../src/store/store.js';
import MainConnected from './components/Main';
import SummaryConnected from './components/Summary';

class AptApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div>
        <SummaryConnected />
        <MainConnected />
      </div>
    )
  }
}

ReactDOM.render((
  <Provider store={ Store } >
    <AptApp />
  </Provider>
), document.getElementById('root'));
