import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const getuserlist = query => {
    return request({
        url: 'http://localhost:8000/api/v1/user/list',
        method: 'get',
        params: query
    });
}
export const login = user => {
    return request({
        url: 'http://localhost:8000/api/v1/user/login',
        method: 'post',
        params: user
    });
}

export const userinfo = username => {
    return request({
        url: 'http://localhost:8000/api/v1/user/info',
        method: 'get',
        params: username
    });
}