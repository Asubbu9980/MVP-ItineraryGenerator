import {
    API_RESPONSE_SUCCESS,
    API_RESPONSE_ERROR,
    GET_USERS,
    GET_USER_ROLES,
    ADD_USER_FAIL,
    ADD_USER_SUCCESS,
    GET_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL
} from "./actionTypes";

const INIT_STATE = {
    users: [],
    user: null,
    selectboxUsers: [],
    userRoles: [],
    selectboxUserRoles: [],
    success: {},
    error: {},
};

const Users = (state = INIT_STATE, action) => {
    const options = [];
    const roleOptions = [];
    switch (action.type) {
        case API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case GET_USERS:
                    action.payload.data.forEach(element => {
                        if ((element.deleted_by == '' || element.deleted_by == null) && element.user_status == 'active') {
                            options.push({
                                label: element.user_name + ' - ' + element.email,
                                value: element.id,
                                slug: element.slug
                            })
                        }
                    });
                    return {
                        ...state,
                        users: action.payload.data,
                        selectboxUsers: options,
                    };
                case GET_USER_ROLES:
                    action.payload.data.forEach(element => {
                        if (element.status == '1') {
                            roleOptions.push({
                                label: element.role_name,
                                value: element.id,
                            })
                        }

                    });
                    return {
                        ...state,
                        userRoles: action.payload.data,
                        selectboxUserRoles: roleOptions,
                    };
                case GET_USER:
                    return {
                        ...state,
                        user: action.payload.data,
                    };
                default:
                    return { ...state };
            }
        case API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case GET_USERS:
                    return {
                        ...state,
                        error: action.payload.error,
                    };
                default:
                    return { ...state };
            }
        case ADD_USER_SUCCESS:
            return {
                ...state,
                success: action.payload
            };
        case ADD_USER_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                success: action.payload
            };
        case UPDATE_USER_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return { ...state };
    }
};

export default Users;