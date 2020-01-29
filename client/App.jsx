import React, { Component } from 'react';
import MainHeader from './components/MainHeader.jsx';
import LandingPageBody from './components/LandingPageBody.jsx';
import BottomLinks from './components/BottomLinks.jsx';
import LogIn from './components/LogIn.jsx';
import Feeling from './components/HowAreYouFeeling.jsx';
import CreateUser from './components/CreateUser.jsx';
import * as actions from '../redux/actions.js';
import { connect } from 'react-redux';

const page1 = 'Create';
//adding new comment for testing

const mapStateToProps = (reduxState) => {
  //used to bring in the pieces of state that the components on this page will use
  return {
    page: reduxState.page
  };
};

const mapDispatchToProps = (dispatch) => {
  //used to bring in actions that will be dispatched within the components on this page.
  return {
    changePage: (index) => {
      dispatch(actions.changePage(index));
    }
  };
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //changePage(0) serves the homepage for the app
    this.props.changePage(0);
  }

  render() {
    // const display = [];
    // display.push(<MainHeader key='mainheader'/>);
    // switch (this.props.page) {
    //   case 'Home':
    //     display.push(<LandingPageBody key='landingpagebody'/>);
    //     break;
    //   case 'Create':
    //     display.push(<CreateUser key='createuser'/>);
    //     break;
    //   case 'Login':
    //     display.push(<LogIn key='login'/>);
    //     break;
    //   case 'UserFeed':
    //     display.push(<Feeling key='feeling'/>);
    //     break;
    // }
    // display.push(<BottomLinks key='bottomlinks'/>);
    return (
      <div>HELLO WORLD!!</div>
    // <div>{display}</div>;
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
