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

const SignUpPage = () => {
    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState(null)
    const onLoginStart = useCallback(() => {
        alert('login start')
    }, [])

    const onLogoutSuccess = useCallback(() => {
        setProfile(null)
        setProvider('')
        alert('logout success')
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
    // console.log(decodeJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ODJlZGU4ZC1kODVkLTQ4NWQtODBiZi01ODdhYjM2ZDFjODEiLCJpYXQiOjE2OTU3MTE0MTMsImV4cCI6MTY5ODMwMzQxMywidHlwZSI6InJlZnJlc2gifQ.tPQuhtS1L61nLYZYGh5HBc211JlJqLa2uM8j6_zJXkY"));
    return (
        <>
            {provider && profile ? (
                JSON.stringify(profile)
                // <User provider={provider} profile={profile} onLogout={onLogoutSuccess} />
            ) : (
                <div className={`App ${provider && profile ? 'hide' : ''}`}>
                    <h1 className='title'>ReactJS Social Login</h1>
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
            )}
        </>
    );
};

export default SignUpPage;