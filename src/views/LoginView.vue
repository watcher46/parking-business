<script>
import { useLoginStore } from '../stores/login';

const LOGIN_ENDPOINT = `https://parkdemeer-afde952e3fef.herokuapp.com/v1/auth/password`;

export default {
  data: () => {
    return {
      email: 'super@parkdemeer.nl',
      password: 'SUPER_USER_SECRET_PASS',
      loginError: false,
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      this.loginError = false;
      const store = useLoginStore();
      
      try {
        const responseObject = await fetch(LOGIN_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        const response = await responseObject.json();

        if(!responseObject.ok) {
          throw new Error(`Response message: ${response.status.message}`);
        }

        const authToken = response.data.auth.accessToken;
        
        store.accessToken = authToken;

        this.$router.push({name: 'home'});
      } catch (error) {
        console.error(error.message);
        this.loginError = true;
      }
    },
  },
}
</script>

<template>
  <main>
    <form @submit.prevent="login">
      <div class="loginError" v-if="loginError">Email/password is incorrect.</div>
      <label>Email<input type="email" v-model="email" placeholder="Email"></label>
      <label>Password<input type="password" v-model="password" placeholder="Password"></label>
      <button type="submit" @click="login">Login</button>
    </form>
  </main>
</template>