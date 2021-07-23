import "../App.css";
import { Container, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, {useState} from 'react'
import Login from "../components/Login";
import Signup from "../components/Signup";
import Paper from '@material-ui/core/Paper';
import backgroundUrl from '../assets/images/background.jpg'
import logo from '../assets/images/logo_dark_transparent.png'

function HomePage(props) {
  const [signup, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  

  let handleSignUpPopUp = () => {
    setSignUp(true)
  }
  
  let handleLoginPopUp = () => {
    setLogin(true)
  }
  
  return (
      <div className="landingPageWrapper">
      <Container >
        <div className="landingLogoDescWrapper" align="center" >
          <img src={logo} width="300px" alt={logo} />
          <Typography variant="h6" gutterBottom align="center" color="secondary">
            Connect with people over topics that excite you
        </Typography>
        </div>
        <div className="landingBtnsWrapper" align="center">
          <Button onClick = {handleLoginPopUp} type='submit' variant="outlined" color="primary">
            Login
          </Button>
          <Button onClick = {handleSignUpPopUp} type='submit' variant="outlined" color="primary">
          Sign Up
          </Button>
        </div>

      </Container>
        {
          signup && (
          <div className="popupOpacity">  
             <Signup />
          </div>
          )
        }
      </div>
    
  );
}

export default HomePage;
