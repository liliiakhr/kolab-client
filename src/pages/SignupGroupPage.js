import React, { useEffect } from 'react';
import GroupCard from '../components/GroupCard';
import { Container, Typography, Grid } from '@material-ui/core';

function SignupGroupPage() {

    useEffect(() => {

    }, [])

    return (
        <Container style={{ marginTop: "60px"}} >

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h3" gutterBottom align="center" color="primary" style={{marginBottom: "50px"}}>Join a group of your preference</Typography>
            </div>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                spacing={4}
            >
                <Grid item xs={12} sm={6} >
                    <GroupCard />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <GroupCard />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <GroupCard />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <GroupCard />
                </Grid>
            </Grid>
        </Container>
    )
}

export default SignupGroupPage
