import React, { useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import categoryData from '../json/categoryData.json';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container, Typography, Button } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';


function SignupCategoryPage({user, onUpdateUser}) {

    const [ categories, setCategories ] = useState(['art']);

    return (
        <Container style={{ marginTop: "60px"}} >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h3" gutterBottom align="center" color="primary" style={{marginBottom: "20px"}}>What are your interests?</Typography>
                {
                    categories.length > 0 && 
                    <Button color="primary" size="large" variant="contained" style={{marginBottom: "20px"}}><ArrowRightAltIcon /></Button> 
                    // <Button style={{ position: "absolute"}}><ArrowRightAltIcon /></Button> 
                }
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
                    categoryData.map((image, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} >
                                    <CategoryCard key={index} image={image} />
                            </Grid>
                        )
                    }) 
                    }
            </Grid>
        </Container>
    )
}

export default SignupCategoryPage
