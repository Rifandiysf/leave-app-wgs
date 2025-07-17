import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const userToken = localStorage.getItem('token');
        const userDeviceId = localStorage.getItem('device-id');

        if (userToken) {
            try {
                const token = userToken;
                config.headers['Authorization'] = `${token}`;
            } catch (err) {
                console.error('Token parsing error:', err);
            }
        }

        if (userDeviceId) {
            config.headers['device-id'] = userDeviceId;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
