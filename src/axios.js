// axios.js
import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // user meta config
  withCredentials: true, // request with cookie
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get('csrftoken') || '';
  if (token) {
    config.headers['X-CSRFToken'] = token;
  }
  return config;
});

export default instance;
