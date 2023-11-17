import React, { useState, useEffect } from 'react';
import { Button, Container, Box } from '@mui/material';
import Logo from '../assets/logo.jpg';
import './header.css'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avatarIcon from "../assets/avatar.png";
import lableDownLine from "../assets/lable_down-line.svg";
import { Link, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
// import ProfileDropdown from './profile-dropdown';
import Tooltip from '@mui/joy/Tooltip';


const HeaderComponent = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const { user, isAuthenticated, logout, loginWithPopup, getIdTokenClaims } = useAuth0();

    const location = useLocation();


    useEffect(() => {
        if (isAuthenticated) {
            getIdTokenClaims().then((claims) => {
                // const idToken = claims.__raw;
                const idToken = claims
                console.log(idToken)
                console.log(user, 'user')
                // setAuthorization(idToken);

            });
        }
    }, [isAuthenticated]);

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
                    <Link to='/' className='text-decoration-none'>
                        <img src={Logo} alt='logo' style={{ cursor: 'pointer' }} />
                    </Link>

                </Box>
                {/* <ProfileDropdown /> */}
                <Box className='d-flex align-items-center'>
                    <Link to={location.pathname === "/" ? "/preferential-search" : '/'} className='text-decoration-none text-dark mx-3 pt-3 home-search-link'>
                        <p >{location.pathname === "/" ? 'Preferential Search' : 'Home'}</p>
                    </Link>
                    {!isAuthenticated ? <Button onClick={() => loginWithPopup()} variant='contained' size='small'>Login</Button> : null}
                    {isAuthenticated && <div style={{ cursor: 'pointer' }}>
                        <div onClick={avatarClick} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Avatar
                                alt="John Doe"
                                src={avatarIcon}
                            />
                            <div style={{ marginLeft: "8px", }} className='d-flex align-items-center'><Tooltip title={user?.nickname} variant="solid" className='text-capitalize'><h6 className='user-name me-2'>{user?.nickname}</h6></Tooltip>  <img src={lableDownLine} alt='lableDownLine' /></div>

                        </div>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={avatarClose}
                        >
                            <MenuItem className='user-profile-links' onClick={avatarClose}>Profile</MenuItem>
                            <MenuItem onClick={avatarClose}><Link to='/recent-searches' className='text-decoration-none text-dark user-profile-links'>Recent Searches</Link></MenuItem>
                            {/* <MenuItem>Settings</MenuItem> */}
                            <MenuItem>
                                <Button onClick={() => logout()} variant='contained' size='small'>Logout</Button>
                            </MenuItem>
                        </Menu>
                    </div>}
                </Box>
            </Container>

        </div>
    );
};

export default HeaderComponent;