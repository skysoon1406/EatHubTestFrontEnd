// axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // user meta config
  withCredentials: true, // request with cookie
});

export default instance;
