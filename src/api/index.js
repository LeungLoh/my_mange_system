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