/****************************\
*                            *
*  How are you feeling: gets *
*  user mood input and       *
*  responds to it            *
*                            *
\****************************/

import React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions.js';


//The main body styling
const MainDiv = styled.div`
  text-align: center;
  width: 100%;
  height: 650px;
  margin-top: 10px;
  font-family: 'Assistant', sans-serif;
`;

const Response = styled.div`
  width: 100%;
  height: 20%;
  text-align: center;
`;

const SelectStyle = styled.select`
  font-family: 'Assistant', sans-serif;
  max-height: 40px;
  font-size: 18px;
  max-width: 130px;
  opacity: 0.6;
  padding: 20px;
`;

const SubmitButton = styled.button`
margin: auto;
text-decoration: none;
border-radius: 20px;
opacity: 0.6%
font-size: 20px;
&:focus {
  outline: none;
}
`;

const mapStateToProps = (reduxState) => {
  //used to bring in the pieces of state that the components on this page will use
  return {
    currentUser: reduxState.currentUser,
    response: reduxState.response
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveResponse: (response) => {
      dispatch(actions.saveResponse(response))
    }
  }
}

class Feeling extends Component {
  constructor(props) {
    super(props);
    this.sendMood = this.sendMood.bind(this);
  }

  sendMood() {
    const value = document.getElementById('selector').value;

    const user = {
      username: this.props.username,
      mood: value
    };

    fetch('/mood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data.response received after post request to mood', data.response)
        this.props.saveResponse(data.response)
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  render() {
    const cur = this.props.currentUser;
    return (
      <MainDiv>
        <h1>How are you feeling today {cur}?</h1>
        <SelectStyle id="selector">
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="frustrated">Frustrated</option>
          <option value="tired">Tired</option>
          <option value="relaxed">Relaxed</option>
          <option value="anxious">Anxious</option>
          <option value="excited">Excited</option>
          <option value="distracted">Distracted</option>
        </SelectStyle>
        <br></br>
        <br></br>
        <SubmitButton onClick={this.sendMood}>submit</SubmitButton>
        <Response className="return-text">{this.props.response}</Response>
      </MainDiv>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Feeling);
