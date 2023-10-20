import React from 'react';
import { TextField, Button, Container, Grid, Box } from '@mui/material';
import Logo from '../assets/logo.jpg';
const HeaderComponent = () => {
    return (
        <div className='header-container'>
        <Container>
            <Box style={{display:'flex', alignItems:'center', height:'75px'}} >
                <img  src={Logo} alt='logo'/>                
            </Box>
        </Container>

      </div>
    );
};

export default HeaderComponent;