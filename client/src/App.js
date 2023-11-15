import React from 'react';

//imoprt Route
import Route from './routes';
import { auth0 } from "./config";
import { Auth0Provider } from '@auth0/auth0-react';
import { LoaderProvider } from './context/LoaderContext';
import { TripPayloadContextProvider } from './context/TripDataContext';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <React.Fragment>
      <Auth0Provider
        domain={auth0.domain}
        clientId={auth0.clientId}
        redirectUri={auth0.redirectUri}
      >
        <LoaderProvider>
          <TripPayloadContextProvider>
            <Route />
          </TripPayloadContextProvider>

        </LoaderProvider>
      </Auth0Provider>
    </React.Fragment>
  );
}

export default App;
