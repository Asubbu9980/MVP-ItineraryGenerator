import React from 'react';
import { Switch, Route } from "react-router-dom";

//Layouts
import UserLayout from "../layouts/index";
//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected, AccessRoute } from './authProtected';

const Index = () => {
    const availablePublicRoutesPaths = publicRoutes.map((r) => r.path);
    const availableAuthRoutesPath = authProtectedRoutes.map((r) => r.path);
    return (
        <React.Fragment>
            <Switch>
                <Route path={availablePublicRoutesPaths}>
                    <UserLayout>
                        <Switch>
                            {publicRoutes.map((route, idx) => (
                                <Route
                                    path={route.path}
                                    component={route.component}
                                    key={idx}
                                    exact={true}
                                />
                            ))}
                        </Switch>
                    </UserLayout>
                </Route>
            </Switch>
        </React.Fragment>
    );
};

export default Index;