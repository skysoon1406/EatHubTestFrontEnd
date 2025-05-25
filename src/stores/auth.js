// stores/auth.js
import { defineStore } from 'pinia';
import axios from '../axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(email, password) {
      const response = await axios.post('/auth/login', { email, password });
      this.user = response.data;
    },
    async signup(firstName, lastName, userName, email, password) {
      try {
        await axios.post('/auth/signup', {
          firstName,
          lastName,
          userName,
          email,
          password,
        });
      } catch (error) {
        throw error;
      }
    },
    async logout() {
      await axios.post('/auth/logout');
      this.user = null;
    },
    clearUser() {
      this.user = null;
    },
    setUser(user) {
      this.user = user;
    },
  },
  persist: {
    key: 'auth', // localStorage key
    paths: ['user'], // value key
  },
});
