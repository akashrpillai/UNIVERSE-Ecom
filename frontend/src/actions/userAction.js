import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
} from '../constants/userConst'
import axios from "axios";


//LOGIN USER
export const login = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOGIN_REQUEST });
            const config = { headers: { "Content-Type": "application/json" } }; 

            const { data } = await axios.post(`/api/v1/login`, { email, password }, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data.user
            })
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.message,
            });
        }


    }
}

// REGISTER USER
export const register = (userData) => async (dispatch) => {

    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };  //for image

        const { data } = await axios.post(`/api/v1/register`, userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
       
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// GET user Details when User is Loged In

export const loadUser = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOAD_USER_REQUEST });

            const { data } = await axios.get(`/api/v1/me`);

            dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
        } catch (error) {
            console.log(error)
            dispatch({
                type: LOAD_USER_FAIL,
                payload: error.response.data.message,
            });
        }

    }
}

// LOGOUT User
export const logOut = () => {
    return async (dispatch) => {
        try {

            await axios.get(`/api/v1/logout`);
            dispatch({ type: LOGOUT_USER_SUCCESS });
        } catch (error) {
           
            dispatch({
                type: LOGOUT_USER_FAIL,
                payload: error.response.data.message,
            });
        }

    }
}

// UPDATE user's Profile 
export const updateProfile = (userData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATE_PROFILE_REQUEST });

            const config = { headers: { "Content-Type": "multipart/form-data" } };

            const { data } = await axios.put(`/api/v1/me/update`, userData, config);
            dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: error.response.data.message,
            });
        }
    }
}
// UPDATE User's Password
export const updateUserPassword = (passwords) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATE_PASSWORD_REQUEST });

            const config = { headers: { "Content-Type": "application/json" } };

            const { data } = await axios.put(`/api/v1/password/update`, passwords, config);
            dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
        } catch (error) {
            dispatch({
                type: UPDATE_PASSWORD_FAIL,
                payload: error.response.data.message,
            });
        }
    }
}

// FORGOT Password
export const forgotPassword = (email) => {
    return async (dispatch) => {
        try {
            dispatch({ type: FORGOT_PASSWORD_REQUEST });
            const config = { headers: { "Content-Type": "application/json" } }; 

            const { data } = await axios.post(`/api/v1/password/forgot`, email, config);
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                payload: data.message
            })
        } catch (error) {
            dispatch({
                type: FORGOT_PASSWORD_FAIL,
                payload: error.response.data.message,
            });
        }


    }
}
// RESET Password
export const resetPassword = (token,passwords) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_PASSWORD_REQUEST });
            const config = { headers: { "Content-Type": "application/json" } }; 
            const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: data.success
            })
        } catch (error) {
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload: error.response.data.message,
            });
        }


    }
}
// Admin Actions 
// Get all users
export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: ALL_USERS_REQUEST });

            const { data } = await axios.get(`/api/v1/admin/users`);

            dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
        } catch (error) {
            console.log(error)
            dispatch({
                type: ALL_USERS_FAIL,
                payload: error.response.data.message,
            });
        }

    }
}

// Get user Details
export const getUserDetails = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: USER_DETAILS_REQUEST });

            const { data } = await axios.get(`/api/v1/admin/user/${id}`);

            dispatch({ type: USER_DETAILS_SUCCESS, payload: data.userDetails });
        } catch (error) {
            console.log(error)
            dispatch({
                type: USER_DETAILS_FAIL,
                payload: error.response.data.message,
            });
        }

    }
}

// UPDATE user's Role by Admin
export const updateUser = (id,userData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATE_USER_REQUEST });

            const config = { headers: { "Content-Type": "multipart/form-data" } };

            const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config);
            dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
        } catch (error) {
            dispatch({
                type: UPDATE_USER_FAIL,
                payload: error.response.data.message,
            });
        }
    }
}

// Delete users
export const deleteUser = (id) => {
    console.log("da",id)
    return async (dispatch) => {
        try {
            dispatch({ type: DELETE_USER_REQUEST });

            const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

            dispatch({ type: DELETE_USER_SUCCESS, payload: data});
            console.log("data a",data)
        } catch (error) {
            dispatch({
                type: DELETE_USER_FAIL,
                payload: error.response.data.message,
            });
        }
    }
}

// Clear the Errors
export const clearError = () => {
    return function (dispatch) {
        dispatch({ type: CLEAR_ERRORS })
    }
}