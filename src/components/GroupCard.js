import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, CardActions, Card, CardMedia, CardContent } from '@material-ui/core';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';

function GroupCard({group}) {
    const useStyles = makeStyles((theme) => ({
      root: {
        maxWidth: 500,
      },
      media: {
        height: 0,
        paddingTop: '33%', // 16:9
      }
    }));

    const classes = useStyles();

    return (
    <Card className={classes.root} >
        <CardMedia
        className={classes.media}
        image={group.image_url}
        title={group.name}
        />
    <CardContent>
        <Typography variant="subtitle1">{group.name}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {group.description}
        </Typography>
    </CardContent>
    <CardActions style={{display: "flex", justifyContent: "space-between"}}>
        <Button  color="primary" startIcon={<PeopleAltOutlinedIcon />}>
            {group.users.length} Members
        </Button>
        <Button  color="primary" startIcon={<QuestionAnswerOutlinedIcon />}>
            {group.postCount} Posts
        </Button>
    </CardActions>
    </Card>
  );
}

export default GroupCard;