import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import PostCard from '../components/PostCard';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import axios from 'axios';
import API_URL from "../config";



function HomePage() {

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const getPosts = async () => {
            try {
                let response = await axios.get(`${API_URL}/api/home/`);
                setPosts(response.data)
            }
            catch(error) {
                console.log(error)
            }
        }

        getPosts();
    }, [])



    return (
        <div>
        <Navbar>


        <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                spacing={4}
            >
            <PostCard />
        </Grid>

        {/* To be used once we can get posts from db */}
            {/* {
                posts.map((post) => {
                    return (
                        <Grid item xs={12} sm={6}>
                            <div>
                                <PostCard />
                            </div>
                        </Grid>

                    )
                })
            } */}   
        </Navbar>
            
        </div>
    )
}

export default HomePage;