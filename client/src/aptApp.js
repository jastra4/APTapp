import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store.js';
import style from './style.scss';
import Main from './components/Main.js';

class AptApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div>
        <div>Hello world</div>
        <Main />
      </div>
    )
  }
}

ReactDOM.render((
  <Provider store={store} >
    <AptApp />
  </Provider>
), document.getElementById('root'));

// function mapStateToProps (state) {
//   return {
//     currentTab: state.currentTab,
//     user: state.user
//   }
// }

// function mapDispatchToProps (dispatch) {
//   return bindActionCreators({
//     selectTab: selectTab,
//     setUser: setUser,
//     logoutReset: logoutReset
//   }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AptApp);
