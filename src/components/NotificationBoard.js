import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import image from '../assets/images/profile.png'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}));

function NotificationBoard({onSendResponse ,loggedusername,username,image_url, description, id}) {
  const classes = useStyles();

  const [requestComplete, setRequestCompleted] = useState(false)

  const handleRequestToggle = (response) => {
      setRequestCompleted(!requestComplete)
      onSendResponse(response, id)
  }  
  

  return (
      <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={username} src={image} />
        </ListItemAvatar>
        <ListItemText
          primary={`${username} sent a friend request`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                to {loggedusername}
              </Typography>
              {` - ${description.slice(0,45)}...`}
            </React.Fragment>
          }
        />  
      {
     !requestComplete? (<div>
      <IconButton onClick={() => {handleRequestToggle(true)}}>
          <PersonAddIcon style={{color: 'green'}}/>
        </IconButton>
      <IconButton onClick={() => {handleRequestToggle(false)}}>
          <PersonAddDisabledIcon style={{color: 'red'}}/>
        </IconButton>
       </div>) : <Typography><DoneIcon /> Done</Typography>  
    }
    </ListItem> 
    <Divider variant='inset' component='li'/> 
    </>
  );
}
export default NotificationBoard