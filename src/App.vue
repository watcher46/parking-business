<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <h1>ParkingBusiness</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/sessions">Parking sessions</RouterLink>
        <RouterLink to="/building">Building</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

