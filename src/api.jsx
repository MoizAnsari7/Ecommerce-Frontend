import axios from 'axios';
import { getLogout } from './logoutHandler';
import { setOffline } from './Redux/slice/networkSlice';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or from cookies
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Outgoing request:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if(!window.navigator.onLine) {
      const { store } = require('./Redux/store');
      store.dispatch(setOffline());
      return;
    }

    if (error.response.status === 401) {
      const logout = getLogout();
      if (logout) logout();  // call context-based logout
    }
    return Promise.reject(error);
  }
);

export default api;