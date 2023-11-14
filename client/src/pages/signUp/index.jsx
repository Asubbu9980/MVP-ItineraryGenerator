import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {
    LoginSocialGoogle,

} from 'reactjs-social-login'
import {

    GoogleLoginButton,
} from 'react-social-login-buttons'

import { createUserApi } from "../../helpers/users_helper.js"
import { TextField, Button, Container, Grid } from '@mui/material';
const SignUpPage = () => {

    // const [checked, setChecked] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    // const onLoginStart = useCallback(() => {
    //     // alert('login start')
    // }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = "Enter Name";
        }
        if (!formData.email) {
            newErrors.email = "Enter email id";
        }
        if (!formData.password) {
            newErrors.password = "Enter password";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            createUserApi({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                provider: 'email',
            }).then((res) => {
                if (res?.status === true) {
                    toast.success("Registered Successfully", { autoClose: 3000 });
                    setFormData({ name: '', email: '', password: '' });
                    setErrors({});
                } else {
                    toast.warning(res?.message, { autoClose: 3000 });
                    setFormData({ name: '', email: '', password: '' });
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }
    return (
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
                                        label="Name"
                                        fullWidth
                                        type="text"
                                        variant="outlined"
                                        className='custom-input'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        InputProps={{
                                        }}
                                        error={!!errors.name}

                                    />
                                    {errors.name && <div style={{ color: 'red', fontSize: '12px' }}>{errors.name}</div>}

                                </Grid>
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
                                    {errors.email && <div style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>}

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
                                    {errors.password && <div style={{ color: 'red', fontSize: '12px' }}>{errors.password}</div>}

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
                                Sign Up
                            </Button>
                            <div className='loginSocial'>
                                {/* <div className='facebook'>
                                    <LoginSocialFacebook
                                        appId={process.env.REACT_APP_FB_APP_ID || ''}
                                    // onLoginStart={onLoginStart}
                                    // onResolve={({ provider, data }) => {
                                    //     setProvider(provider)
                                    //     setProfile(data)
                                    // }}
                                    // onReject={(err) => {
                                    //     console.log(err)
                                    // }}
                                    >
                                        <FacebookLoginButton />
                                    </LoginSocialFacebook>
                                </div> */}
                                <div className='google'>
                                    <LoginSocialGoogle
                                        scope=' https://www.googleapis.com/auth/userinfo.email'
                                        client_id={process.env.REACT_APP_GG_APP_ID || ''}
                                        // onLoginStart={onLoginStart}
                                        onResolve={({ provider, data }) => {
                                            console.log("data", data);
                                            createUserApi({
                                                profile_url: data.picture,
                                                name: data.name,
                                                email: data.email,
                                                provider: 'google',
                                                isEmailVerified: data.email_verified
                                            }).then((res) => {
                                                if (res?.status === true) {
                                                    toast.success("Registered Successfully", { autoClose: 3000 });
                                                } else {
                                                    toast.warning(res?.message, { autoClose: 3000 });
                                                }
                                            }).catch((error) => {
                                                toast.error(error, { autoClose: 3000 });
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
    );
};

export default SignUpPage;