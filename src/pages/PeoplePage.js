import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Button, TextField } from '@material-ui/core';
import API_URL from "../config"
import axios from 'axios';
import Pagination from '../components/Pagination';
import UserCard from '../components/UserCard';
import Animation from '../components/Animation'
import loading from '../json/loading.json';



function PeoplePage({user, onUpdateUser}) {

    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState(users)

    useEffect(() => {
        let getUsers = async () => {
            let response = await axios.post(`${API_URL}/api/people`, {withCredentials: true})
            setUsers(response.data)
            setFilteredUsers(response.data)
        }
        getUsers()
    }, [])

    if(!users){
        return  <Animation width={300} height={300} animation={loading} />
    }

    const handleSearchPeople = (event) => {
        let filter = users.filter(user =>  user.username.toLowerCase().includes(event.target.value.toLowerCase()) )
        setFilteredUsers(filter)
    }

    return (
        <div>  
            <Navbar user={user} onUpdateUser={onUpdateUser} >               
                <Container style={{ marginTop: "60px"}} >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start"}} className="fly-top">
                        <Typography variant="h3" gutterBottom align="center" color="primary" style={{marginBottom: "30px"}}>
                            Find new people
                        </Typography>
                        <TextField
                            style={{width: "200px", marginBottom: "30px"}}
                            variant="outlined"
                            onChange={handleSearchPeople} 
                            label="Search" 
                            size="medium"
                        />  
                    </div>
                    <Grid   container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    spacing={4}
                    >
                    {
                       filteredUsers.map((user, i) => {
                           let username = user.username[0].toUpperCase() + user.username.slice(1, user.username.length)
                           return(
                            <Grid item xs={12} sm={6} key={i}>
                            <div className={i % 2 === 0 ? 'fly-left' : 'fly-right'}>
                                    <UserCard key={i} categories={user.categories} id={user._id} image_url={user.image_url} username={username} description={user.description}/>
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
