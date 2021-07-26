import React, {useContext} from 'react';
import UserContext from '../contexts/UserContext';
import Navbar from '../components/Navbar';
import { Button, Container, Grid } from '@material-ui/core';
import ProfileInfo from '../components/ProfileInfo';

function UserPage(props) {
    const {user, onUpdateUser} = useContext(UserContext);

    const urlId = props.match.params.id;
    const isLoggedInUser = user.id == urlId;


    
    return (
        <Container>

            
            <Navbar user={user} onUpdateUser={onUpdateUser}>

            

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
                                   <ProfileInfo isLoggedInUser={isLoggedInUser}/>
                                   
                                </div>
                            </Grid> 

                </Grid>

            
            </Navbar>
        </Container>
    )
}

export default UserPage
