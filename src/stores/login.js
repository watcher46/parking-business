import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
    state: () => ({ 
        accessToken: '',
        user: {},
    }),
    getters: {
        getAccessToken: (state) => state.accessToken,
        isLoggedIn: (state) =>  !!state.accessToken,
    },
    actions: {
        setAccessToken(accessToken) {
            this.accessToken = accessToken;
        },
        setUser(user) {
            this.user = user;
        }
    }
})