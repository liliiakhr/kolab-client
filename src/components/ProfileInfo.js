import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, CardActions, Card, Grid, CardMedia, CardContent, Container } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import avatarImg from "../assets/images/avatar.png";
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box';

function ProfileInfo(props) {

    const {isLoggedInUser, onEditProfilePopUp, profile, requested, friends, onFriend, onUnfriend} = props;
    

    const useStyles = makeStyles((theme) => ({
        root: {
          maxWidth: 700,
        },
        media: {
          height: 0,
          paddingTop: '33%', // 16:9
        },
        large: {
            width: theme.spacing(25),
            height: theme.spacing(25),
          },
      }));
  
    const classes = useStyles();


    return (
        
      <Card className={classes.root} id="user-card" >
        <Avatar className={classes.large} id="user-avatar" alt="User avatar" src={profile.image_url} />

        <CardContent>
            <Typography id="user-username" variant="subtitle1">{profile.username}</Typography>
            <Typography id="user-desc" variant="body2" color="textSecondary" component="p">
            {profile.description}
            </Typography>
        </CardContent>
        <CardActions style={{display: "flex", justifyContent: "space-between"}}>
            {isLoggedInUser && <Button id="profile-btn" onClick = {onEditProfilePopUp}>Edit your profile</Button>}
            {!isLoggedInUser && !friends && !requested && <Button onClick={onFriend}>Add friend</Button>}
            {!isLoggedInUser && !friends && requested && <Button><DoneIcon /> Requested</Button>}
            {!isLoggedInUser && friends && !requested && <Button onClick={onUnfriend}> Unfriend </Button>}
        </CardActions>

      </Card>

    )
}

export default ProfileInfo
