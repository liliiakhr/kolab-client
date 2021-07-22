import React from 'react'
import { Container } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

function Signup() {
    return (
        <Container>
        <Typography variant='h4' component='h4'>Welcome to Kolab</Typography>
        <form>
            <TextField
            id="outlined-password-input"
            label="Username"
            type="text"
            variant="outlined"
            name="username"
            />
            <TextField
            id="outlined-password-input"
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            /> 
            <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            />
            <Button type='submit' variant="outlined" color="primary">
              Sign Up
            </Button>
        </form>
        </ Container>
    )
}

export default Signup

