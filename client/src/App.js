import React from 'react';

//imoprt Route
import Route from './routes';
import { LoaderProvider } from './context/LoaderContext';
function App() {
  return (
    <React.Fragment>
      <LoaderProvider>
        <Route />
      </LoaderProvider>

    </React.Fragment>
  );
}

export default App;
