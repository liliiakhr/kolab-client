import React, {useState} from 'react'
import { Container } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import logo from '../assets/images/logo_dark_transparent.png'
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function AddEvent({onCloseAddEvent}) {

    return (  
        <Container maxWidth="xs"> 
            <Paper className="pop-up-styling"> 
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <IconButton onClick={onCloseAddEvent} >
                        <CloseIcon />
                    </IconButton> 
                </div>
              <form autocomplete="off" style={{display: 'flex', flexDirection: 'column'}}  novalidate>
                <TextField
                    id="datetime-local"
                    label="Start date & time"
                    type="datetime-local"
                    defaultValue="2021-01-01T12:00"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                <TextField
                    id="datetime-local"
                    label="Start date & time"
                    type="datetime-local"
                    defaultValue="2021-01-01T12:00"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <Button type="submit" variant="contained" color="primary">Create Event</Button>
               </form>            
            </Paper>
        </Container>
    )
}

export default AddEvent
