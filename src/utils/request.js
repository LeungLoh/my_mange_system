import axios from 'axios';
import router from '../router'
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000,
    withCredentials: true
});

service.interceptors.request.use(
    config => {
        let token = localStorage.getItem("token")
        if (token != null) {
            config.headers['token'] = token
        } else {
            router.push('/login')
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.token) {
                localStorage.setItem("token", response.data.token)
            }
            return response.data;
        } else {
            router.push('/login')
            Promise.reject();
        }
    },
    error => {
        router.push('/login')
        console.log(error);
        return Promise.reject();
    }
);

export default service;
