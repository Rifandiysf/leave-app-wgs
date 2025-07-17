import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
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
