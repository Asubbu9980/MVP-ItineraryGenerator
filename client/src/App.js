import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from "./store";
//imoprt Route
import Route from './routes';
import { auth0 } from "./config";
import { Auth0Provider } from '@auth0/auth0-react';
import { LoaderProvider } from './context/LoaderContext';
import { TripPayloadContextProvider } from './context/TripDataContext';
import { CaptchaProvider } from './context/CaptchaVerifyContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <React.Fragment>
      <Provider store={configureStore({})}>
        <Auth0Provider
          domain={auth0.domain}
          clientId={auth0.clientId}
          redirectUri={window.location.origin}
        >
          <LoaderProvider>
            <CaptchaProvider>
              <TripPayloadContextProvider>
                <Route />
              </TripPayloadContextProvider>
            </CaptchaProvider>
          </LoaderProvider>
        </Auth0Provider>
      </Provider>
    </React.Fragment>
  );
}

export default App;
