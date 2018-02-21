import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from '../src/store/store.js';
import style from '../src/styles/style.scss';
import MainConnected from './components/Main.js';
import { connect } from 'react-redux';

class AptApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    {console.log(this.props.items)}
    return (
      <div>
        <MainConnected items={this.props.items}/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch){
  return {}
}

const App = connect(mapStateToProps, mapDispatchToProps)(AptApp);

ReactDOM.render((
  <Provider store={ Store } >
    <App />
  </Provider>
), document.getElementById('root'));
