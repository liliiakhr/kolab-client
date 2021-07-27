import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import axios from 'axios';
import API_URL from '../config';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    width: 345
  },
  media: {
    height: 140,
  },
});

export default function EventCard({eventData, user}) {
  const classes = useStyles();

  const [event, setEvent] = useState(eventData)

  const handleEventParticipation = async (action) => {
    try {
        let eventInfo = {
            eventId: event._id,
            userId: user._id,
            action
        }

        let newEvent = await axios.post(`${API_URL}/api/event/participate`, eventInfo, {withCredentials: true})
        console.log(newEvent.data)
        setEvent(newEvent.data)
    }
    catch(error) {
        console.log(error)
    }
  }

  console.log("USER IN USERS ARR:", event.users.map(user => user._id).includes(user._id))
  console.log("EVENT:", event)
  console.log("AMOUNT OF USERS:", event.users.length, event.users.length > 0)

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={event.image_url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {event.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
            {event.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            From: {moment(event.start).format('MMM Do YY, h:mm')} to {moment(event.end).format('MMM Do YY, h:mm')}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{display: "flex", justifyContent: "space-between"}}>
         {
            event.users.map(user => user._id).includes(user._id)
                ? (
                    <Button size="medium" color="primary" variant="contained" onClick={() => handleEventParticipation('abort')}>
                        Abort
                    </Button>
                ) 
                : (
                    <Button size="medium" color="primary" variant="contained" onClick={() => handleEventParticipation('participate')}>
                        Participate
                    </Button>
                )

         }   
        {
            event.users.length > 0 && 
            <AvatarGroup max={5}>
                {/* {
                    event.users.map(user => {
                        return ( 
                            <> */}
                            {/* <Avatar alt={user.username} src={user.image_url} /> */}
                            <Avatar src={event.users[0].image_url} />
                            <Avatar src={event.users[0].image_url} />
                            <Avatar src={event.users[0].image_url} />
                            <Avatar src={event.users[0].image_url} />
                            <Avatar src={event.users[0].image_url} />
                            <Avatar src={event.users[0].image_url} />
                            <Avatar src={event.users[0].image_url} />
                            <Avatar src={event.users[0].image_url} />
                            <Avatar src={event.users[0].image_url} />
                            <Avatar src={event.users[0].image_url} />
                            <Avatar src={event.users[0].image_url} />
                            {/* </>
                        )
                    })
                } */}
            </AvatarGroup>
        }

      </CardActions>
    </Card>
  );
}
