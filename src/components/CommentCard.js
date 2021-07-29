import React from 'react'
import { Avatar, Typography } from '@material-ui/core'
import moment from 'moment';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

export default function CommentCard({user, onHandleLikesAndDislikes, comment: {createdAt, content, likes, dislikes, owner, _id}}) {
    console.log(owner)
    return (
        <div style={{display: "flex", marginTop: "20px"}}>
            <Avatar alt={user.username} src={owner.image_url} style={{marginRight: "10px"}} />
            <div style={{ width: "100%" }}>
                <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                    <Typography 
                        gutterBottom 
                        variant="body1" 
                        style={{flexGrow: "1"}}>
                        {owner.username}
                    </Typography>
                    <Typography 
                        variant="body2"
                    >
                        {moment(createdAt).format("lll") }
                    </Typography>
                </div> 
                <Typography 
                    variant="body2" 
                    style={{wordBreak: "break-word"}}
                >{content}
                </Typography>
                <div style={{display: "flex", alignItems: "center"}}>
                    <IconButton 
                        onClick={() => onHandleLikesAndDislikes("comment", "likes", _id)}
                        color={likes.includes(user._id) ? 'primary' : ''}
                    >
                        <ThumbUpIcon />
                    </IconButton>
                    <Typography>{likes.length}</Typography>
                    <IconButton 
                        onClick={() => onHandleLikesAndDislikes("comment", "dislikes", _id)}
                        color={dislikes.includes(user._id) ? 'primary' : ''}
                    >
                        <ThumbDownIcon />
                    </IconButton>
                    <Typography>{dislikes.length}</Typography>
                </div>
            </div>
        </div>
    )
}
