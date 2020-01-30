/***************************\
*                           *
*  Landing Page Body: The   *
*  storage for the landing  *
*  page's main content.     *
*                           *
\***************************/

import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions.js';
import MainHeader from './MainHeader.jsx'
import { createGlobalStyle } from 'styled-components';

//Styling for the daily quote
const Quote = styled.h1`
  font-style: italic;
  font-family: 'Assistant', sans-serif;
  margin-top: 80px;
  width: 60%;
  // text-align: center;
`;

//Styling for the log in button
const LoginButton = styled.button`
  text-decoration: none;
  color: black;
  font-size: 20px;
  margin: 3px;
  width: 18%;
  height: 7%;
  &:focus {
    outline: none;
  }
`;
const TitleText = styled.p`
  text-align: center;
  margin: 2px;
  font-family: 'Assistant', sans-serif;
  font-weight: bold;
  font-size: 80px;
`;

const mapStateToProps = (reduxState) => {
  //used to bring in the pieces of state that the components on this page will use
  return {
    page: reduxState.page,
    quote: reduxState.quote,
    author: reduxState.author
  };
};

const mapDispatchToProps = (dispatch) => {
  //used to bring in actions that will be dispatched within the components on this page.
  return {
    saveQuote: (quote, author) => {
      dispatch(actions.saveQuote(quote, author))
    }
  };
};

class LandingPageBody extends Component {
  constructor(props) {
    super(props);

    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((res) => {
        let rand = Math.floor(Math.random() * 1620);
        console.log(res[rand].author);
        if (res[rand].author == null) {
          this.props.saveQuote(res[rand].text, 'Jon Gonzalez')

        } else {
          this.props.saveQuote(res[rand].text, res[rand].author)

        }
      });
  }

  changePage() {
    this.props.history.push('/login')
  }

  render() {
    //Variable for dynamic quote fetching
    const quoteComp = (
      <Quote>
        "{this.props.quote}" - {this.props.author}
      </Quote>
    );

    return (
      <mainDivTwo>
        <TitleText key='titletext' onClick={this.gotToMain}>m☯☯d ring</TitleText>
        {quoteComp}
        <br></br>
        <LoginButton className="start-today" onClick={this.changePage}>
          start today
        </LoginButton>
      </mainDivTwo>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageBody);
