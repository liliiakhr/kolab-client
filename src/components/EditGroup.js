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

function EditGroup({onCloseEditGroup, onEditGroup, group}) {

    const [temporaryGroup, setTemporaryGroup ] = useState(group)

    const changeInputData = event => {
        setTemporaryGroup({
            ...temporaryGroup,
            [event.target.name]: event.target.value
        })
    }

    return (  
        <Container maxWidth="xs"> 
            <Paper className="pop-up-styling"> 
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <IconButton onClick={onCloseEditGroup} >
                        <CloseIcon />
                    </IconButton> 
                </div>
              <form autocomplete="off" style={{display: 'flex', flexDirection: 'column'}} onSubmit={onEditGroup} novalidate>
                <TextField 
                    placeholder="Name" 
                    variant="standard" 
                    margin="normal"
                    label="Name" 
                    type="text" 
                    name="name"
                    value={temporaryGroup.name}
                    onChange={changeInputData}
                >
                </TextField>
                <TextField 
                    style={{marginTop: '10px'}} 
                    placeholder="Image Url" 
                    variant="standard" 
                    margin="normal"
                    label="Image" 
                    type="text" 
                    name="image_url"
                    onChange={changeInputData}
                >
                </TextField>
                <TextField 
                    label="Description"
                    placeholder="What makes your group special?"
                    name="description"
                    multiline
                    rows={5}
                    maxRows={10}
                    variant="standard" 
                    margin="normal"
                    value={temporaryGroup.description}
                    onChange={changeInputData}
                    >
                </TextField>
                <TextField 
                    style={{marginTop: '10px'}} 
                    placeholder="Tags (Place a ',' between tags and no spaces)" 
                    variant="standard" 
                    margin="normal"
                    label="Tags" 
                    type="text" 
                    name="tags"
                    value={temporaryGroup.tags}
                    onChange={changeInputData}
                >
                </TextField>
                <FormControl variant="outlined" style={{marginTop: '10px'}}>
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="category"
                    value={temporaryGroup.category}
                    onChange={changeInputData}
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
                <Button type="submit" variant="contained" color="primary">Update Group</Button>
               </form>            
            </Paper>
        </Container>
    )
}

export default EditGroup
