import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Invoice Redux States
import {
    ADD_NEW_USER,
    GET_USERS,
    GET_USER,
    UPDATE_USER,
    GET_USER_ROLES,
} from "./actionTypes";

import {
    UsersApiResponseSuccess,
    UsersApiResponseError,
    addNewUser,
    addUserFail,
    updateUserSuccess,
    updateUserFail,
    addUserSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
    getUsersApi,
    getUserRolesApi,
    createUserApi,
    // getUSERAPI,
    // updateUSERAPI
} from "../../helpers/users_helper";

function* getUsers() {
    try {
        const response = yield call(getUsersApi);
        yield put(UsersApiResponseSuccess(GET_USERS, response?.data));
    } catch (error) {
        yield put(UsersApiResponseError(GET_USERS, error));
    }
}

function* getUserRoles() {
    try {
        const response = yield call(getUserRolesApi);
        yield put(UsersApiResponseSuccess(GET_USER_ROLES, response?.data));
    } catch (error) {
        yield put(UsersApiResponseError(GET_USER_ROLES, error));
    }
}


function* onAddNewUser({ payload: user }) {
    try {
        const response = yield call(createUserApi, user);
        yield put(addUserSuccess(response));
        toast.success("USER Added Successfully", { autoClose: 3000 });
    } catch (error) {
        yield put(addUserFail(error));
        toast.error("USER Added Failed", { autoClose: 3000 });
    }
}


export function* watchGetUsers() {
    yield takeEvery(GET_USERS, getUsers);
}
export function* watchGetUserRoles() {
    yield takeEvery(GET_USER_ROLES, getUserRoles);
}


// export function* watchGetUSER() {
//     yield takeEvery(GET_USER, getUSER);
// }

// export function* watchUpdateUSER() {
//     yield takeEvery(UPDATE_USER, onUpdateUSER);
// }

// export function* watchDeleteTodo() {
//     yield takeEvery(DELETE_TODO, onDeleteTodo);
// }

export function* watchAddNewUser() {
    yield takeEvery(ADD_NEW_USER, onAddNewUser);
}



function* USERS() {
    yield all([
        fork(watchGetUsers),
        fork(watchGetUserRoles),
        fork(watchAddNewUser),
        // fork(watchGetUSER),
        // fork(watchAddNewTodo),
        // fork(watchUpdateUSER)
    ]);
}

export default USERS;