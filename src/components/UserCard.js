import React, {useContext, useEffect,  useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../assets/images/profile.png'
import Tooltip from '@material-ui/core/Tooltip';
import {Link, useHistory,} from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import API_URL from '../config';


const useStyles = makeStyles((theme) => ({
  root: {
    width: "500px",
    [theme.breakpoints.down('sm')]: {
        width: "345px",
      },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

// const useStyles = makeStyles({
//   root: {
//     width: 400, 
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });


function UserCard({username, description, image_url, id, categories}) {
  let history = useHistory(); 


  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const interests = categories.map(elem => elem[0].toUpperCase() + elem.slice(1,elem.length)).join(', ')
  const {user, onUpdateUser} = useContext(UserContext);


  let handleChat = (async () => {
    try{
      let obj = {participants: [id, user._id]}
      let response = await axios.post(`${API_URL}/api/conversation`, obj, {withCredentials: true})
      console.log(response.data)
      history.push(`/chat/${response.data._id}`)
    }
    
    catch(error) {
      console.log(error)
  }
  })

  return (
    <Card className={classes.root}>
    <Link to={`/profile/${id}`} style={{textDecoration: 'none'}}>
      <CardContent>
        <Avatar alt="Remy Sharp" src={image_url} style={{width: '100px', height: '100px'}}/>
        <Typography variant="h5" component="h2" color='textPrimary'>
          {username}
        </Typography>       
         <Typography className={classes.title} color="textSecondary" gutterBottom>
          {description}
        </Typography>
        <Typography variant="body2" component="p" color='textSecondary'>
          Interests: {interests}
        </Typography>
      </CardContent>
      </Link>
      <Button onClick = {handleChat} variant="contained" color="secondary" type="submit" > <ChatIcon /> </Button>

    </Card>
  );
}

export default UserCard 