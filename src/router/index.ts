import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useLoginStore } from '@/stores/login';
import { fetchParkingSpaces, fetchUser } from '@/components/api';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: HomeView,
    },
    {
      path: '/building',
      name: 'building',
      meta: { requiresAuth: true },
      component: () => import('../views/BuildingView.vue'),
      beforeEnter: async () => {
        const store = useLoginStore();
        store.getParkingSpaces();
      },
    },
    {
      path: '/sessions',
      name: 'sessions',
      meta: { requiresAuth: true },
      component: () => import('../views/SessionsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: () => import('../views/LoginView.vue')
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const store = useLoginStore();

    if(store.hasToken && !store.isLoggedIn) {
      store.setAccessTokenFromStorage();
      const response = await fetchUser(store.getAccessToken);

      store.setUser = response.data.user;
      store.setAccessTokenFromStorage;
    }

    if (store.isLoggedIn) {
      next();
    } else {
      next('/login');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router
