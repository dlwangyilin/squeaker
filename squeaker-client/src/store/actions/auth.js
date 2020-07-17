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
    /*
    书签2会call这个函数 入参是 (auth.type, this state).
    这个函数开始执行时，因为返回promise, 所以会先执行函数内部的apiCall.
    authUser -> apiCall (书签1)
    apiCall 执行时，继续返回Promise, 会先执行axios.
    authUser -> apiCall -> axios.
    axios 执行成功后，会执行axios后面的.then()或者.catch()函数，这两个函数在axios中被当作resolve和reject来执行。
    axios.then中call了resolve函数，这个函数代表了apiCall后面跟着的then. 也就是说，axios成功后，会自动执行apiCall.then
    axios succeed -> axios.then() -> by calling resolve -> apiCall succeed -> apiCall.then() -> by calling resolve ->
    authUser succeed -> authUser.then()
    */
    console.log("2. In authUser, coming from AuthForm and entering apiCall");
    return dispatch => {
        return new Promise(((resolve, reject) => {
            return apiCall("post", `/api/auth/${type}`, userData)
                .then(({token, ...user}) => {
                    // 如果apiCall成功了，这里的then就会执行
                    console.log("5.apiCall done in apiCall-THEN and back to THEN in authUser");
                    localStorage.setItem("jwtToken", token);
                    dispatch(setCurrentUser(user));
                    setTokenHeader(token);
                    dispatch(removeError());
                    resolve("In AUTH USER"); // resolve指的就是authUser套的then
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