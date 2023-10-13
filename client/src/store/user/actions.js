import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_USERS,
    GET_USER_ROLES,
    ADD_NEW_USER,
    ADD_USER_FAIL,
    ADD_USER_SUCCESS,
    GET_USER,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL
} from "./actionTypes";

// common success
export const UsersApiResponseSuccess = (actionType, data) => ({
    type: API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

// common error
export const UsersApiResponseError = (actionType, error) => ({
    type: API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const getUsers = () => ({
    type: GET_USERS,
});

export const getUserRoles = () => ({
    type: GET_USER_ROLES,
});

export const getUser = id => ({
    type: GET_USER,
    payload: id,
});

export const addNewUser = media => ({
    type: ADD_NEW_USER,
    payload: media,
});

export const addUserSuccess = media => ({
    type: ADD_USER_SUCCESS,
    payload: media,
});

export const addUserFail = error => ({
    type: ADD_USER_FAIL,
    payload: error,
});


export const updateUser = media => ({
    type: UPDATE_USER,
    payload: media,
});

export const updateUserSuccess = media => ({
    type: UPDATE_USER_SUCCESS,
    payload: media,
});

export const updateUserFail = error => ({
    type: UPDATE_USER_FAIL,
    payload: error,
});