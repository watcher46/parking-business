<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useLoginStore } from '../stores/login';
import {LOGIN_ENDPOINT, LOGIN_EMAIL, LOGIN_PASSWORD} from '../components/api';


//make some reactive models
const email      = ref(LOGIN_EMAIL);
const password   = ref(LOGIN_PASSWORD);
const loginError = ref(false);

//the login function
async function login(event: any) {
  //don't submit the form
  event.preventDefault();

  //reset the login-error message
  loginError.value = false;

  //initialize the store
  const store = useLoginStore();
  
  try {
    //try to login
    const responseObject = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const response = await responseObject.json();

    //when not a good response, throw an error
    if(!responseObject.ok) {
      throw new Error(`Response message: ${response.status.message}`);
    }
    
    //store the token in the store
    store.accessToken = response.data.auth.accessToken;

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