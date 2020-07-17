import axios from 'axios';

export const setTokenHeader = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export const apiCall = (method, path, data) => {
    return new Promise((resolve, reject) => {
        return axios[method](path, data)
            .then(res => {
                //这个resolve对应就是apiCall外面的then
                // 能否进then要看axios能不能执行成功，这个逻辑由axios控制
                return resolve(res.data);
            })
            .catch(err => {
                return reject(err.response.data.error);
            });
    });
}