import "../App.css";
import { Container, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Paper from "@material-ui/core/Paper";
import backgroundUrl from "../assets/images/background.jpg";
import logo from "../assets/images/logo_dark_transparent.png";
import FlashMessage from "../components/FlashMessage";

function HomePage(props) {
  console.log(props);
  const { messageType, error, success, trigger } = props;
  const [signup, setSignUp] = useState(false);
  // This conditional checks if a props.location.state.renderLogin prop is passed from any page
  // If this is the case the login will be set to true by default
  const [login, setLogin] = useState(props.location.state ? true : false);

  let handleSignUpPopUp = () => {
    if (!signup) {
      setSignUp(true);
    } else {
      setSignUp(false);
    }
  };

  let handleLoginPopUp = () => {
    if (!login) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div className="landingPageWrapper">
      <Container>
        <div className="landingLogoDescWrapper" align="center">
          <img src={logo} width="300px" alt={logo} />
          <Typography
            variant="h6"
            gutterBottom
            align="center"
            color="secondary"
          >
            Connect with people over topics that excite you
          </Typography>
        </div>
        <div className="landingBtnsWrapper" align="center">
          <Button
            onClick={handleLoginPopUp}
            type="submit"
            variant="outlined"
            color="primary"
          >
            Login
          </Button>
          <Button
            onClick={handleSignUpPopUp}
            type="submit"
            variant="outlined"
            color="primary"
          >
            Sign Up
          </Button>
        </div>
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
      )}{" "}
      {messageType === "success" ? (
        <FlashMessage trigger={trigger} messageType={messageType}>
          {success}
        </FlashMessage>
      ) : (
        <FlashMessage trigger={trigger} messageType={messageType}>
          {error}
        </FlashMessage>
      )}
    </div>
  );
}

export default HomePage;
