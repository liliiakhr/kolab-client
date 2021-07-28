import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../contexts/UserContext';
import Navbar from '../components/Navbar';
import {Container, Grid } from '@material-ui/core';
import ProfileInfo from '../components/ProfileInfo';
import UpdateProfile from '../components/UpdateProfile';
import axios from 'axios';
import API_URL from "../config";
import PostCard from '../components/PostCard';

function UserPage({match, onError, onSuccess}) {
    const {user, onUpdateUser} = useContext(UserContext);
    const [editProfile, setEditProfile] = useState(false);
    const [profile, setProfile] = useState(null)
    const [requested, setRequested] = useState(false)
    const [friends, setFriends] = useState(false)

    const urlId = match.params.userId;
    const isLoggedInUser = (user._id === urlId);

    useEffect(() => {
        let getUser = async() => {
           try {
            let response = await axios.get(`${API_URL}/api/profile/${urlId}`, {withCredentials: true})
            console.log(response.data)
            setProfile(response.data)  
        }
        catch(error) {
            console.log(error)
        } 
        }
        getUser() 


    }, [urlId, user]);
   
    useEffect(() => {
       if(profile && profile.friends.includes(user._id)){
            setFriends(true)
        } else if (profile && profile.friendRequests.includes(user._id)){
            setRequested(true)
        }  
    }, [user._id, profile])


    const handleSendRequest = async () => {
        let userData = {userId: profile._id}
        try {
            let response = await axios.post(`${API_URL}/api/friend/request`, userData,{withCredentials: true})
            onSuccess(response.data.successMessage) 
            setRequested(true)  
        }
        catch(error) {
            onError(error.response.data.errorMessage)
        }
    }

    const handleUnfriendRequest = async () => {
        let userData = {userId: profile._id}
        try {
            let response = await axios.post(`${API_URL}/api/friend/unfriend`, userData, {withCredentials: true})
            console.log(response.data)
            onSuccess(response.data.successMessage) 
            onUpdateUser(response.data.user)
            setFriends(false)  
        }
        catch(error) {
            onError(error.response.data.errorMessage)
        }
    }

    const handleEditProfile = async (event) => {
        event.preventDefault();
        const {username, description, email} = event.target;
        let imgData = {}
        
    
        try{

            if (event.target.imageUrl.files[0]){
                let formData = new FormData();
                formData.append('imageUrl', event.target.imageUrl.files[0]);
                let imgResponse = await axios.post(`${API_URL}/api/upload`, formData);
                imgData = {
                    image_url: imgResponse.data.image_url
                }
            }
        
            
            let newUserData = {
                username: username.value,
                description: description.value, 
                email: email.value,
                ...imgData
            }

            await onUpdateUser({
                ...user, 
                ...newUserData
            })


            handleEditProfilePopUp()

            // let response = await axios.get
        }
        catch(error) {
            console.log(error)
        }
        // onUpdateUser({...user, username:"Cool"});
    }

    const handleEditProfilePopUp = (() => {
        console.log("Popup!");
        setEditProfile(!editProfile);
    })


    return ( 
        <div>

        
        <Navbar user={user} onUpdateUser={onUpdateUser}>
            <Container>    

                <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        alignContent="center"
                        spacing={4}
                    >

                    <Grid item xs={12} sm={7}>
                        <div>
                            {profile && <ProfileInfo profile={profile} 
                            onEditProfilePopUp = {handleEditProfilePopUp} 
                            isLoggedInUser={isLoggedInUser} 
                            requested={requested} 
                            friends={friends} 
                            onUnfriend={handleUnfriendRequest} 
                            onFriend={handleSendRequest}/>}
                        </div>
                    </Grid> 

                {
                    profile && profile.posts.map((post, index)=> {
                        return (
                            <Grid item xs={12} sm={6} key={index} style={{ display: "flex", justifyContent: "center"}} >
                                <div className={index % 2 === 0 ? 'fly-left' : 'fly-right'}>
                                    <PostCard user={profile} postData={post} index={index} />
                                </div>  
                            </Grid>
                        )})
                }

                    
                </Grid>
            </Container>
        </Navbar> {
            editProfile && (
                <div className="popupOpacity">  
                    <UpdateProfile  onEditProfile = {handleEditProfile} onEditProfilePopUp = {handleEditProfilePopUp}/>
                </div>
                )
        }
        
    </div>
    )   
}

export default UserPage
