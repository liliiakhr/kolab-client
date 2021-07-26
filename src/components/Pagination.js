import React, {useState} from 'react'
import PageNumbers from '@material-ui/lab/Pagination';
import {Grid} from '@material-ui/core';
import { Link } from 'react-router-dom';

function Pagination({ data, RenderComponent, dataLimit}) {
    
    const [pages] = useState(Math.ceil(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
  
    const changePage = (event, value) => {
        setCurrentPage(value);
    }
  
    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
      
    };
   
    return (
        <div>                                    
            <Grid   container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    spacing={4}
                >
                    {getPaginatedData().map((group, idx) => (
                       <Grid item xs={12} sm={6} key={idx}>
                         <div className={idx % 2 === 0 ? 'fly-left' : 'fly-right'}>
                            <Link to={`/group/${group.name}`} style={{ textDecoration: "none"}} >
                                <RenderComponent group={group}/>
                            </Link>
                         </div>
                    </Grid>
                ))}
             </Grid>
           <PageNumbers count={pages} page={currentPage} onChange={changePage} style={{marginTop: '30px'}}/>   
        </div>
    )
}

export default Pagination
