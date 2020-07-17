import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {LOAD_MESSAGES, REMOVE_ERROR} from "../actionTypes";

export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages: messages   // 传到reducer的action中
});

export const fetchMessages = () => {
    return dispatch => {
        return apiCall('get', "/api/messages")
            .then(res => {
                dispatch(loadMessages(res));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

export const postNewMessage = text => {
    return (dispatch, getState) => {
        let {currentUser} = getState();
        const id = currentUser.user.id;
        return apiCall("post", `/api/users/${id}/messages`, {text})
            .then(res => {
                return {};
            })
            .catch(err => {
                dispatch(addError(err));
            })

    }
}
