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
    useEffect(() => {
        if (window.localStorage.getItem("authUser")) {
            const obj = JSON.parse(window.localStorage.getItem("authUser"));
            console.log("obj", obj);
            setUser(obj);
        }
    }, []);
    return (
        <Box>
            <div style={{ cursor: 'pointer' }}>
                {
                    user == null ? <>{"Login"}</> : <><div onClick={avatarClick} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                            <MenuItem>Logout</MenuItem>
                        </Menu>
                    </>
                }
            </div>
        </Box>
    );
};

export default ProfileDropdown;