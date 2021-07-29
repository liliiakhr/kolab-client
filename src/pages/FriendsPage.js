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


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '800px',
      height: '525px',
      backgroundColor: theme.palette.background.paper,
      overflowY: 'scroll'
    }
  }));

function FriendsPage({user, onUpdateUser, onSuccess, onError, history}) {
    const classes = useStyles();
    console.log(history)

    const [users, setUsers] = useState(null)
    const [requests, setRequests] = useState(null)
    const [notificationPopUp, setNotificationsPopup] = useState(false)
    const [updatedUser, setUpdatedUser] = useState(null)
    const [responded, setResponded] = useState([])
    const {showDarkTheme, onUpdateUserState} = useContext(UserContext);


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
        } catch(error){
           onError(error.response.data.errorMessage)
        }
    }

    const handleRefresh = async () => {
        await onUpdateUser(updatedUser)
    }

    if(!users){
        return <Animation width={300} height={300} animation={loading} />
    }

    return (
        <div>  
            <Navbar user={user} onUpdateUser={onUpdateUser} > 
            <Tooltip title="Friend Requests">
            <IconButton onClick={handleNotificationToggle}>
                <div style={{borderRadius: '50%', width: '100px', height: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#55ABB1'}}>
                <Badge color="secondary" badgeContent={requests ? requests.length : 0}>
                {
                  requests ? <NotificationsActiveIcon style={{color: 'white', width: '40px', height: '40px'}}/> : <NotificationsPausedIcon style={{color: 'white', width: '40px', height: '40px'}}/>
                }
                </Badge>
                </div>
                </IconButton>
                </Tooltip>             
                <Container style={{ marginTop: "-20px"}} >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start"}} className="fly-top">
                        <Typography variant="h3" gutterBottom align="center" color={showDarkTheme ? "inherit" : "primary"} style={{marginBottom: "50px"}}>
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
            </Navbar> 
            {
            notificationPopUp && (
                    <div className="popupOpacity"> 
                    
                    <Container maxWidth="md">
                    <div style={{width: '900px', display: 'flex',justifyContent: 'flex-end'}}>  
                    <IconButton onClick={handleNotificationToggle} style={{marginLeft: '50px'}} >
                       <CloseIcon />
                    </IconButton>
                    </div>
                    <div style={{backgroundColor: 'white', width: '900px', height: '700px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', borderRadius: '10%'}}> 
                    <Typography variant='h2' color='primary' style={{marginTop: '20px'}}>
                        Friend Requests 
                    </Typography>
                    <Divider  component='li' style={{width: '500px'}}/>
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