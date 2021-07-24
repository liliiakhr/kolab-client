import { Container, TextField, Paper, Button, IconButton } from '@material-ui/core'
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

function AddPost({onCloseAddPost, onAddPost}) {

    return (
        <Container maxWidth="sm">
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <IconButton onClick={onCloseAddPost}>
                    <CloseIcon />
                </IconButton> 
            </div>  
            <Paper>
                <form onSubmit={onAddPost} style={{display: "flex", flexDirection: "column"}}>
                    <TextField 
                        placeholder="Title" 
                        variant="filled" 
                        label="Title"
                        name="title"
                    />
                    <TextField 
                        label="Body"
                        placeholder="What do you want to share with the world?"
                        multiline
                        rows={5}
                        maxRows={10}
                        variant="filled"
                        name="content"
                    />
                    <Button variant="contained" color="primary" type="submit" >Create Post</Button>
                </form>
            </Paper>
        </Container>
    )
}

export default AddPost
