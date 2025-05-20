import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            config.headers['Authorization'] = `Bearer ${access_token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refresh_token = localStorage.getItem('refresh_token');

            try {
                const { data } = await axiosInstance.post('http://127.0.0.1:8000/', { 
                    refresh: refresh_token,
                });

                localStorage.setItem('access_token', data.access);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

                return axiosInstance(originalRequest);
            } catch (e) {
                console.error('Refresh token expired or invalid', e);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;
