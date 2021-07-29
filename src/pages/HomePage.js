import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import Navbar from "../components/Navbar";
import PostCard from '../components/PostCard';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import axios from 'axios';
import API_URL from "../config";
import { Redirect } from 'react-router';


function HomePage() {
    
    const [posts, setPosts] = useState([]);
    const {user, onUpdateUser} = useContext(UserContext);
    const [navBarChanged, setNavBarChanged] = useState(false);

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

    if (!user) {
        return <Redirect to={{
            pathname: "/",
            state: { renderLogin: true }
        }} />
    }


    const handleNavBarChange = () => {
        setNavBarChanged(!navBarChanged)
    }

    return (
        <Navbar showDrawer onNavBarChange={handleNavBarChange}>
            <Container>
                <Grid
                    container
                    spacing={4}
                    style={{marginTop: "20px"}}
                >
                    {
                        posts.map((postData, index) => {
                            return (
                                    <Grid item xs={12} sm={12} key={index} >
                                        <div className={index % 2 === 0 ? 'fly-left' : 'fly-right'}>
                                            <PostCard user={user} postData={postData} index={index} />
                                        </div>  
                                    </Grid>
                                )
                        })
                    }
                </Grid>
            </Container>
        </Navbar>
    )
}

export default HomePage;
