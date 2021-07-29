import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { Redirect } from 'react-router';
import axios from 'axios';
import API_URL from "../config"
import { Typography, Button, ButtonGroup, Container, Grid } from '@material-ui/core';
import NavBar from '../components/Navbar';
import AddPost from '../components/AddPost';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import EditGroup from '../components/EditGroup';
import FlashMessage from '../components/FlashMessage';
import PostCard from '../components/PostCard';
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded';
import AddEvent from '../components/AddEvent';
import EventCard from '../components/EventCard';
import moment from 'moment';
import Animation from '../components/Animation'
import loading from '../json/loading.json';

function GroupPage({ match: {params}}) {

    const [group, setGroup] = useState(null);
    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);
    const [showAddPost, setShowAddPost] = useState(false);
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [showEditGroup, setShowEditGroup] = useState(false);
    const [navBarChanged, setNavBarChanged] = useState(false);
    const {user, onUpdateUser} = useContext(UserContext);
    const [showFlashMessage, setShowFlashMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null)
    const [snackbar, setSnackbar] = useState(null)

    useEffect(() => {
        if (!user) {
            return <Redirect to={{
                pathname: "/",
                state: { renderLogin: true }
            }} />
        }
    }, [user])
    
    useEffect(() => {
        (async () => {
            try {
                let response = await axios.get(`${API_URL}/api/${params.group}`, {withCredentials: true})
                setGroup(response.data)
            }
            catch(error) {
                console.log(error)
                return <Redirect to={{
                    pathname: "/home",
                }} />
            }
        })()
    }, [navBarChanged])
    
    useEffect(() => {
        (async () => {
            try {
                let groupInfo = {
                    id: group._id
                }

                let currentDate = new Date();
                currentDate = moment(currentDate).format().slice(0, 10);   // Creates date in format YYYY-MM-DD 

                let postResponse = await axios.post(`${API_URL}/api/posts`, groupInfo, {withCredentials: true})
                let eventResponse = await axios.get(`${API_URL}/api/events/${group._id}/${currentDate}`, {withCredentials: true})
                let postData = postResponse.data.sort((a, b) => {
                    if (a.createdAt < b.createdAt) {
                        return 1
                    }
                    else if (a.createdAt > b.createdAt) {
                        return -1
                    }
                    else {
                        return 0
                    } 
                }) 
                setPosts(postData)
                setEvents(eventResponse.data)
            }
            catch(error) {
                console.log("Something went wrong while getting the posts // maybe none exist", error)
                setPosts([])
            }
        })()
    }, [group])
    
    const handleCloseAddPost = () => {
        setShowAddPost(false);
    }

    const handleCloseAddEvent = () => {
        setShowAddEvent(false);
    }

    const handleCloseEditGroup = () => {
        setShowEditGroup(false);
    }

    const handleAddPost = async (event) => {
        event.preventDefault();
        
        if (!event.target.title.value || !event.target.content.value) {
            setSuccessMessage('Please fill in a title and share your message');
            setSnackbar('error');
            setShowFlashMessage(Math.random()*100);
            return 0 
        }

        try {
            let imgResponse = '' 
            if (event.target.imageUrl.value) {
                var formData = new FormData();
                formData.append('imageUrl', event.target.imageUrl.files[0]);
                imgResponse = await axios.post(`${API_URL}/api/upload`, formData);
            }
            
            let newPost = {
                title: event.target.title.value,
                content: event.target.content.value,
                creator: user._id,
                groupOrigin: group._id,
                image_url: imgResponse.data ? imgResponse.data.image_url : '' 
            }
            
            let response = await axios.post(`${API_URL}/api/${params.group}/add-post`, newPost, {withCredentials: true})
            user.posts.push(response.data._id)
            let createdPost = response.data;
            createdPost.creator = user;
            setPosts([createdPost, ...posts])
            onUpdateUser(user)
            setShowAddPost(false)
            setSuccessMessage('Awesome! New post has been added.')
            setSnackbar('success');
            setShowFlashMessage(Math.random()*100)
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleAddEvent = async (event) => {
        event.preventDefault();
        const { name, description, start, end, imageUrl } = event.target
        console.log("I RUN 1")
        
        if (!name.value || !description.value || !start.value || !end.value || !imageUrl.value) {
            setSuccessMessage('Please fill in all the fields...');
            setSnackbar('error');
            setShowFlashMessage(Math.random()*100);
            return 0 
        }
        console.log("I RUN 2")
        
        if (end.value < start.value) {
            setSuccessMessage('So time goes backward for you! This is not inception...');
            setSnackbar('error');
            setShowFlashMessage(Math.random()*100);
        }
        console.log("I RUN 3")
        
        let currentDate = new Date();
        currentDate = moment(currentDate).format().slice(0, 10);   // Creates date in format YYYY-MM-DD 
        
        if (start.value.slice(0, 10) < currentDate) {
            setSuccessMessage('This event starts in the past... This is not Back to the Future');
            setSnackbar('error');
            setShowFlashMessage(Math.random()*100);
        }
        
        try {
            var formData = new FormData();
            formData.append('imageUrl', event.target.imageUrl.files[0]);
            let imgResponse = await axios.post(`${API_URL}/api/upload`, formData);
            console.log("I RUN 4")
            
            let newEvent = {
                name: name.value,
                description: description.value,
                image_url: imgResponse.data.image_url,
                start: start.value,
                end: end.value,
                creator: user._id,
                groupOrigin: group._id,
                users: [user._id]
            }
            
            let response = await axios.post(`${API_URL}/api/event/add-event`, newEvent, {withCredentials: true})
            console.log("I RUN 5")
            setEvents([...events, response.data])
            setShowAddEvent(false)
            // setSuccessMessage('Awesome! New post has been added.')
            // setSnackbar('success');
            // setShowFlashMessage(Math.random()*100)
        }
        catch(error) {
            console.log(error)
        }
    }

    // When the group name is updated the UserModel.groupNames is not updated
    // It's probably best to get rid off this value
    // It's probably best to use the embedding technique only when values will never change
    // The option is to make the query in the navbar for the names of the user or update all the UserModel.groupNames in the function below
    // The first option is less writes to the database
    const handleEditGroup = async (event) => {
        event.preventDefault();

        if (!event.target.name.value || !event.target.description.value) {
            setSuccessMessage('What is the name of your group? And could you share some info about it?')
            setSnackbar('error');
            setShowFlashMessage(Math.random()*100)
            return 0 
        }

        try {
            const { name, description, tags, category } = event.target;
            let newGroup = {
                ...group,
                name: name.value,
                description: description.value,
                tags: tags.value,
                category: category.value
            }
            let response = await axios.patch(`${API_URL}/api/edit-group`, newGroup, {withCredentials: true})
            setGroup(response.data)
            setShowEditGroup(false)
            setSuccessMessage(`The Owner of ${response.data.name} has spoken.`)
            setSnackbar('success');
            setShowFlashMessage(Math.random()*100)
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleJoinGroup = async () => {
        try {
            let joinInfo = {
                groupId: group._id,
                userId: user._id
            }
            let response =  await axios.post(`${API_URL}/api/join-group`, joinInfo, {withCredentials: true})
            setGroup(response.data)
            user.groupNames.push(group.name)
            user.groups.push(group._id)
            onUpdateUser(user)
            await setSuccessMessage(`Welome to ${group.name}!`)
            await setSnackbar('success');
            await setShowFlashMessage(Math.random()*100)
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleLeaveGroup = async () => {
        try {
            let leaveInfo = {
                groupId: group._id,
                userId: user._id
            }
            let response =  await axios.post(`${API_URL}/api/leave-group`, leaveInfo, {withCredentials: true})
            setGroup(response.data)
            user.groupNames = user.groupNames.filter(oldGroupName => oldGroupName !== group.name) 
            user.groups = user.groups.map(group => group._id)
            user.groups = user.groups.filter(oldGroupId => oldGroupId !== group._id) 
            onUpdateUser(user)
            setSuccessMessage(`The members of ${group.name} will miss you, come back whenever you want!`)
            setSnackbar('success');
            setShowFlashMessage(Math.random()*100)
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleNavBarChange = () => {
        setNavBarChanged(!navBarChanged)
    }

    if (!group) {
            return  <Animation width={300} height={300} animation={loading} />     
    }

    return (
        <>
            <NavBar onNavBarChange={handleNavBarChange} showDrawer>
                <div style={{position: "relative"}}>
                    <div className="group-header-text">
                        <Typography variant="h2">{group.name}</Typography>
                        <Typography variant="subtitle1">{group.description}</Typography>
                    </div>
                    <img src={group.image_url} className="group-header-image"/>
                </div>
                <div style={{marginLeft: "20px"}}>
                <ButtonGroup variant="contained" color="secondary" style={{marginTop: "10px"}}>
                    {
                        (!group.users.includes(user._id)) && (user._id !== group.admin) &&
                        <Button startIcon={<AccessibilityNewIcon />} onClick={handleJoinGroup}>Join</Button>
                    }
                    {
                        ((group.users.includes(user._id)) || user._id === group.admin) &&
                        <Button startIcon={<AddIcon />} onClick={() => {setShowAddPost(true)}}>Post</Button>
                    }
                    {
                        ((group.users.includes(user._id)) || user._id === group.admin) &&
                        <Button startIcon={<EventAvailableRoundedIcon />} onClick={() => {setShowAddEvent(true)}}>Event</Button>
                    }
                    {   
                        (user._id === group.admin) &&
                        <Button startIcon={<SettingsIcon /> } onClick={() => {setShowEditGroup(true)}}>Manage Group</Button>
                    }
                    {
                        (group.users.includes(user._id) && user._id !== group.admin) &&
                        <Button startIcon={<ExitToAppIcon />} onClick={handleLeaveGroup}>Leave</Button>
                    }
                </ButtonGroup>
                <div className="group-page-container">
                    {   
                        (!showAddPost || !showAddEvent) && 
                        <Grid
                        container
                        // spacing={4}
                        style={{marginTop: "20px", marginRight: "30px"}}
                        >
                                {
                                    posts.map((post, index) => {
                                        return (
                                            <Grid item xs={12} sm={12} key={post._id} style={{ display: "flex", marginBottom: "20px"}} >
                                                    <div className={'fly-left'}>
                                                        <PostCard postData={post} index={index} user={user} />
                                                    </div>  
                                            </Grid>
                                            )
                                        })
                                    }
                        </Grid>
                    }
                    {   
                        (!showAddPost || !showAddEvent) && 
                        <Grid
                        container
                        // spacing={4}
                        style={{paddingTop: "20px", display: "flex", justifyContent: "flex-end", height: "500px"}}
                        >
                                {
                                    events.map((event, index) => {
                                        return (
                                            <Grid item xs={12} sm={12} key={event._id} style={{ height: "auto", marginBottom: "20px"}} >
                                                    <div className={'fly-right'}>
                                                        <EventCard eventData={event} index={index} user={user} />
                                                    </div>  
                                            </Grid>
                                            )
                                        })
                                    }
                        </Grid>
                    }
                    </div>
                </div>
            </NavBar>
            {showAddPost && (
                <div className="popupOpacity">
                    <AddPost onCloseAddPost={handleCloseAddPost} onAddPost={handleAddPost}/>
                </div>
            )}
            {showEditGroup && (
                <div className="popupOpacity">
                    <EditGroup onCloseEditGroup={handleCloseEditGroup} onEditGroup={handleEditGroup} group={group}/>
                </div>
            )}
            {showAddEvent && (
                <div className="popupOpacity">
                    <AddEvent onCloseAddEvent={handleCloseAddEvent} onAddEvent={handleAddEvent}/>
                </div>
            )}
            <FlashMessage trigger={showFlashMessage} messageType={snackbar}>{successMessage}</FlashMessage>
        </>
    )
}

export default GroupPage