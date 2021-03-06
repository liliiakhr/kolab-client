import Navbar from '../components/Navbar';
import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import GroupCard from '../components/GroupCard';
import { Container, Typography, Grid, Button, TextField } from '@material-ui/core';
import API_URL from "../config"
import axios from 'axios';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Pagination from '../components/Pagination';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import AddGroup from '../components/AddGroup';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Animation from '../components/Animation';
import loading from '../json/loading.json';
import './explorePage.css'

function ExploreGroupPage({onError, onSuccess, history}) {

    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [addGroup, setAddGroup] = useState(false);
    const {user, onUpdateUser, showDarkTheme} = useContext(UserContext);

    useEffect(() => {
        let getGroups = async () => {
            let response = await axios.get(`${API_URL}/api/groups`, {withCredentials: true})
            setGroups(response.data)
            setFilteredGroups(response.data)
        }
        getGroups()
    }, [])

    let handleCreateGroup = async (event) => {
        event.preventDefault()

        const {name, description, category, tags} = event.target

     
        try{
            let defaultImage = 'https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80';
            let imgResponse = ""
            if (event.target.imageUrl.value) {
                var formData = new FormData();
                formData.append('imageUrl', event.target.imageUrl.files[0]);
                imgResponse = await axios.post(`${API_URL}/api/upload`, formData);
            }

            let groupData = {
                name: name.value.trim(),
                image_url: imgResponse.data ? imgResponse.data.image_url : defaultImage,
                description: description.value,
                category: category.value,
                tags: tags.value.split(','),
                admin: user._id,
                users: [user._id]
            } 


          let response = await axios.post(`${API_URL}/api/add-group`, groupData, {withCredentials: true})
          onSuccess(response.data.successMessage)
          setGroups([response.data.group,...groups])
          onUpdateUser({
              ...user, 
              groupNames: [...user.groupNames, response.data.group.name],
              groups: [...user.groups, response.data.group._id]
            })
          history.push(`/group/${response.data.group.name}`)  
        } catch (error) {
          onError(error.response.data.errorMessage)
        }
    }

    const handleAddGroupPopUp = () => {
            setAddGroup(!addGroup)
    }

    const handleGroupSearch = (event) => {
        let filter = groups.filter(group => {
            let lcTags = group.tags.map(tag => tag.toLowerCase())[0]
            return (
                group.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
                lcTags.includes(event.target.value.toLowerCase()))
        })
        setFilteredGroups(filter)
    }

    if(groups.length === 0){
        return  <Animation width={300} height={300} animation={loading} />
    }

    return (
        <div>  
            <Navbar user={user} onUpdateUser={onUpdateUser} >      
      
               <IconButton onClick={handleAddGroupPopUp} 
                className="add-group-pos" 
               >
                <div className="add-btn">
                    <PeopleAltIcon style={{color: 'white'}}/> <AddIcon style={{color: 'white'}}/> 
                </div>
                </IconButton>
                <Container style={{ marginTop: "30px"}} >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}} className="fly-top">
                        <Typography variant="h3" gutterBottom align="center" color={showDarkTheme ? "inherit" : "primary"} style={{marginBottom: "50px"}}>
                            Explore our groups
                        </Typography>
                    <TextField 
                     className='searchbar'
                        style={{width: "200px",marginBottom: "30px"}}
                        variant="outlined"
                        onChange={handleGroupSearch} 
                        label="Search" 
                        size="medium"
                    />
                    </div>  
                    {
                     !addGroup && <Pagination data={filteredGroups} RenderComponent={GroupCard} dataLimit={10}/>
                    }
                </Container> 
            </Navbar> {
            addGroup && (
                    <div className="popupOpacity create-group">  
                        <AddGroup onAddGroupPopUp={handleAddGroupPopUp} onAddGroup={handleCreateGroup}/>
                    </div>
                    )
                }
            </div>
    )
}

export default ExploreGroupPage
