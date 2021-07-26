import React, {useContext, useState} from 'react';
import UserContext from '../contexts/UserContext';
import Navbar from '../components/Navbar';
import { Button, Container, Grid } from '@material-ui/core';
import ProfileInfo from '../components/ProfileInfo';
import UpdateProfile from '../components/UpdateProfile';
import axios from 'axios';
import API_URL from "../config";

function UserPage(props) {
    const {user, onUpdateUser} = useContext(UserContext);
    const [editProfile, setEditProfile] = useState(false);

    const urlId = props.match.params.id;
    const isLoggedInUser = user.id == urlId;


    const handleEditProfile = async (event) => {
        event.preventDefault();
        const {username, description} = event.target;
        

        let formData = new FormData();
        formData.append('imageUrl', event.target.imageUrl.files[0]);
    
        try{
            let imgResponse = await axios.post(`${API_URL}/api/upload`, formData);
            
            let newUserData = {
                username: username.value,
                description: description.value, 
                image_url: imgResponse.data.image_url,
            }

            onUpdateUser({
                ...user, 
                username: newUserData.username,
                description: newUserData.description, 
                image_url: newUserData.image_url
            })
            console.log(user.id)
            props.history.push(`/profile/${user._id}`);
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
                            <ProfileInfo onEditProfilePopUp = {handleEditProfilePopUp} isLoggedInUser={isLoggedInUser}/>
                            
                        </div>
                    </Grid> 
                </Grid>
            </Container>
        </Navbar> {
            editProfile && (
                <div className="popupOpacity">  
                    <UpdateProfile onEditProfile = {handleEditProfile} onEditProfilePopUp = {handleEditProfilePopUp}/>
                </div>
                )
        }
        
    </div>
    )   
}

export default UserPage
