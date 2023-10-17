import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();


export const getUsersApi = (users) => api.get(url.USERS, users);
export const getUserRolesApi = (roles) => api.get(url.USERS, roles);
export const createUserApi = (user) => api.create(url.USERS, user);
export const loginUserApi = (user) => api.create(url.USERS, user);

