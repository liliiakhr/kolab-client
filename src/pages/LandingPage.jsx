import "../App.css";
import { Container, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Paper from "@material-ui/core/Paper";
import logo from "../assets/images/logo_dark_transparent.png";
import Animation from '../components/Animation';
import landing from '../json/landing.json';
import './landing.css';
import {Grid} from '@material-ui/core';

function LandingPage(props) {
  const [signup, setSignUp] = useState(false);
  // This conditional checks if a props.location.state.renderLogin prop is passed from any page
  // If this is the case the login will be set to true by default
  const [login, setLogin] = useState(props.location.state ? true : false);

  let handleSignUpPopUp = () => setSignUp(!signup);
  let handleLoginPopUp = () => setLogin(!login);

  return (
    <div className="landingPageWrapper">
      <Container className="cont-landing">



      <Grid   container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    spacing={4}
                >

                   
        <Grid item xs={12} sm={6} >
          <div className="logo-btns" >
            <div className="landingLogoDescWrapper" align="center">
                <img id="logo-landing" src={logo} width="200px" alt="logo" />
                <h2 id="desc">
                  Connect with people over topics that excite you
                </h2>
              </div>
              <div className="landingBtnsWrapper" align="center">
                <Button
                  onClick={handleLoginPopUp}
                  type="submit"
                  id="login-btn"
                >
                  Login
                </Button>
                <Button
                  onClick={handleSignUpPopUp}
                  type="submit"
                  id="signup-btn"
                >
                  Sign Up
                </Button>
              </div>


            </div>    
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className="animation-wrapper">
            <Animation width={700} height={700} animation={landing} />
          </div>
          <br />
          <div className="madeBy">
            <p>Made by 
            <a target="_blank" href="https://www.linkedin.com/in/kalandemwamba/" > Kalande</a>, 
            <a target="_blank" href="https://www.linkedin.com/in/liliia-khrystiuk/"> Lily</a> & 
            <a target="_blank" href="https://www.linkedin.com/in/bartspangenberg/"> Bart</a></p>
          </div>
        </Grid>
      </Grid>


          


      </Container>
      {signup && (
        <div className="popupOpacity">
          <Signup onSignUpPopUp={handleSignUpPopUp} onSignUp={props.onSignUp} />
        </div>
      )}{" "}
      {login && (
        <div className="popupOpacity">
          <Login onLoginPopUp={handleLoginPopUp} onLogin={props.onLogin} />
        </div>
      )}


    </div>
  );
}

export default LandingPage;
