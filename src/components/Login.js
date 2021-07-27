import React from 'react';
import { Container, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../assets/images/logo_dark_transparent.png'
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

function Login(props) {
    return (
        <Container maxWidth="xs">
            <Paper className="pop-up-styling" style={{display: "flex", flexDirection: "column", alignItems: "center", position: "relative"}}>
                <IconButton onClick={props.onLoginPopUp} style={{position: "absolute", top: "0", right: "0"}} >
                    <CloseIcon />
                </IconButton>
                <img src={logo} alt='Kolab logo' style={{width: '50%'}}/>
                <form autocomplete="off" onSubmit={props.onLogin} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <TextField
                        id="outlined-password-input"
                        label="Username"
                        type="text"
                        variant="outlined"
                        name="username"
                        style={{marginTop: '-20px'}}
                        />
                    <TextField 
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        style={{marginTop: '20px'}}
                        />
                    <Button type='submit' variant="outlined" color="primary" style={{marginTop: '20px'}}>
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}
export default Login;
