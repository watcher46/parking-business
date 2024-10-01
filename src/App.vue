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

