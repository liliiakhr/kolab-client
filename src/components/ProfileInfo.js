import React, {useContext, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, CardActions, Card, Grid, CardMedia, CardContent, Container } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import avatarImg from "../assets/images/avatar.png"




function ProfileInfo(props) {

    const {isLoggedInUser, onEditProfilePopUp, profile} = props;
    

    const useStyles = makeStyles((theme) => ({
        root: {
          maxWidth: 700,
        },
        media: {
          height: 0,
          paddingTop: '33%', // 16:9
        },
        large: {
            width: theme.spacing(17),
            height: theme.spacing(17),
          },
      }));
  
    const classes = useStyles();
    console.log(profile)


    return (
        
        <Card className={classes.root} >
        <Avatar className={classes.large} alt="User avatar" src={profile.image_url} />
        <CardContent>
            <Typography variant="subtitle1">{profile.username}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {profile.description}
            </Typography>
        </CardContent>
        <CardActions style={{display: "flex", justifyContent: "space-between"}}>
            {isLoggedInUser && <Button onClick = {onEditProfilePopUp}>Edit your profile</Button>}
            {!isLoggedInUser && <Button>Add friend</Button>}
        </CardActions>
    </Card>

    )
}

export default ProfileInfo
