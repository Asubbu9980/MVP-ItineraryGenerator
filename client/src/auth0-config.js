// auth0-config.js
console.log(process.env.REACT_APP_AUTH0_DOMAIN, 'process.env.REACT_APP_AUTH0_DOMAIN')
console.log(process.env.REACT_APP_AUTH0_CLIENT_ID, 'process.env.REACT_APP_AUTH0_DOMAIN')
console.log(process.env.REACT_APP_AUTH0_REDIRECT_URL, 'process.env.REACT_APP_AUTH0_DOMAIN')
export const authConfig = {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URL,
};
