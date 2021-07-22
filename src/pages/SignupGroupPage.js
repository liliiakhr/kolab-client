import React, { useEffect, useState } from 'react';
import GroupCard from '../components/GroupCard';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import API_URL from "../config"
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

function SignupGroupPage({user, history}) {

    const [ groups, setGroups ] = useState([])

    useEffect(() => {
        const getGroupData = async () => {
            try {
                let categoryInfo = {
                    // categories: user.categories
                    categories: ['magic', 'art', 'nature']
                }
                // !! Is query the way to go here or do we have alternatives? !!
                let response = await axios.get(`${API_URL}/api/signup/group`, { params: categoryInfo });
                setGroups(response.data)
            }
            catch(error) {
                // history.push('/home');
            }
        }

        getGroupData();
    }, [])

    return (
        <Container style={{ marginTop: "60px"}} >

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}} className="fly-top">
                <Typography variant="h3" gutterBottom align="center" color="primary" style={{marginBottom: "50px"}}>
                    Join a group of your preference
                    <Button 
                        style={{ marginLeft: "20px"}}
                        endIcon={<NavigateNextIcon />}
                        variant="outlined"
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
