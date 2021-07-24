import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import GroupCard from '../components/GroupCard';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import API_URL from "../config"
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LandingPage from './LandingPage'


function SignupGroupPage({history}) {

    const [ groups, setGroups ] = useState([])
    const user = useContext(UserContext)
    console.log("User from context group page:", user)
    
    // ?? IS there a way to 
    useEffect(() => {
        console.log("USE EFFECT TO GET GROUP DATA", user)
        const getGroupData = async () => {
            try {
                let categoryInfo = {
                    categories: user.categories
                }

                let response = await axios.get(`${API_URL}/api/signup/group`, { params: categoryInfo });
                setGroups(response.data)
            }
            catch(error) {
                // history.push('/home');
            }
        }

        getGroupData();
    }, [user])

    // This is the way to pass extra data with Redirect component
    // State is accessible via: props.location.state (assuming the routeProps are spreaded)
    // The extra routeProps need to be passed into the Route in app.js
    if (!user) {
        return <Redirect to={{
            pathname: "/",
            state: { renderLogin: true }
        }} />
    }



    if (!groups.length) {
        return <h1>Loading . . .</h1>
    }


    return (
        <Container style={{ marginTop: "60px"}} >

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}} className="fly-top">
                <Typography variant="h3" gutterBottom align="center" color="primary" style={{marginBottom: "50px"}}>
                    Join a group of your preference
                    <Button 
                        style={{ marginLeft: "20px"}}
                        endIcon={<NavigateNextIcon />}
                        variant="outlined"
                        onClick={() => {history.push('/home')}}
                    >
                        Skip
                    </Button>
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
                {
                    groups.map((group, index) => {
                        return (
                            <Grid item xs={12} sm={6} key={index}>
                                <div className={index % 2 === 0 ? 'fly-left' : 'fly-right'}>
                                    <Link to="/:group" style={{ textDecoration: "none"}} >
                                        <GroupCard group={group} index={index} />
                                     </Link>
                                </div>
                            </Grid>
                            )
                    })
                }
            </Grid>
        </Container>
    )
}

export default SignupGroupPage
