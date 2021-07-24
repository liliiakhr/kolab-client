
import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import GroupCard from '../components/GroupCard';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import API_URL from "../config"
import axios from 'axios';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Pagination from '../components/Pagination';
import AddIcon from '@material-ui/icons/Add';


function ExploreGroupPage({user, onUpdateUser}) {

    const [groups, setGroups] = useState([])

    useEffect(() => {
        console.log("USE EFFECT TO GET GROUP DATA")
        let getGroups = async () => {
            let response = await axios.get(`${API_URL}/api/groups`, {withCredentials: true})
            setGroups(response.data)
        }
        getGroups()
    }, [])


    return (
        <div>
            <Navbar user={user} onUpdateUser={onUpdateUser} >
                <Container style={{ marginTop: "60px"}} >

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}} className="fly-top">
                        <Typography variant="h3" gutterBottom align="center" color="primary" style={{marginBottom: "50px"}}>
                            Explore our groups
                        </Typography>
                    </div>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        alignContent="center"
                        spacing={4}
                    >
                    <Pagination data={groups} RenderComponent={GroupCard} dataLimit={10}/>
                    </Grid>
                    
                </Container>                   
            </Navbar>
        </div>
    )
}

export default ExploreGroupPage
