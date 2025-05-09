// stores/auth.js
import { defineStore } from 'pinia';
import axios from '../axios';

export const useAuthStore = defineStore('auth', {
  actions: {
    async login(email, password) {
      await axios.post('/login/', { email, password });
    },
    async signup(firstname, lastname, username, email, password) {
      await axios.post('/signup/', {
        firstname,
        lastname,
        username,
        email,
        password,
      });
    },
    async logout() {
      await axios.post('/logout/');
    },
  },
});
