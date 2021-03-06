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

function AddGroup(props) {
    const [category, setCategory] = useState('')
    return (
        <Container maxWidth="xs"> 
        <Paper className="pop-up-styling">
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant='h6' style={{marginTop: '10px'}}>Create your group</Typography>
                    <IconButton onClick={props.onAddGroupPopUp} >
                        <CloseIcon />
                    </IconButton> 
                </div>  
              <form autocomplete="off" encType="multipart/form-data" style={{display: 'flex', flexDirection: 'column'}} onSubmit={props.onAddGroup} novalidate>
                <TextField placeholder="Name" variant="filled" label="Name" type="text" name="name"></TextField>
                <TextField 
                    label="Description"
                    placeholder="What makes your group special?"
                    name="description"
                    multiline
                    rows={5}
                    maxRows={10}
                    variant="filled"
                    >
                </TextField>
                <TextField style={{marginTop: '10px'}} placeholder="Tags (Place a ',' between tags and no spaces)" variant="filled" label="Tags" type="text" name="tags"></TextField>
                <FormControl variant="outlined" style={{marginTop: '10px'}}>
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="category"
                    value={category}
                    onChange={(event) => {setCategory(event.target.value)}}
                    label="Category"
                    >
                    <MenuItem value="">
                        <em>Category</em>
                    </MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                    <MenuItem value="magic">Magic</MenuItem>
                    <MenuItem value="art">Art</MenuItem>
                    <MenuItem value="sports">Sports</MenuItem>
                    <MenuItem value="science">Science</MenuItem>
                    <MenuItem value="lifestyle">Lifestyle</MenuItem>
                    <MenuItem value="nature">Nature</MenuItem>
                    <MenuItem value="politics">Politics</MenuItem>
                    <MenuItem value="entertainment">Entertainment</MenuItem>
                    </Select>
                </FormControl>
                <input type="file" name="imageUrl" accept="image/png, image/jpg"/>                  
                <Button type="submit" variant="contained" color="primary">Create Group</Button>
               </form>            
            </Paper>
        </Container>
    )
}

export default AddGroup
