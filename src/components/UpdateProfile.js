import React, {useContext, useState} from 'react';
import { Container } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import UserContext from '../contexts/UserContext';


function UpdateProfile(props) {
    const {user, onUpdateUser} = useContext(UserContext);


    return (
        <div style={{
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '5px'
        }}>        
        <Container maxWidth="xs"> 
        <Typography variant='h4' style={{marginTop: '10%'}}>Update my profile <IconButton onClick={props.onEditProfilePopUp} > <CloseIcon/>
            </IconButton> </Typography>      
            <form encType="multipart/form-data" style={{display: 'flex', flexDirection: 'column'}} onSubmit={props.onEditProfile} noValidate>
                <TextField  variant="filled" label="Username" type="text" name="username" defaultValue={user.username}></TextField>
{/*                 <TextField placeholder="Password" variant="filled" label="Password" type="password" name="password"></TextField> */}
                <TextField 
                    label="Description"
//                     placeholder={user.description}
                    name="description"
                    multiline
                    rows={4}
                    maxRows={10}
                    variant="filled"
                    style={{marginBottom: '10%'}}
                    defaultValue={user.description}
                    >
                </TextField>
                <input className="cloudinary-btn" type="file" name="imageUrl" accept="image/png, image/jpg"/>                  
                <Button style={{marginBottom: '10%'}} type="submit" variant="contained" color="primary">Update my profile</Button>
            </form>            
        </Container>
        </div>
    )
}

export default UpdateProfile
