import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from "./store";
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
      <Provider store={configureStore({})}>
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          redirectUri={window.location.origin}
          
        >
          <LoaderProvider>
            <TripPayloadContextProvider>
              <Route />
            </TripPayloadContextProvider>

          </LoaderProvider>
        </Auth0Provider>
      </Provider>
    </React.Fragment>
  );
}

export default App;
