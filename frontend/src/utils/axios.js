import axios from 'axios';

const api = axios.create({
  baseURL: 'https://portfolio-rdvr.onrender.com/api',
});

api.interceptors.request.use(
  (config) => {
    // We will attach the token directly in the thunks or here if it's stored in localStorage
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
