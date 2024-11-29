import React, { useState, useEffect } from 'react';
import { Button, Container, Box } from '@mui/material';
import Logo from '../assets/itinerary-logo.svg';
import './header.scss'
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avatarIcon from "../assets/avatar.png";
import lableDownLine from "../assets/lable_down-line.svg";
import { Link, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
// import ProfileDropdown from './profile-dropdown';
import Tooltip from '@mui/joy/Tooltip';
import CircularProgress from '@mui/joy/CircularProgress';


const HeaderComponent = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    // getAccessTokenSilently,
    // getAccessTokenWithPopup,
    const { isLoading, user, isAuthenticated, logout, loginWithPopup, getAccessTokenSilently, getIdTokenClaims } = useAuth0();

    const location = useLocation();


    useEffect(() => {
        if (isAuthenticated) {
            getAccessTokenSilently().then(r => {
                window.localStorage.setItem("token", r)
                if (!isLoading) {
                    window.localStorage.setItem("userId", user.sub)
                }
            })
            getIdTokenClaims().then((claims) => {
                // const idToken = claims.__raw;
                const idToken = claims
                // console.log(idToken)
                // console.log(user, 'user')
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
                        <img src={Logo} alt='logo' style={{ cursor: 'pointer' }} className='itinerary-logo' />
                    </Link>

                </Box>
                {/* <ProfileDropdown /> */}
                <Box className='d-flex align-items-center'>
                    {/* <Link to={location.pathname === "/" ? "/preferential-search" : '/'} className='text-decoration-none text-dark pt-3 home-search-link'>
                        <p >{location.pathname === "/" ? 'Preferential Search' : 'Home'}</p>

                    </Link>
                    <Link to={location.pathname === "/chatbot" ? "/chatbot" : "/chatbot"} className='text-decoration-none text-dark pt-3 home-search-link'>
                        <p>Chatbot</p>
                    </Link> */}
                    {!isLoading ?
                        <>
                            {!isAuthenticated ? <Button onClick={() => loginWithPopup()} variant='contained' size='small' className='header-login-btn-cls'>Login</Button> : null}
                            {isAuthenticated && <div style={{ cursor: 'pointer' }}>
                                <div onClick={avatarClick} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Avatar
                                        alt="John Doe"
                                        src={avatarIcon}
                                        className='header-profile-avatar-icon'
                                    />
                                    <div style={{ marginLeft: "8px", }} className='d-flex align-items-center profile-title-container'><Tooltip title={user?.nickname} variant="solid" className='text-capitalize'><h6 className='user-name me-2'>{user?.nickname}</h6></Tooltip>  <img src={lableDownLine} alt='lableDownLine' className='profile-show-icon' /></div>

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
                                        <Button onClick={() => {
                                            logout()
                                            window.localStorage.removeItem("token")
                                            window.localStorage.removeItem("userId")
                                        }} variant='contained' size='small'>Logout</Button>
                                    </MenuItem>
                                </Menu>
                            </div>}
                        </> : <CircularProgress variant="solid" />}
                </Box>
            </Container>

        </div>
    );
};

export default HeaderComponent;