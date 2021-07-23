import React, { useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import categoryData from '../json/categoryData.json';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import axios from 'axios';
import API_URL from "../config";
import { makeStyles } from '@material-ui/core/styles';

function SignupCategoryPage( {user, onUpdateUser, history} ) {

    // style={{ top: "0px", position: "absolute", right: "0px"}}
    const useStyles = makeStyles((theme) => ({
        btn: {
            position: "absolute",
            top: "0px",
            right: "0px",
            [theme.breakpoints.down('xs')]: {
                left: "0",
            },
        }
      }));

    const classes = useStyles();

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
        <>
        <Container style={{ marginTop: "50px"}} >
            {/* <div style={{ position: "relative"}} className="fly-top">
                <Typography variant="h3" gutterBottom align="center" color="primary" style={{marginBottom: "30px"}}>
                    What are your interests?
                </Typography>
                {
                    categories.length > 0 && 
                        <Button 
                            color="primary" 
                            size="large" 
                            variant="contained" 
                            style={{ top: "0px", position: "absolute", right: "0px"}}
                            onClick={handleUpdateCategoriesUser}
                            >
                            {categories.length > 0 ? <ArrowRightAltIcon /> : ''}
                        </Button> 
                }
            </div> */}
            <div style={{ position: "relative"}} className="fly-top">
                <Typography variant="h3" gutterBottom align="center" color="primary" style={{marginBottom: "30px"}}>
                    What are your interests?
                </Typography>
                {
                    categories.length > 0 && 
                        <Button 
                            color="primary" 
                            size="large" 
                            variant="contained" 
                            className={classes.btn}
                            onClick={handleUpdateCategoriesUser}
                            >
                            {categories.length > 0 ? <ArrowRightAltIcon /> : ''}
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
                                    <div className={index < 3 || index > 5 ? 'fly-left' : 'fly-right'}>
                                        <CategoryCard key={index} image={image} onUpdateCategories={handleUpdateCategoriesState} />
                                    </div>
                                </Grid>
                            )
                        }) 
                    }
            </Grid>
        </Container>
        </>
    )
}

export default SignupCategoryPage
