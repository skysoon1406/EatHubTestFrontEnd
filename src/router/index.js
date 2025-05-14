// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import axios from '../axios';

const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/signup', component: () => import('../views/Signup.vue') },
  {
    path: '/users/coupons',
    component: () => import('../views/MyCoupon.vue'),
    meta: { requiresAuth: true },
  },
  {path: '/restaurants', component:() => import('../views/RestaurantsList.vue')},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      await axios.get('/auth/me'); // check user auth
      next();
    } catch {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
