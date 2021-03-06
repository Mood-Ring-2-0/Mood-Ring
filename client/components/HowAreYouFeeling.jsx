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
import { createGlobalStyle } from 'styled-components';


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
    currentUser: reduxState.currentUser,
    response: reduxState.response,
    username: reduxState.username
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
    this.routeToCalendar = this.routeToCalendar.bind(this);
  }

  // componentDidMount() {
  //   const ourObj = { username: this.props.username }
  //   fetch('/getUserMoods', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(ourObj)
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log('thisisourDATA', data)
  //   }).catch(err=>{
  //     console.log('hitting error')
  //     console.log(err)
  //   });
  // }


  sendMood() {

    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; 
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let newDate = year + "-" + month + "-" + day;

    console.log('this is date', newDate)

    const value = document.getElementById('selector').value;

    const user = {
      username: this.props.currentUser,
      mood: value,
      date: newDate,
    };
    console.log('user', user)
    
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
  
  routeToCalendar() {
    this.props.history.push('/calendar')
  }

  render() {
    const cur = this.props.currentUser;
    return (
      <MainDiv>
        <TitleText key='titletext' onClick={this.gotToMain}>m☯☯d ring</TitleText>
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
        <button onClick={this.routeToCalendar}>View your Mood Calendar</button>
      </MainDiv>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Feeling);
