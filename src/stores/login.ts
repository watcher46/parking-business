import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
    state: () => ({ 
        accessToken: '',
        user: {},
    }),
    getters: {
        getAccessToken: (state): string => {
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken && !state.accessToken) {
                state.accessToken = accessToken;
            }

            return state.accessToken;

        },
        getUser: (state): object => state.user,
        isLoggedIn: (state): boolean =>  !!state.accessToken,
    },
    actions: {
        setAccessToken(accessToken: string) {
            this.accessToken = accessToken;
            localStorage.setItem('accessToken', accessToken);
        },
        setUser(user: object) {
            this.user = user;
        },
        logout() {
            this.accessToken = '';
            this.user = {};
        }
    }
})