import { defineStore } from 'pinia'
import { fetchParkingSpaces } from '@/components/api';

export const useLoginStore = defineStore('login', {
    state: () => ({ 
        accessToken: '',
        user: {},
        spaces: [],
    }),
    getters: {
        getAccessToken: (state): string => {
            return state.accessToken;
        },
        getUser: (state): object => state.user,
        getSpaces: (state) => state.spaces,
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
        setSpaces(spaces: any) {
            this.spaces = spaces;
        },
        logout() {
            this.accessToken = '';
            this.user = {};
            localStorage.removeItem('accessToken');
        },
        async getParkingSpaces() {
            const response = await fetchParkingSpaces(this.accessToken);
            this.spaces = response.data.parkingSpaces;
        }
    }
})