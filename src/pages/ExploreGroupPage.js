import Navbar from '../components/Navbar';
import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import GroupCard from '../components/GroupCard';
import { Container, Typography, Grid, Button } from '@material-ui/core';
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

function ExploreGroupPage({onError, onSuccess, history}) {

    const [groups, setGroups] = useState([]);
    const [addGroup, setAddGroup] = useState(false);
    const {user, onUpdateUser} = useContext(UserContext);

    useEffect(() => {
        let getGroups = async () => {
            let response = await axios.get(`${API_URL}/api/groups`, {withCredentials: true})
            setGroups(response.data)
        }
        getGroups()
    }, [])

    let handleCreateGroup = async (event) => {
        event.preventDefault()

        const {name, description, category, tags} = event.target

     
        try{
            let imgResponse = '' 
            if (event.target.imageUrl.value) {
                var formData = new FormData();
                formData.append('imageUrl', event.target.imageUrl.files[0]);
                imgResponse = await axios.post(`${API_URL}/api/upload`, formData);
            }

            let groupData = {
                name: name.value.trim(),
                image_url: imgResponse.data ? imgResponse.data.image_url : '',
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

    if(groups.length === 0){
        return  <Animation width={300} height={300} animation={loading} />
    }

    return (
        <div>  
            <Navbar user={user} onUpdateUser={onUpdateUser} >               
               <IconButton onClick={handleAddGroupPopUp} >
                <div style={{borderRadius: '50%', width: '100px', height: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#55ABB1'}}>
                <PeopleAltIcon style={{color: 'white'}}/> <AddIcon style={{color: 'white'}}/> 
                </div>
                </IconButton>
                <Container style={{ marginTop: "60px"}} >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}} className="fly-top">
                        <Typography variant="h3" gutterBottom align="center" color="primary" style={{marginBottom: "50px"}}>
                            Explore our groups
                        </Typography>
                    </div>
                    {
                     !addGroup && <Pagination data={groups} RenderComponent={GroupCard} dataLimit={10}/>
                    }
                </Container> 
            </Navbar> {
            addGroup && (
                    <div className="popupOpacity">  
                        <AddGroup onAddGroupPopUp={handleAddGroupPopUp} onAddGroup={handleCreateGroup}/>
                    </div>
                    )
                }
            </div>
    )
}

export default ExploreGroupPage
