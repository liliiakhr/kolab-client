import Navbar from '../components/Navbar';
import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Grid, Tooltip } from '@material-ui/core';
import API_URL from "../config"
import axios from 'axios';
import Pagination from '../components/Pagination';
import UserCard from '../components/UserCard';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import IconButton from '@material-ui/core/IconButton';
import NotificationsPausedIcon from '@material-ui/icons/NotificationsPaused';
import Badge from '@material-ui/core/Badge';
import NotificationBoard from '../components/NotificationBoard';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import RefreshIcon from '@material-ui/icons/Refresh';
import Animation from '../components/Animation';
import loading from '../json/loading.json';
import UserContext from '../contexts/UserContext';
import './FriendsPage.css'
import FriendAnimation from '../json/friend.json'


const useStyles = makeStyles((theme) => ({
    root: {
      width: '96%',
      maxWidth: '800px',
      height: '80%',
      backgroundColor: theme.palette.background.paper,
      overflowY: 'scroll'
    }
  }));

function FriendsPage({user, onUpdateUser, onSuccess, onError, history}) {
    const classes = useStyles();

    const [users, setUsers] = useState(null)
    const [requests, setRequests] = useState(null)
    const [notificationPopUp, setNotificationsPopup] = useState(false)
    const [updatedUser, setUpdatedUser] = useState(null)
    const [responded, setResponded] = useState([])
    const {showDarkTheme, onUpdateUserState} = useContext(UserContext);
    const [showFriendAnimation, setShowFriendAnimation] = useState(false);



    useEffect(() => {
        let getUsers = async () => {
            let response = await axios.post(`${API_URL}/api/getFriends`,{},{withCredentials: true})
            setUsers(response.data.friends)
            setRequests(response.data.friendRequests)
            setUpdatedUser(response.data)
        }
        getUsers()
    }, [user])

    const handleNotificationToggle = () => {
       setNotificationsPopup(!notificationPopUp)
    }

    const handleResponse = async (response, userId) => {
        let request = {response, userId}
        try{
         let res = await axios.post(`${API_URL}/api/friend/response`, request, {withCredentials: true})
         onUpdateUserState(res.data.userData)
         setUpdatedUser(res.data.userData)
         onSuccess(res.data.successMessage) 
         setResponded([...responded, userId])  
         temporaryShowAnimation(setShowFriendAnimation, 3700)
        } catch(error){
           onError(error.response.data.errorMessage)
        }
    }

    const handleRefresh = async () => {
        await onUpdateUser(updatedUser)
    }

    const temporaryShowAnimation = (animationFunction, duration) => {
        animationFunction(true)
        console.log(showFriendAnimation)
        setTimeout(() => {
            animationFunction(false)
        }, duration);
    }
    console.log(showFriendAnimation)

    if(!users){
        return <Animation width={300} height={300} animation={loading} />
    }

    return (
        <div>
            {!notificationPopUp && (
            <Navbar user={user} onUpdateUser={onUpdateUser} > 
            <Tooltip title="Friend Requests">
            <IconButton onClick={handleNotificationToggle}>
                <div className="notification-btn">
                <Badge color="secondary" badgeContent={requests ? requests.length : 0}>
                {
                  requests ? <NotificationsActiveIcon style={{color: 'white', width: '40px', height: '40px'}}/> : <NotificationsPausedIcon style={{color: 'white', width: '40px', height: '40px'}}/>
                }
                </Badge>
                </div>
                </IconButton>
                </Tooltip>             
                <Container style={{ marginTop: "-20px"}} >
                    <div className="friends fly-top" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
                        <Typography variant="h3" gutterBottom align="center" color={showDarkTheme ? 'inherit' : 'primary'} style={{marginBottom: "50px"}}>
                            Friends
                            <IconButton onClick={handleRefresh}>
                                <div style={{color: 'white', width: '40px', height: '40px', backgroundColor: '#55ABB1',display: 'flex', alignItems: 'center',justifyContent: 'center', borderRadius: '50%' }}>
                                <RefreshIcon />
                                </div>
                            </IconButton> 
                        </Typography>
                    </div>
                    <Grid   container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    spacing={4}
                    >
                    {
                       users.map((user, i) => {
                           let username = user.username[0].toUpperCase() + user.username.slice(1, user.username.length)
                           return(
                            <Grid item xs={12} sm={6} key={i}>
                            <div className={i % 2 === 0 ? 'fly-left' : 'fly-right'}>
                                    <UserCard history={history} key={i} categories={user.categories} image_url={user.image_url} id={user._id} username={username} description={user.description}/>
                                </div>
                            </Grid>                            
                           )
                       }) 
                    }
                    </Grid>
                    {/* <Pagination data={groups} RenderComponent={GroupCard} dataLimit={10}/> */}
                </Container> 
            </Navbar>)}
           {
            notificationPopUp && (
                    <div className="popupOpacity"> 
                    
                    <Container maxWidth="md">
                    <div className='closeIcon'>  
                    <IconButton onClick={handleNotificationToggle} style={{marginLeft: '50px'}} >
                       <CloseIcon />
                    </IconButton>
                    </div>
                    <div className='friendRequests'> 
                    <Typography variant='h2' color='primary' className='req-title' style={{marginTop: '20px'}}>
                        Friend Requests 
                    </Typography>
                    <Divider  component='li' className="divider"/>
                    <List className={classes.root}>
                    {
                        requests.map((person, i) => {
                            return <NotificationBoard
                            key={i} 
                            onSendResponse={handleResponse} 
                            loggedusername={user.username} 
                            username={person.username} 
                            image_url={person.image_url} 
                            description={person.description} 
                            id={person._id}
                            responded={responded}/>
                        })
                    } 
                    {
                        showFriendAnimation &&
                        (
                            <div style={{display: "flex", justifyContent:"center"}}> 
                                <Animation width={500} height={500} animation={FriendAnimation} />
                            </div>
                        )
                    }
                     </List>
                     </div>  
                     </Container>  
                    </div>
                    )
                }
        </div>
    )
}

export default FriendsPage