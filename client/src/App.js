import React from 'react';
//imoprt Route
import Route from './routes';
import { LoaderProvider } from './context/LoaderContext';
import { TripPayloadContextProvider } from './context/TripDataContext';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {

  return (
    <React.Fragment>
      <LoaderProvider>
        <TripPayloadContextProvider>
          <Route />
        </TripPayloadContextProvider>
      </LoaderProvider>
    </React.Fragment>
  );
}

export default App;

