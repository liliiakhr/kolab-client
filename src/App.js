import React, {useEffect, useState} from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './pages/LandingPage'
import { createTheme, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import API_URL from './config';
import { EnhancedEncryptionTwoTone } from "@material-ui/icons";
import SignupCategoryPage from "./pages/SignupCategoryPage";
import SignupGroupPage from "./pages/SignupGroupPage";
import FlashMessage from "./components/FlashMessage";
import ExploreGroupPage from "./pages/ExploreGroupPage";
import HomePage from "./pages/HomePage";



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


function App() {

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [snackbar, setSnackbar] = useState(null)


  useEffect(() => {
     (async () => {
         let response = await axios.get(`${API_URL}/api/user`, {withCredentials: true})
         setUser(response.data)
     })
     ()
  },[])

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
      setSuccessMessage(response.data.successMessage)
      setUser(response.data.userData);
      history.push('/home')
    }
    catch(err){
      setErrorMessage(err.response.data.errorMessage)
    }

  }
  
  let handleSignUp = async (event) => {
    const {username, email, password} = event.target

    let newUser = {
        username: username.value,
        email: email.value,
        password: password.value
    } 
    try{
    let response = await axios.post(`${API_URL}/api/signup`, newUser, {withCredentials: true})
        setSuccessMessage(response.data.successMessage)
        setUser(response.data.userData)        
        history.push('/signup/category')
    }
    catch (error) {
        setErrorMessage(error.response.data.errorMessage)
    }
  }

  useEffect(() => {
     setSnackbar('success')
  }, [successMessage])
  useEffect(() => {
    setSnackbar('error')
  }, [errorMessage])

  return (
    <div>
    <ThemeProvider theme={theme}>
    
      <Switch>
        <Route exact path={'/'} render={() => {
          return <LandingPage onLogin={handleLogin} onSignUp={handleSignUp}/>
        }}/>
        {/* <Route path={'/login'} render={(routeProps) => {
          return <Login onLogin={handleLogin} {...routeProps} />
        }}/>
        <Route exact path={'/signup'} render={(routeProps) => {
          return <Signup {...routeProps} onSignUp={handleSignUp}/>
        }}/> */}
        <Route path={'/signup/category'} render={(routeProps) => {
          return <SignupCategoryPage {...routeProps}/>
        }}/>
        <Route path={'/signup/group'} render={(routeProps) => {
          return <SignupGroupPage {...routeProps}/>
        }}/>
        <Route path={'/home'} render={(routeProps) => {
          return <HomePage {...routeProps}/>
        }}/>
        <Route path={'/explore'} render={(routeProps) => {
          return <ExploreGroupPage {...routeProps}/>
        }}/>
      </Switch>
      {/* {
        snackbar === 'success' ? <FlashMessage messageType={snackbar}>{successMessage}</FlashMessage> : <FlashMessage messageType={snackbar}>{errorMessage}</FlashMessage> 
      } */}
      </ThemeProvider>
    </div>
  );
}

export default App;
