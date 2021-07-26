import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../assets/images/profile.png'
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: 400, 
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
});

function UserCard({username, description, image_url, id, categories}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const interests = categories.map(elem => elem[0].toUpperCase() + elem.slice(1,elem.length)).join(', ')

  return (
    <Card className={classes.root}>
    <Link to={`/profile/${id}`} style={{textDecoration: 'none'}}>
      <CardContent>
        <Avatar alt="Remy Sharp" src={Logo} style={{width: '100px', height: '100px'}}/>
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
    </Card>
  );
}

export default UserCard 