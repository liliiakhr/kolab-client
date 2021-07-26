import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import API_URL from "../config"
import axios from 'axios';
import Pagination from '../components/Pagination';
import UserCard from '../components/UserCard';


function PeoplePage({user, onUpdateUser}) {

    const [users, setUsers] = useState([])
    const [filteredUsers, setFiltered] = useState(users)

    useEffect(() => {
        let getUsers = async () => {
            let response = await axios.post(`${API_URL}/api/people`, {withCredentials: true})
            console.log(response.data)
            setUsers(response.data)
        }
        getUsers()
    }, [])

    if(!users){
        return <Typography variant="h3">Loading . . .</Typography>
    }

    return (
        <div>  
            <Navbar user={user} onUpdateUser={onUpdateUser} >               
                <Container style={{ marginTop: "60px"}} >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start"}} className="fly-top">
                        <Typography variant="h3" gutterBottom align="center" color="primary" style={{marginBottom: "50px"}}>
                            Find new people
                        </Typography>
                    </div>
                    <Grid   container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    spacing={4}
                    >
                    {
                       users.map((user, i) => {
                           let username = user.username[0].toUpperCase() + user.username.slice(1, user.username.length)
                           return(
                            <Grid item xs={12} sm={6} key={i}>
                            <div className={i % 2 === 0 ? 'fly-left' : 'fly-right'}>
                                    <UserCard key={i} categories={user.categories} id={user._id} username={username} description={user.description}/>
                                </div>
                            </Grid>                            
                           )
                       }) 
                    }
                    </Grid>
                    {/* <Pagination data={groups} RenderComponent={GroupCard} dataLimit={10}/> */}
                </Container> 
            </Navbar> 
        </div>
    )
}

export default PeoplePage
