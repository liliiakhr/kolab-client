import React from 'react'
import Animation from '../components/Animation'
import swingingPenguin from '../json/swingingPenguin.json'
import partyGiraffe from '../json/partyGiraffe.json'
import squirtle from '../json/squirtle.json'
import morty from '../json/morty.json'
import {Typography} from '@material-ui/core'


function AysPage() {
    return (
    <div className="party" style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '-50px'}}>
            <Animation height={500} width={500} animation={swingingPenguin}/>
        </div>
        <div style={{display: 'flex',alignItems: 'center' ,position: 'absolute', marginTop: '200px'}}>
           <Animation height={500} width={500} animation={partyGiraffe}/>
           <div>
           <Typography variant="h1" className='fly-left' >Sorry Manish</Typography>
           <Typography variant="h1" className='fly-right' >The bug just left the party ....</Typography>
           </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <Animation height={300} width={300} animation={squirtle}/>
            <Animation height={300} width={300} animation={morty}/>
        </div>
        
    </div>
    )
}

export default AysPage
