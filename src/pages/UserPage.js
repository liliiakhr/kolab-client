import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../contexts/UserContext';
import Navbar from '../components/Navbar';
import {Container, Grid } from '@material-ui/core';
import ProfileInfo from '../components/ProfileInfo';
import UpdateProfile from '../components/UpdateProfile';
import axios from 'axios';
import API_URL from "../config";

function UserPage(props) {
    const {user, onUpdateUser} = useContext(UserContext);
    const [editProfile, setEditProfile] = useState(false);
    const [profile, setProfile] = useState(null)

    const urlId = props.match.params.userId;
    const isLoggedInUser = (user._id == urlId);


    useEffect(async () => {
        try {
            let response = await axios.get(`${API_URL}/api/profile/${urlId}`, {withCredentials: true})
            console.log(response.data)
            setProfile(response.data)
            
        }
        catch(error) {
            console.log(error)
        }
       
    }, [urlId]);

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

                    <Grid item xs={12} sm={6}>
                        <div>
                            {profile && <ProfileInfo profile={isLoggedInUser ? user : profile} onEditProfilePopUp = {handleEditProfilePopUp} isLoggedInUser={isLoggedInUser}/>}
                        </div>
                    </Grid> 
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
