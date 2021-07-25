import React, { useEffect, useState } from 'react';
import NavBar from "../components/Navbar";
import PostCard from '../components/PostCard';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import axios from 'axios';
import API_URL from "../config";



function HomePage({user, onUpdateUser}) {
    
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const getPosts = async () => {
            try {
                let response = await axios.get(`${API_URL}/api/home`);
                setPosts(response.data)
            }
            catch(error) {
                console.log(error)
            }
        }

        getPosts();
    }, [])


    return (
        <NavBar onUpdateUser={onUpdateUser} user={user} showDrawer>
            <Container>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    spacing={4}
                >
                    {
                        posts.map((postData, index) => {
                            return (
                                <Grid item xs={12} sm={12} key={index}>
                                    <div className={index % 2 === 0 ? 'fly-left' : 'fly-right'}>
                                            <PostCard user={user} postData={postData} index={index} />
                                    </div>
                                </Grid>
                                )
                        })
                    }
                </Grid>
            </Container>
        </NavBar>
    )
}

export default HomePage;