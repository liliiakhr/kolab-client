import React, { useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import categoryData from '../json/categoryData.json';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container, Typography, Button } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import axios from 'axios';
import API_URL from "../config"

function SignupCategoryPage( {user, onUpdateUser, history} ) {

    const [ categories, setCategories ] = useState([]);

    const handleUpdateCategoriesState = (category) => {
        // This function when a category is clicked
        // it removes it from the categories when it's in there
        // it puts it in the categoreies when its not in there
        let newCategory = category.toLowerCase();
        let newCategories = JSON.parse(JSON.stringify(categories));
        if (newCategories.includes(newCategory)) {
            newCategories = newCategories.filter(oldCategory => oldCategory !== newCategory)
        }
        else {
            newCategories.push(newCategory)
        }
        setCategories(newCategories)
    }

    const handleUpdateCategoriesUser = async () => {
        try {
            let categoryInfo = {
                _id: user._id,
                categories
            }
            let response = await axios.post(`${API_URL}/api/signup/category`, categoryInfo);
            onUpdateUser(response.data)
            history.push('/signup/group')
        }
        catch(error) {
             
        }
    }

    return (
        <Container style={{ marginTop: "60px"}} >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Typography variant="h3" gutterBottom align="center" color="primary" style={{marginBottom: "20px"}}>What are your interests?</Typography>
                {
                    categories.length > 0 && 
                        <Button 
                            color="primary" 
                            size="large" 
                            variant="contained" 
                            style={{marginBottom: "20px"}}
                            onClick={handleUpdateCategoriesUser}
                            >
                            <ArrowRightAltIcon />
                        </Button> 
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
                                    <CategoryCard key={index} image={image} onUpdateCategories={handleUpdateCategoriesState} />
                                </Grid>
                            )
                        }) 
                    }
            </Grid>
        </Container>
    )
}

export default SignupCategoryPage
