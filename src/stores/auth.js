// stores/auth.js
import { defineStore } from 'pinia';
import axios from '../axios';

export const useAuthStore = defineStore('auth', {
  actions: {
    async login(email, password) {
      await axios.post('/auth/login/', { email, password });
    },
    async signup(firstname, lastname, username, email, password) {
      await axios.post('/auth/signup/', {
        firstname,
        lastname,
        username,
        email,
        password,
      });
    },
    async logout() {
      await axios.post('/auth/logout/');
    },
  },
});
