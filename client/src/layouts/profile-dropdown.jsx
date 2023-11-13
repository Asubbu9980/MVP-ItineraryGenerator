import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import avatarIcon from "../assets/avatar.png";
import lableDownLine from "../assets/lable_down-line.svg";
const ProfileDropdown = () => {
    const [user, setUser] = useState(null)

    const [anchorEl, setAnchorEl] = useState(null);

    const avatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const avatarClose = () => {
        setAnchorEl(null);
    };
    const handleLogOut = () => {
        window.localStorage.removeItem("authUser");
    }
    useEffect(() => {
        if (window.localStorage.getItem("authUser")) {
            const obj = JSON.parse(window.localStorage.getItem("authUser"));
            console.log("obj", obj);
            setUser(obj);
        }
    }, [window.localStorage.getItem("authUser")]);
    return (
        <Box>
            <div style={{ cursor: 'pointer' }}>
                {
                    user == null ? <a className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' href='/login'> {"Login"}</a> : <><div onClick={avatarClick} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Avatar
                            alt={user.user.name}
                            src={avatarIcon}
                        />
                        <div style={{ marginLeft: "8px" }}>{user.user.name}   <img src={lableDownLine} alt='lableDownLine' /></div>
                    </div>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={avatarClose}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem onClick={() => handleLogOut()} >Logout</MenuItem>
                        </Menu>
                    </>
                }
            </div>
        </Box>
    );
};

export default ProfileDropdown;