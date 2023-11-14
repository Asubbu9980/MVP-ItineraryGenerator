import React from 'react';
import { auth0 } from "./config";
//imoprt Route
import Route from './routes';
import { LoaderProvider } from './context/LoaderContext';
import { Auth0Provider } from '@auth0/auth0-react';
function App() {
  return (
    <React.Fragment>
      <Auth0Provider
        domain={auth0.domain}
        clientId={auth0.clientId}
        authorizationParams={{
          redirect_uri: auth0.redirectUri
        }}
      >
        <LoaderProvider>
          <Route />
        </LoaderProvider>
      </Auth0Provider>
    </React.Fragment>
  );
}

export default App;
