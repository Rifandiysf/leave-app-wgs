import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3002/api/v1', 
});


axiosInstance.interceptors.request.use(
    (config) => {
        const userSession = sessionStorage.getItem('user');
        if (userSession) {
            const token = JSON.parse(userSession).token;
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
