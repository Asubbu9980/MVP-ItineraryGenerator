import React, { useCallback, useState } from 'react'
import {
    LoginSocialGoogle,
    LoginSocialFacebook,
} from 'reactjs-social-login'
import {
    FacebookLoginButton,
    GoogleLoginButton,
} from 'react-social-login-buttons'

import { createUserApi } from "../../helpers/users_helper.js"


import Card from '@mui/material/Card';
// import './login.css'
import Box from '@mui/material/Box';
import { TextField, Button, Container, Grid } from '@mui/material';
import { AccountCircle, VpnKey } from '@mui/icons-material';

import puzzleIcon from '../../assets/puzzle-icon.png';
import Checkbox from '@mui/material/Checkbox';


const LoginPage = () => {
    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState(null)
    const onLoginStart = useCallback(() => {
        // alert('login start')
    }, [])

    const onLogoutSuccess = useCallback(() => {
        setProfile(null)
        setProvider('')
        // alert('logout success')
    }, [])
    const decodeJwt = (token) => {
        var base64Payload = token.split(".")[1];
        var payload = decodeURIComponent(
            atob(base64Payload)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );
        return JSON.parse(payload);
    }
    console.log(decodeJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ODJlZGU4ZC1kODVkLTQ4NWQtODBiZi01ODdhYjM2ZDFjODEiLCJpYXQiOjE2OTU3MTE0MTMsImV4cCI6MTY5ODMwMzQxMywidHlwZSI6InJlZnJlc2gifQ.tPQuhtS1L61nLYZYGh5HBc211JlJqLa2uM8j6_zJXkY"));

    const [checked, setChecked] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Enter email id";
            console.log('d');
        }
        if (!formData.password) {
            newErrors.password = "Enter password";
            console.log('df');

        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            console.log(formData);
            setFormData({ email: '', password: '' });
            setErrors({});

        }
    }

    return (
        <>
            {provider && profile ? (
                JSON.stringify(profile)
                // <User provider={provider} profile={profile} onLogout={onLogoutSuccess} />
            ) : (
                <div className={`App ${provider && profile ? 'hide' : ''}`}>
                    {/* <h1 className='title'>ReactJS Social Login</h1> */}
                    {/* <LoginSocialFacebook
                        appId={process.env.REACT_APP_FB_APP_ID || ''}
                        onLoginStart={onLoginStart}
                        onResolve={({ provider, data }) => {
                            setProvider(provider)
                            setProfile(data)
                        }}
                        onReject={(err) => {
                            console.log(err)
                        }}
                    >
                        <FacebookLoginButton />
                    </LoginSocialFacebook>

                    <LoginSocialGoogle
                        scope=' https://www.googleapis.com/auth/userinfo.email'
                        client_id={process.env.REACT_APP_GG_APP_ID || ''}
                        onLoginStart={onLoginStart}
                        onResolve={({ provider, data }) => {
                            setProvider(provider)
                            setProfile(data)
                            createUserApi({
                                profile_url: data.picture,
                                name: data.name,
                                email: data.email,
                                provider: 'google',
                                isEmailVerified: data.email_verified
                            }).then((res) => {
                                console.log("res", res);
                            }).catch((err) => {
                                console.log(err)
                            })
                        }}
                        onReject={(err) => {
                            console.log(err)
                        }}
                    >
                        <GoogleLoginButton />
                    </LoginSocialGoogle> */}
                </div>
            )}

            <div className='login-sing-container container-fluid'>
                <Grid container spacing={2} style={{ height: "100vh" }}>
                    <Grid item xs={12} sm={12} style={{ background: '#F1F4FE' }}>
                        <Container maxWidth="xs" className='boxCenter' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: ' calc(100vh - 60px)' }} >
                            <form className='form' onSubmit={handleSubmit} autoComplete='off'>
                                <h1 className='heading'>Sign In</h1>
                                <p className='subtext'>Hey, Enter your details to get sign in to your account </p>
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <TextField
                                            label="Email"
                                            fullWidth
                                            type="text"
                                            variant="outlined"
                                            className='custom-input'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            InputProps={{
                                            }}
                                            error={!!errors.email}

                                        />
                                        {errors.email && <div style={{ color: 'red', fontSize:'12px' }}>{errors.email}</div>}

                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Password"
                                            fullWidth
                                            type="password"
                                            variant="outlined"
                                            className='custom-input'
                                            name='password'
                                            onChange={handleChange}
                                            value={formData.password}
                                            error={!!errors.password}

                                            InputProps={{
                                            }}

                                        />
                                        {errors.password && <div style={{ color: 'red', fontSize:'12px' }}>{errors.password}</div>}

                                    </Grid>
                                    <Grid className='remember-grid' >
                                        {/* <div className='remember-me'>
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleCheckboxChange}
                                            color="primary" // You can change the color (primary, secondary, default)
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <label>Remember Me</label>
                                    </div> */}
                                        <div className='forgotPassword'>
                                            <p style={{ margin: '0' }}>Forgot Password?</p>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    className='btn'
                                    type='submit'
                                >
                                    Sign In
                                </Button>
                                <div className='loginSocial'>
                                    <div className='facebook'>
                                    <LoginSocialFacebook
                                        appId={process.env.REACT_APP_FB_APP_ID || ''}
                                        onLoginStart={onLoginStart}
                                        onResolve={({ provider, data }) => {
                                            setProvider(provider)
                                            setProfile(data)
                                        }}
                                        onReject={(err) => {
                                            console.log(err)
                                        }}
                                    >
                                        <FacebookLoginButton />
                                    </LoginSocialFacebook>
                                    </div>
                                    <div className='google'>
                                    <LoginSocialGoogle
                                        scope=' https://www.googleapis.com/auth/userinfo.email'
                                        client_id={process.env.REACT_APP_GG_APP_ID || ''}
                                        onLoginStart={onLoginStart}
                                        onResolve={({ provider, data }) => {
                                            setProvider(provider)
                                            setProfile(data)
                                            createUserApi({
                                                profile_url: data.picture,
                                                name: data.name,
                                                email: data.email,
                                                provider: 'google',
                                                isEmailVerified: data.email_verified
                                            }).then((res) => {
                                                console.log("res", res);
                                            }).catch((err) => {
                                                console.log(err)
                                            })
                                        }}
                                        onReject={(err) => {
                                            console.log(err)
                                        }}
                                    >
                                        <GoogleLoginButton />
                                    </LoginSocialGoogle>
                                    </div>
                                </div>
                            </form>
                        </Container>
                    </Grid>
                    {/* <Grid item xs={12} sm={3} className='login-slider' >
                </Grid> */}
                </Grid>
            </div>

        </>
    );
};

export default LoginPage;