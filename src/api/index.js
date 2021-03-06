import request from '../utils/request';

export const registered = params => {
    return request({
        url: 'http://localhost:8000/api/v1/user/registered',
        method: 'post',
        params: params
    });
}


export const login = params => {
    return request({
        url: 'http://localhost:8000/api/v1/user/login',
        method: 'post',
        params: params
    });
}

export const logout = () => {
    return request({
        url: 'http://localhost:8000/api/v1/user/logout',
        method: 'delete',
    });
}

export const userinfo = () => {
    return request({
        url: 'http://localhost:8000/api/v1/user/info',
        method: 'get',
    });
}

export const changepassword = (params) => {
    return request({
        url: 'http://localhost:8000/api/v1/user/info',
        method: 'put',
        params: params
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

export const systeminfo = () => {
    return request({
        url: 'http://localhost:8000/api/v1/system/info',
        method: 'get',
    });
}

export const gettodolist = () => {
    return request({
        url: 'http://localhost:8000/api/v1/todolist',
        method: 'get',
    });
}


export const inserttodolist = (params) => {
    return request({
        url: 'http://localhost:8000/api/v1/todolist',
        method: 'post',
        params: params
    });
}

export const updatetodolist = (params) => {
    return request({
        url: 'http://localhost:8000/api/v1/todolist',
        method: 'put',
        params: params
    });
}

export const deletetodolist = (params) => {
    return request({
        url: 'http://localhost:8000/api/v1/todolist',
        method: 'delete',
        params: params
    });
}