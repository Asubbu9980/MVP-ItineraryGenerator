import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Box } from '@mui/material';
import Logo from '../assets/logo.jpg';
import './header.css'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avatarIcon from "../assets/avatar.png";
import lableDownLine from "../assets/lable_down-line.svg";
import { Link, useLocation } from 'react-router-dom'
const HeaderComponent = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();
    console.log(location.pathname)
    const avatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const avatarClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className='header-container'>
            <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box style={{ display: 'flex', alignItems: 'center', height: '75px' }} >
                    <img src={Logo} alt='logo' style={{ cursor: 'pointer' }} />
                </Box>
                <Box className='d-flex align-items-center'>
                    <Link to={location.pathname === "/" ? "/homesearch" : '/'} className='text-decoration-none text-dark fw-semibold mx-3 pt-3 home-search-link'>
                        <p >{location.pathname === "/" ? 'New Home Search' : 'Old Home Search'}</p>
                    </Link>
                    <div style={{ cursor: 'pointer' }}>
                        <div onClick={avatarClick} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Avatar
                                alt="John Doe"
                                src={avatarIcon}
                            />
                            <div style={{ marginLeft: "8px" }}>John Deo   <img src={lableDownLine} alt='lableDownLine' /></div>
                        </div>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={avatarClose}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </Menu>
                    </div>
                </Box>
            </Container>
        </div>
    );
};
export default HeaderComponent;