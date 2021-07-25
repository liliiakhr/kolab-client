import React, { useState, useContext } from 'react';
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
import moment from 'moment';
import { Button, TextField } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import CommentCard from './CommentCard';
import axios from 'axios';
import API_URL from '../config';
import { SportsMmaOutlined } from '@material-ui/icons';

function PostCard({postData, user}) {
    const cardWidth = 500;

    // rename later
    const [post, setPost] = useState(postData);
    const [commentContent, setCommentContent] = useState('');

    const useStyles = makeStyles((theme) => ({
        root: {
          maxWidth: cardWidth,
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
        comment: {
            width: cardWidth - 80,
            // [theme.breakpoints.only('sm')]: {
            //     width: 200,
            // },
        }
      }));

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleAddComment = async (event) => {
        event.preventDefault();
        try {
            let commentData = {
                postId: post._id,
                comment: {
                    content: event.target.content.value,
                    owner: user._id,
                    likes: [],
                    dislikes: [],
                    createdAt: new Date()
                }
            }
            let response = await axios.post(`${API_URL}/api/post/comment`, commentData, {withCredentials: true})
            setPost(response.data)
        }
        catch(error) {
            console.log(error)
        }
    }

    // Option 1: 
    // Make seperate back-end route for all 4 functions, like post, dislike post, like comment, dislike comment etc.
    // Option 2:
    // Create 1 route for updating the post
    // Put this thing in a useEffect and run it whenever the post is updated
    // Then the handleLikePost etc would only update the post state
    // Post state will trigger the back-end function
    // This function will be passed on as prop to the comment section
    
    const updateLikesAndDislikes = async (likeAndDislikeData) => {
        try {
            let response = await axios.post(`${API_URL}/api/post/likes`, likeAndDislikeData, {withCredentials: true})
            console.log(response.data)
            setPost(response.data)
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleLikesAndDislikes = async (type, action, postOrCommentId) => {
        let likeAndDislikeData = {
            type,
            action,
            postOrCommentId,
            userId: user._id,
        }
        updateLikesAndDislikes(likeAndDislikeData)
    }
    
    return (
        <div>
            <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    P
                </Avatar>
                }
                action={
                    <Typography variant="body2">{moment(post.createdAt).format("MMM Do YY") }</Typography>    
                }
                title={post.title}
                subheader={post.creator.username}
            />
            <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                {post.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing >
                        <IconButton onClick={() => handleLikesAndDislikes("post", "likes", post._id)} name="likes">
                            <ThumbUpIcon />
                        </IconButton>
                        <Typography>{post.likes.length}</Typography>
                        <IconButton onClick={() => handleLikesAndDislikes("post", "dislikes", post._id)} name="dislikes">
                            <ThumbDownIcon />
                        </IconButton>
                        <Typography style={{flexGrow: "1"}}>{post.dislikes.length}</Typography>
                        <Typography>{post.comments.length}</Typography>
                        <IconButton
                            onClick={handleExpandClick}
                            aria-label="show more"
                        >
                            <CommentIcon/>
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>

            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {
                        post.comments.map((comment, index) => {
                           return <CommentCard key={index} comment={comment} onHandleLikesAndDislikes={handleLikesAndDislikes}/>
                        })
                    }
                </CardContent>
            </Collapse>
            <div style={{display: "flex", alignItems: "center"}}>
            <CardContent>
                <form onSubmit={handleAddComment}>
                    <TextField 
                        label="Comment" 
                        variant="outlined" 
                        size="small" 
                        className={classes.comment}
                        rowsMax="10"
                        multiline
                        name="content"
                    />
                    <IconButton type="submit">
                        <CommentIcon/>
                    </IconButton>
                </form>
            </CardContent>
            </div>
            </Card>            
        </div>
    )
}

export default PostCard
