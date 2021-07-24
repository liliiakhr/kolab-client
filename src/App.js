import React, {useEffect, useState} from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import LandingPage from './pages/LandingPage'
import { createTheme, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import API_URL from './config';
import SignupCategoryPage from "./pages/SignupCategoryPage";
import SignupGroupPage from "./pages/SignupGroupPage";
import ExploreGroupPage from "./pages/ExploreGroupPage";
import HomePage from "./pages/HomePage";

export const UserContext = React.createContext()

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
  const [ fetchingUser, setFetchingUser ] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [snackbar, setSnackbar] = useState('success')
  const [randomNumber, setRandomNumber] = useState(0)
  let history = useHistory(); 
  
  console.log("APP.JS user:", user)

  useEffect(() => {
     (async () => {
          try {
            let response = await axios.get(`${API_URL}/api/user`, {withCredentials: true})
            setUser(response.data)
            setFetchingUser(false);
          }
          catch(error) {
            setFetchingUser(false);
          }
     })()
  }, [])

  
  const handleLogin = async (event) => {
    event.preventDefault();
    const { username, password} = event.target;

    let myUser = {
      username: username.value,
      password: password.value
    }

    try {
      let response = await axios.post(`${API_URL}/api/auth/login`, myUser, {withCredentials: true});
      setSnackbar('success')
      setRandomNumber(Math.random()*100)  
      setSuccessMessage(response.data.successMessage)
      setUser(response.data.userData);
      history.push('/home')
    }
    catch(err){
      setSnackbar('error') 
      setRandomNumber(Math.random()*100)
      setErrorMessage(err.response.data.errorMessage)
    }
  }
  
  const handleSignUp = async (event) => {
    event.preventDefault()
    
    try{
      const {username, email, password} = event.target
      let newUser = {
          username: username.value,
          email: email.value,
          password: password.value
      } 

      let response = await axios.post(`${API_URL}/api/auth/signup`, newUser, {withCredentials: true})
        setSnackbar('success')
        setRandomNumber(Math.random()*100)  
        setSuccessMessage(response.data.successMessage)
        setUser(response.data.userData) 
             
        history.push('/signup/category')
    }
    catch (error) {
        setSnackbar('error') 
        setRandomNumber(Math.random()*100)
        setErrorMessage(error.response.data.errorMessage)
    }
  }

  const handleUpdateUser = async (userData) => {
    try {
      let response = await axios.post(`${API_URL}/api/user`, userData,  {withCredentials: true});
      setUser(response.data.newUser)
      console.log(" I RUN ")
    }
    catch(error) {
      // TO DO: SNACKBAR MESSAGE 
    }
  }

  if (fetchingUser) {
    return <h1>Loading . . .</h1>
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={user}>
          <Switch>
            <Route exact path={'/'} render={(routeProps) => {
              return <LandingPage {...routeProps} trigger={randomNumber} messageType={snackbar} success={successMessage} error={errorMessage} onLogin={handleLogin} onSignUp={handleSignUp}/>
            }}/>
            <Route path={'/signup/category'} render={(routeProps) => {
              return <SignupCategoryPage onUpdateUser={handleUpdateUser} {...routeProps}/>
            }}/>
            <Route path={'/signup/group'} render={(routeProps) => {
              return <SignupGroupPage {...routeProps}/>
            }}/>
            <Route path={'/home'} render={(routeProps) => {
              return <HomePage {...routeProps} onUpdateUser={handleUpdateUser}/>
            }}/>
            <Route path={'/explore'} render={(routeProps) => {
              return <ExploreGroupPage {...routeProps} onUpdateUser={handleUpdateUser}/>
            }}/>
          </Switch>
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
