import React, {useEffect, useState} from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import { createTheme, Paper, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import API_URL from './config';
import SignupCategoryPage from "./pages/SignupCategoryPage";
import SignupGroupPage from "./pages/SignupGroupPage";
import ExploreGroupPage from "./pages/ExploreGroupPage";
import HomePage from "./pages/HomePage";
import GroupPage from "./pages/GroupPage";
import FlashMessage from "./components/FlashMessage";
import UserPage from './pages/UserPage';
import UserContext from './contexts/UserContext';
import PeoplePage from "./pages/PeoplePage";
import FriendsPage from "./pages/FriendsPage";
import ChatPage from './pages/ChatPage'
import EventPage from "./pages/EventPage";
import NotFound from './pages/NotFound';
import Animation from './components/Animation'
import loading from './json/loading.json';
import defaultTheme from "./contexts/DefaultTheme";
import darkTheme from "./contexts/DarkTheme";
import VideoChatPage from "./pages/VideoChatPage";
import AysPage from "./pages/AysPage";


function App() {
  const [user, setUser] = useState(null)
  const [fetchingUser, setFetchingUser] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [snackbar, setSnackbar] = useState('success')
  const [randomNumber, setRandomNumber] = useState(0)
  const [showDarkTheme, setShowDarkTheme] = useState(false)

  let history = useHistory(); 

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
      await setUser(response.data.userData);
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
      console.log(response)
        setSnackbar('success')
        setRandomNumber(Math.random()*100)  
        setSuccessMessage(response.data.successMessage)
        await setUser(response.data.userData)      
        history.push('/signup/category')
    }
    catch (error) {
        setSnackbar('error') 
        setRandomNumber(Math.random()*100)
        setErrorMessage(error.response.data.errorMessage)
    }
  }

  const handleUpdatUserState = (userData) => {
    setUser(userData)
  }

  const handleUpdateUser = async (userData) => {
    try {
      let response = await axios.post(`${API_URL}/api/user`, userData,  {withCredentials: true});
      setUser(response.data.newUser)
    }
    catch(error) {
      setSnackbar('error') 
      setRandomNumber(Math.random()*100)
      setErrorMessage(error.response.data.errorMessage) 
    }
  }

  const handleSuccessMessage = (success) => {
    setSnackbar('success')
    setRandomNumber(Math.random()*100)  
    setSuccessMessage(success)
  }

  const handleErrorMessage = (error) => {
    setSnackbar('error') 
    setRandomNumber(Math.random()*100)
    setErrorMessage(error)
  }

  const handleLogout = async () => {
    try{
      history.push('/')
      await axios.post(`${API_URL}/api/auth/logout`, {}, {withCredentials: true})
      setUser(null) 
    } catch (error) {
      handleErrorMessage(`Oops, looks like you're stuck here buddy!`)
    }
  }

  const handleChangeThemeColor = () => {
    setShowDarkTheme(prevShowDarkThem => !prevShowDarkThem)
  }

  if (fetchingUser) {
    return  <Animation width={300} height={300} animation={loading} />
  }
  console.log(showDarkTheme)


  return (
    <div>
      <ThemeProvider theme={showDarkTheme ? darkTheme : defaultTheme}>
        <UserContext.Provider value={{user, onUpdateUser: handleUpdateUser, onUpdateUserState: handleUpdatUserState, onLogout: handleLogout, onChangeThemeColor: handleChangeThemeColor, showDarkTheme: showDarkTheme}}>
          <Switch>
            <Route exact path={'/'} render={(routeProps) => {
              return <LandingPage {...routeProps} trigger={randomNumber} messageType={snackbar} success={successMessage} error={errorMessage} onLogin={handleLogin} onSignUp={handleSignUp}/>
            }}/>
            <Route path={'/signup/category'} render={(routeProps) => {
              return <SignupCategoryPage {...routeProps}/>
            }}/>
            <Route path={'/signup/group'} render={(routeProps) => {
              return <SignupGroupPage {...routeProps}/>
            }}/>
            <Route path={'/home'} render={(routeProps) => {
              return <HomePage {...routeProps} />
            }}/>
            <Route path={'/explore'} render={(routeProps) => {
              return <ExploreGroupPage {...routeProps} onError={handleErrorMessage} onSuccess={handleSuccessMessage}/>
            }}/>
            <Route exact path={'/profile/:userId'} render={(routeProps) => {
              return <UserPage {...routeProps} onError={handleErrorMessage} onSuccess={handleSuccessMessage}/>
            }}/>
            <Route exact path={'/events'} render={(routeProps) => {
              return <EventPage {...routeProps}/>
            }}/>
            <Route path={'/people'} render={(routeProps) => {
              return <PeoplePage {...routeProps} onUpdateUser={handleUpdateUser} onError={handleErrorMessage} onSuccess={handleSuccessMessage} user={user}/>
            }}/>
            <Route path={'/friends'} render={(routeProps) => {
              return <FriendsPage {...routeProps} onUpdateUser={handleUpdateUser} onError={handleErrorMessage} onSuccess={handleSuccessMessage} user={user}/>
            }}/>
            <Route path={'/group/:group'} render={(routeProps) => {
              return <GroupPage {...routeProps} />
            }}/>
            <Route exact path={'/chat/:chatId'} render={(routeProps) => {
              return <ChatPage user={user} {...routeProps} />
            }}/>
            <Route path={'/face-lab'} render={(routeProps) => {
              return <VideoChatPage {...routeProps} username={user.username}/>
            }}/>
            <Route path={'/ays'} render={(routeProps) => {
              return <AysPage {...routeProps} />
            }}/>

            <Route component={NotFound} />
          </Switch>
          {
           snackbar === 'success' ? <FlashMessage trigger={randomNumber} messageType={snackbar}>{successMessage}</FlashMessage> : <FlashMessage trigger={randomNumber} messageType={snackbar}>{errorMessage}</FlashMessage> 
          }
        </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;