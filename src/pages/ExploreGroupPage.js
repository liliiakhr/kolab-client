import React from 'react'
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import SignupGroupPage from './SignupGroupPage';
// import LandingPage from '../pages/LandingPage'


function ExploreGroupPage({user, onUpdateUser}) {
    return (
        <div>
            <Navbar user={user} onUpdateUser={onUpdateUser} >
                <SignupGroupPage />
            </Navbar>
        </div>
    )
}

export default ExploreGroupPage
