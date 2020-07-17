import {apiCall, setTokenHeader} from "../../services/api";
import {SET_CURRENT_USER} from "../actionTypes";
import {addError, removeError} from "./errors";

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user: user
    }
}

export const setAuthorizationToken = token => {
    setTokenHeader(token);
}

export const authUser = (type, userData) => {
    return dispatch => {
        return new Promise(((resolve, reject) => {
            return apiCall("post", `/api/auth/${type}`, userData)
                .then(({token, ...user}) => {
                    // 如果apiCall成功了，这里的then就会执行
                    localStorage.setItem("jwtToken", token);
                    dispatch(setCurrentUser(user));
                    setTokenHeader(token);
                    dispatch(removeError());
                    resolve(); // resolve指的就是authUser套的then
                })
                .catch(err => {
                    dispatch(addError(err.message));
                    reject();
                });
        }))
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}