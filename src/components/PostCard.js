import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import moment from 'moment';
import { Button, TextField } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import CommentCard from './CommentCard';
import axios from 'axios';
import API_URL from '../config';
import LikeAnimation from '../json/like.json'
import MessageAnimation from '../json/message.json'
import Animation from './Animation'


function PostCard({postData, user}) {
    // const cardWidth = 500;

    // rename later
    const [post, setPost] = useState(postData);
    const [commentContent, setCommentContent] = useState('')
    const [showLikeAnimation, setShowLikeAnimation] = useState(false);
    const [showMessageAnimation, setShowMessageAnimation] = useState(false);

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
            width: 345
        },
        media: {
            height: 140,
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
            // width: cardWidth - 80,
        }
      }));

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleAddComment = async (event) => {
        event.preventDefault();
        
        if (!commentContent.length) {
            return 0
        }

        try {
            let commentData = {
                postId: post._id,
                comment: {
                    content: commentContent,
                    owner: user._id,
                    likes: [],
                    dislikes: [],
                    createdAt: new Date()
                }
            }
            let response = await axios.post(`${API_URL}/api/post/comment`, commentData, {withCredentials: true})
            setCommentContent('')
            setPost(response.data)
            temporaryShowAnimation(setShowMessageAnimation, 1700)
        }
        catch(error) {
            console.log(error)
        }
    }

    const updateLikesAndDislikes = async (likeAndDislikeData) => {
        try {
            let response = await axios.post(`${API_URL}/api/post/likes`, likeAndDislikeData, {withCredentials: true})
            setPost(response.data)
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleLikesAndDislikes = async (type, action, postOrCommentId) => {
        if (type === 'post' && action ==="likes") {
            temporaryShowAnimation(setShowLikeAnimation, 2000)
        }

        let likeAndDislikeData = {
            type,
            action,
            postOrCommentId,
            userId: user._id,
        }
        updateLikesAndDislikes(likeAndDislikeData)
    }

    const temporaryShowAnimation = (animationFunction, duration) => {
        animationFunction(true)
        setTimeout(() => {
            animationFunction(false)
        }, duration);
    }

    const changeCommentContent = event => {
        setCommentContent(event.target.value)
    }
    
    return (
            <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar alt={postData.creator.username} src={postData.creator.image_url} />
                }
                action={
                    <Typography variant="body2">{moment(post.createdAt).format("MMM Do YY") }</Typography>    
                }
                title={
                    <Typography variant="h6">{post.title}</Typography>
                }
                subheader={<Typography variant="body2">{post.creator.username}</Typography>
            }
            />
            <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                {post.content}
                </Typography>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <img src={post.image_url} style={{maxWidth: "300px"}}/>
                </div>
            </CardContent>
            <CardActions disableSpacing >
                        {   
                            !showLikeAnimation && 
                            <IconButton 
                                onClick={() => handleLikesAndDislikes("post", "likes", post._id)} 
                                name="likes" 
                                color={post.likes.includes(user._id) ? 'primary' : ''}
                            >
                                <ThumbUpIcon />
                            </IconButton>
                        }
                        {
                            showLikeAnimation && 
                            <Animation width={50} height={50} animation={LikeAnimation} />
                        }
                        <Typography>{post.likes.length}</Typography>
                        <IconButton 
                            onClick={() => handleLikesAndDislikes("post", "dislikes", post._id)} 
                            name="dislikes"
                            color={post.dislikes.includes(user._id) ? 'primary' : ''}
                        >
                            <ThumbDownIcon />
                        </IconButton>
                        <Typography style={{flexGrow: "1"}}>{post.dislikes.length}</Typography>
                        {
                            showMessageAnimation && 
                            <Animation width={211} height={100} animation={MessageAnimation} />
                        }
                        <Typography>{post.comments.length}</Typography>
                        <IconButton
                            onClick={handleExpandClick}
                            aria-label="show more"
                        >
                            <CommentIcon/>
                        </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {
                        post.comments.map((comment, index) => {
                           return <CommentCard key={index} user={user} comment={comment} onHandleLikesAndDislikes={handleLikesAndDislikes}/>
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
                        onChange={changeCommentContent}
                        value={commentContent}
                    />
                    <IconButton type="submit">
                        <CommentIcon/>
                    </IconButton>
                </form>
            </CardContent>
            </div>
            </Card>            
    )
}

export default PostCard


// npm install react-share
// import {
//     EmailShareButton,
//     FacebookShareButton,
//     InstapaperShareButton,
//     LinkedinShareButton,
//     PinterestShareButton,
//     TwitterShareButton,
//     WhatsappShareButton,
//   } from "react-share";