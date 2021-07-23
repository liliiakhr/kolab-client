import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

function PostCard() {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };


    return (
        <div>
            <div style={{marginTop:"80px"}}> </div>

            <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    P
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title="10 Clever JavaScript Tricks That Every Developer Should Know"
                subheader="September 14, 2016"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                This is a post preview. It is limited to nnn characters. 
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <ThumbUpIcon />
                </IconButton>
                <IconButton>
                    <ThumbDownIcon />
                </IconButton>
                <IconButton>
                    <CommentIcon/>
                </IconButton>
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                    Here is the expanded post.
                </Typography>
                <Typography paragraph>
                    Here is the expanded post.
                </Typography>
                <Typography paragraph>
                    Here is the expanded post.
                </Typography>
                <Typography>
                    Here is the expanded post.
                </Typography>
                </CardContent>
            </Collapse>
            </Card>            
        </div>
    )
}

export default PostCard
