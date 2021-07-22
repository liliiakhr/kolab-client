import React, {useEffect, useState} from "react";
import { Switch, Route, withRouter, useHistory } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './pages/HomePage'
import { createTheme, Snackbar, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import API_URL from './config';
import { EnhancedEncryptionTwoTone } from "@material-ui/icons";



const theme = createTheme({
  // You get the objects from the documentation
  palette: {
    // ~turquoise
      primary: {
          dark: '#006C7A',
          main: '#55ABB1',
          light: '#E0F7FA',
      },
      // brownish
      secondary: {
        dark: '#543327',
        main: "#6D4031",
        light: "F2E7E3"
      },
    }
  })


function App(props) {

  const [user, updateUser] = useState(null)
  const [errorMessage, updateErrorMessage] = useState(null)
  const [successMessage, updateSuccessMessage] = useState(null)

  let history = useHistory(); 
  
  let handleLogin = async (event) => {
    event.preventDefault();

    console.log("Login works")
    const { username, password} = event.target;

    let myUser = {
      username: username.value,
      password: password.value
    }

    try {
      let response = await axios.post(`${API_URL}/api/login`, myUser, {withCredentials: true});
      updateUser(response.data);
      props.history.push('/home');
    }
    catch(err){
      updateErrorMessage(err.response.data.errorMessage);
    }

  }
  
  let handleSignUp = async (event) => {

    let newUser = {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value
    } 
    try{
      let response = await axios.post(`${API_URL}/api/signup`, newUser, {withCredentials: true})
          updateSuccessMessage(response.data.successMessage)        
          props.history.push('/signup/category')
    }
    catch (error) {
        updateErrorMessage(error.response.data.errorMessage)
    }
  }

  return (
    <div>
    <ThemeProvider theme={theme}>
    
      <Switch>
        <Route exact path={'/'} render={() => {
          return <HomePage user={user}/>
        }}/>
        <Route path={'/login'} render={(routeProps) => {
          return <Login onLogin={handleLogin} {...routeProps} />
        }}/>
        <Route path={'/signup'} render={(routeProps) => {
          return <Signup {...routeProps}/>
        }}/>
      </Switch>
      
      </ThemeProvider>
    </div>
  );
}

export default withRouter(App);
