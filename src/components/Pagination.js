import React, {useState} from 'react'
import PageNumbers from '@material-ui/lab/Pagination';
import {Grid} from '@material-ui/core';
import { Link } from 'react-router-dom';

function Pagination({ data, RenderComponent, dataLimit}) {
    
    const [pages] = useState(Math.round(data.length / dataLimit));
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
     
             <div className="dataContainer">
                    {getPaginatedData().map((group, idx) => (
                       <Grid item xs={12} sm={6} key={idx}>
                         <div className={idx % 2 === 0 ? 'fly-left' : 'fly-right'}>
                            <Link to={`/${group._id}`} style={{ textDecoration: "none"}} >
                                <RenderComponent group={group}/>
                            </Link>
                         </div>
                    </Grid>
                ))}
             </div>
           {
             data.length > 10 && <PageNumbers count={pages} page={currentPage} onChange={changePage}/> 
           }
             
        </div>
    )
}

export default Pagination
