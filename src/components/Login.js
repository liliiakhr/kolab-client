import React from 'react';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function Login(props) {
    return (
        <div>
            <Container >
                <Typography variant='h4' component='h4'>Welcome back!</Typography>
                <form autocomplete="off" onSubmit={props.onLogin}>
                    <TextField
                        id="outlined-password-input"
                        label="Username"
                        type="text"
                        variant="outlined"
                        name="username"
                    />
                    <TextField 
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                    />
                    <Button type='submit' variant="outlined" color="primary">
                        Login
                    </Button>
                </form>
                
            </Container>
        </div>
    )
}
export default Login;
