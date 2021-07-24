import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import API_URL from "../config"
import { Typography, Button, ButtonGroup } from '@material-ui/core';
import NavBar from '../components/Navbar';
import AddPost from '../components/AddPost';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';


function GroupPage({user, onUpdateUser, match: {params}}) {

    const [group, setGroup] = useState(null);
    const [posts, setPosts] = useState([]);
    const [showAddPost, setShowAddPost] = useState(false);

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
    }, [])

    useEffect(() => {
        (async () => {
            try {
                let groupInfo = {
                    id: group._id
                }
                let response = await axios.post(`${API_URL}/api/posts`, groupInfo, {withCredentials: true})
                setPosts(response.data)
            }
            catch(error) {
                console.log("Something went wrong while getting the posts // maybe none exist", error)
                setPosts([])
            }
       })()
    }, [group, user])


    if (!user) {
        return <Redirect to={{
            pathname: "/",
            state: { renderLogin: true }
        }} />
    }

    const handleCloseAddPost = () => {
        setShowAddPost(false);
    }

    const handleAddPost = async (event) => {
        console.log("Handle Add Post before update", user.posts.length)
        event.preventDefault();
        try {
            let newPost = {
                title: event.target.title.value,
                content: event.target.content.value,
                creator: user._id,
                groupOrigin: group._id
            }
            let response = await axios.post(`${API_URL}/api/${params.group}/add-post`, newPost, {withCredentials: true})
            user.posts.push(response.data._id)
            onUpdateUser(user)
            setShowAddPost(false)
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
        }
        catch(error) {
            console.log(error)
        }
    }

    if (!group) {
        return <h1>Loading . . .</h1>
    }

    return (
        <>
            <NavBar onUpdateUser={onUpdateUser} showDrawer>
                    <Typography variant="h2">{group.name}</Typography>
                    <Typography variant="subtitle1">{group.description}</Typography>
                    <ButtonGroup variant="contained" color="secondary">
                        {
                            (!group.users.includes(user._id)) &&
                            <Button startIcon={<AccessibilityNewIcon />} onClick={handleJoinGroup}>Join</Button>
                        }
                        <Button startIcon={<AddIcon />} onClick={() => {setShowAddPost(true)}}> Create Post</Button>
                        <Button startIcon={<SettingsIcon />}>Manage Group</Button>
                        <Button startIcon={<ExitToAppIcon />}>Leave</Button>
                    </ButtonGroup>
                    {   
                        !showAddPost && 
                        posts.map((post, index) => {
                            return (
                                <>
                                    <h1>{`${post.title}`}</h1> 
                                    <h5>{`Created by: ${post.creator.username}`}</h5>
                                    <p>{`${post.content}`}</p>
                                </>
                            )
                        })
                    }
            </NavBar>
            {showAddPost && (
                <div className="popupOpacity">
                    <AddPost onCloseAddPost={handleCloseAddPost} onAddPost={handleAddPost}/>
                </div>
            )}
        </>
    )
}

export default GroupPage
