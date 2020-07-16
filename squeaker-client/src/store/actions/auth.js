import {apiCall} from "../../services/api";
import {SET_CURRENT_USER} from "../actionTypes";

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user: user
    }
}

export const authUser = (type, userData) => {
    return dispatch => {
        return new Promise(((resolve, reject) => {
            return apiCall("post", `/api/auth/${type}`, userData)
                .then(({token, ...user}) => {
                    localStorage.setItem("jwtToken", token);
                    dispatch(setCurrentUser(user));
                    resolve();
                })
                .catch(err => {
                    reject();
                })

        }))
    }
}