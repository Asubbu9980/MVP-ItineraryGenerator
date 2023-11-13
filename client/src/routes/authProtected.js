import React, { useEffect, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../hooks/UserHooks";
import { useAuth0 } from '@auth0/auth0-react';
import LoaderContext from "../context/LoaderContext";
import { Backdrop, CircularProgress } from '@mui/material';

// import { logoutUser } from "../store/actions";

// const AuthProtected = (props) => {
//   const dispatch = useDispatch();
//   const { userProfile, loading, token } = useProfile();
//   useEffect(() => {
//     if (userProfile && !loading && token) {
//       setAuthorization(token);
//     } else if (!userProfile && loading && !token) {
//       // dispatch(logoutUser());
//     }
//   }, [token, userProfile, loading, dispatch]);

//   /*
//     redirect is un-auth access protected routes via url
//     */

// if (!userProfile && loading && !token) {
//   return (
//     <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
//   );
// }

// return <>{props.children}</>;
// };

const AuthProtected = (props) => {
  const { user, isLoading, loginWithRedirect, isAuthenticated, getIdTokenClaims } = useAuth0();

  const loaderContext = useContext(LoaderContext);


  useEffect(() => {
    if (isAuthenticated) {
      getIdTokenClaims().then((claims) => {
        // const idToken = claims.__raw;
        const idToken = claims
        console.log(idToken)
        console.log(user, 'user')
        // setAuthorization(idToken);

      });
    }
  }, [isAuthenticated]);

  if (isLoading) {
    const LoaderBackdrop = {
      color: '#fff',
      zIndex: 1350
    }
    return (
      <div>
        <Backdrop sx={LoaderBackdrop} open={true}>
          <CircularProgress size={50} color="inherit" />
        </Backdrop>
      </div>
    )
  } else {
    // loaderContext.startLoading(false);

    if (!isAuthenticated) {

      loginWithRedirect()

    }
    return <>{props.children}</>
  }
}

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };