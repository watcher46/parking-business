import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useLoginStore } from '@/stores/login';
import { fetchUser } from '@/components/api';


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
      beforeEnter: (to, from, next) => {
        console.log('this works!');
        next();
      }
    },
    {
      path: '/sessions',
      name: 'sessions',
      meta: { requiresAuth: true },
      component: () => import('../views/SessionsView.vue'),
      beforeEnter: (to, from, next) => {
        console.log('this works!');
        next();
      }
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: () => import('../views/LoginView.vue'),
      beforeEnter: (to, from, next) => {
        console.log('this works!');
        next();
      }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const store = useLoginStore();

    if(store.hasToken && !store.isLoggedIn) {
      store.setAccessTokenFromStorage();
      const response = await fetchUser(store.getAccessToken);
      //when not successful, throw an error
      if(!response.ok) {
        //do nothing yet
      }
      
      const body = response.json();
      console.log(body.data.user);
      store.setUser = body.data.user;
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
