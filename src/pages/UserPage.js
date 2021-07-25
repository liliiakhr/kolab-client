import React, {useContext} from 'react';
import UserContext from '../contexts/UserContext';
import Navbar from '../components/Navbar';
import { Button, Container, Grid } from '@material-ui/core';

function UserPage(props) {
    const {user, onUpdateUser} = useContext(UserContext);

    const urlId = props.match.params.id;
    const isLoggedInUser = user.id == urlId;

    const changeName = (() => {
        onUpdateUser({...user, username:"Kalande"});
    })
    
    return (
        <Container>

            
            <Navbar user={user} onUpdateUser={onUpdateUser}>

            {isLoggedInUser && <Button onClick = {changeName}>Change name</Button>}

                <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        alignContent="center"
                        spacing={4}
                    >

                    <Grid item xs={12} sm={6}>
                                <div>
                                   {user.username}
                                </div>
                            </Grid> 

                </Grid>

            
            </Navbar>
        </Container>
    )
}

export default UserPage
