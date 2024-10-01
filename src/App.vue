<script setup lang="ts">
import { RouterLink, RouterView,  } from 'vue-router'
import router  from './router';
import { logout } from './components/api';

function logoutUser() {
  logout();
  router.push({name: 'login'});
}

</script>

<template>
  <header>
    <div class="wrapper">
      <h1>ParkingBusiness</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/sessions">Parking sessions</RouterLink>
        <RouterLink to="/building">Building</RouterLink>
        <button @click="logoutUser">Logout</button>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
  h1 {
    text-align: center;
  }
  nav {
    background: rgba(255,255,255, 0.5);
    padding: 1rem;
  }
  nav a {
    color: var(--link-color);
  }

  nav a:hover {
    text-decoration: none;
  }
  nav a:visited {
    color: var(--link-color-visited);
  }
</style>
