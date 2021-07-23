import React from 'react';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../assets/images/logo_dark_transparent.png'
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

function Login(props) {
    return (
        <div style={{
            width: '25%',
            height: '70%',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '15%',
            }}>
            <IconButton onClick={props.onLoginPopUp} style={{marginTop: '-30%', marginBottom: '20%', marginLeft: '80%'}} >
                <CloseIcon />
            </IconButton>

        <img src={logo} alt='Kolab logo'style={{width: '50%', marginTop: '-20%'}}/>
                <form autocomplete="off" onSubmit={props.onLogin} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
        </div>
    )
}
export default Login;
