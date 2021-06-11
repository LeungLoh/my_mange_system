import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};


export const login = params => {
    return request({
        url: 'http://localhost:8000/api/v1/user/login',
        method: 'post',
        params: params
    });
}

export const userinfo = () => {
    return request({
        url: 'http://localhost:8000/api/v1/user/info',
        method: 'get',
    });
}

export const getuserlist = params => {
    return request({
        url: 'http://localhost:8000/api/v1/user/list',
        method: 'get',
        params: params
    });
}
export const deluserlist = params => {
    return request({
        url: 'http://localhost:8000/api/v1/user/list',
        method: 'delete',
        params: params
    });
}