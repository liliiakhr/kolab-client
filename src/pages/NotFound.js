import React from 'react';
import Animation from '../components/Animation'
import notFoundAnimation from '../json/notFound.json';
import {Container, Grid } from '@material-ui/core';

function NotFound() {
    return (
        <div>
        <Container>
        <Animation width={500} height={500} animation={notFoundAnimation} />

        </Container>
        </div>
    )
}

export default NotFound
