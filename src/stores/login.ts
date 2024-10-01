import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
    state: () => ({ 
        accessToken: '',
        user: {},
    }),
    getters: {
        getAccessToken: (state): string => {
            return state.accessToken;
        },
        getUser: (state): object => state.user,
        isLoggedIn: (state): boolean =>  !!state.accessToken,
        hasToken: (): boolean => !!localStorage.getItem('accessToken'),
    },
    actions: {
        setAccessToken(accessToken: string) {
            this.accessToken = accessToken;
            localStorage.setItem('accessToken', accessToken);
        },
        setAccessTokenFromStorage() {
            this.accessToken = localStorage.getItem('accessToken') ?? '';
        },
        setUser(user: object) {
            this.user = user;
        },
        logout() {
            this.accessToken = '';
            this.user = {};
            localStorage.removeItem('accessToken');
        }
    }
})