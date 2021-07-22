import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, CardActions, Card, CardMedia, CardContent } from '@material-ui/core';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: '33%', // 16:9
  }
}));

function GroupCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image="/images/azkaban.jpg"
          title="Paella dish"
        />
      <CardContent>
        <Typography variant="subtitle1">Azkaban Group</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions style={{display: "flex", justifyContent: "space-between"}}>
        <Button  color="primary" startIcon={<PeopleAltOutlinedIcon />}>Members</Button>
        <Button  color="primary" startIcon={<QuestionAnswerOutlinedIcon />}>Posts</Button>
      </CardActions>
    </Card>
  );
}

export default GroupCard;