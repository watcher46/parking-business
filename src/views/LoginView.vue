<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useLoginStore } from '../stores/login';
import {LOGIN_EMAIL, LOGIN_PASSWORD, loginUser } from '@/components/api';


//link input fields
const email      = ref(LOGIN_EMAIL);
const password   = ref(LOGIN_PASSWORD);
const loginError = ref(false);

//log the user in!
async function login(event: any) {
  //don't submit the form
  event.preventDefault();

  //reset the login-error message
  loginError.value = false;

  //initialize the store
  const store = useLoginStore();
  
  try {
    //try to login
    const response = await loginUser(email.value, password.value);
    const body     = await response.json();

    //when not successful, throw an error
    if(!response.ok) {
      throw new Error(`Response message: ${body.status.message}`);
    }
    
    //store the token in the store
    store.setAccessToken(body.data.auth.accessToken);

    //redirect to the home page
    router.push({name: 'home'});
  } catch (error: any) {
    //console log the error and show the user an error message
    console.error(error.message);
    loginError.value = true;
  }
}
</script>

<template>
  <main>
    <h2>Login to ParkingBusiness</h2>
    <form @submit.prevent="login">
      <div class="loginError" v-if="loginError">Email/password is incorrect.</div>
      <label>Email<input type="email" v-model="email" placeholder="Email"></label>
      <label>Password<input type="password" v-model="password" placeholder="Password"></label>
      <button type="submit" @click="login">Login</button>
    </form>
  </main>
</template>