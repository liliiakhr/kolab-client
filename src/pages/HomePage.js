import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import Navbar from "../components/Navbar";
import PostCard from '../components/PostCard';
import { Container, Grid } from '@material-ui/core';
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
                let postData = response.data.sort((a, b) => {
                    console.log(a.createdAt)
                    if (a.createdAt < b.createdAt) {
                        return 1
                    }
                    else if (a.createdAt > b.createdAt) {
                        return -1
                    }
                    else {
                        return 0
                    }
                }) 
                setPosts(postData)
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
                                    <Grid item xs={12} md={12} lg={6} key={index} >
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
