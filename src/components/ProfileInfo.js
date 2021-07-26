import React, {useContext} from 'react';
import UserContext from '../contexts/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, CardActions, Card, CardMedia, CardContent, Container } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import avatarImg from "../assets/images/avatar.png"


function ProfileInfo({isLoggedInUser}) {
    const {user, onUpdateUser} = useContext(UserContext);

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

    const changeName = (() => {
        onUpdateUser({...user, username:"Kalande"});
    })

    return (
        <Card className={classes.root} >
        <Avatar className={classes.large} alt="User avatar" src={avatarImg} />
        <CardContent>
            <Typography variant="subtitle1">{user.username}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {user.description}
            </Typography>
            {
                user.groups.map((group)=> {
                    return <Chip label= {group.name} />
                })
            }
        </CardContent>
        <CardActions style={{display: "flex", justifyContent: "space-between"}}>
            {isLoggedInUser && <Button onClick = {changeName}>Edit your profile</Button>}
        </CardActions>
    </Card>

    )
}

export default ProfileInfo
