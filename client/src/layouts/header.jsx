import React, { useState } from 'react';

import { TextField, Button, Container, Grid, Box } from '@mui/material';
import Logo from '../assets/logo.jpg';
import './header.css'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avatarIcon from "../assets/avatar.png";
import lableDownLine from "../assets/lable_down-line.svg";
import ProfileDropdown from './profile-dropdown';


const HeaderComponent = () => {

    return (
        <div className='header-container'>
            <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box style={{ display: 'flex', alignItems: 'center', height: '75px' }} >
                    <img src={Logo} alt='logo' style={{ cursor: 'pointer' }} />
                </Box>
                <ProfileDropdown />
            </Container>

        </div>
    );
};

export default HeaderComponent;