import { CredentialType } from '@/common/types/keyword.type';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('access_token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
    loading: false,
  }),
  getters: {
    isAuthenticated(state) {
      return state.accessToken !== '' && state.refreshToken !== '';
    },
    isRefreshToken(state) {
      return state.refreshToken !== '';
    },
  },
  actions: {
    setAuthToken(accessToken: string, refreshToken: string) {
      // Save Auth token to Pinia stores 🍍
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      // Save to Local storage for future use
      localStorage.setItem(CredentialType.ACCESS_TOKEN, accessToken);
      localStorage.setItem(CredentialType.REFRESH_TOKEN, refreshToken);
    },
    clearAuthToken() {
      this.accessToken = '';
      this.refreshToken = '';
      localStorage.removeItem(CredentialType.ACCESS_TOKEN);
      localStorage.removeItem(CredentialType.REFRESH_TOKEN);
    },
    getAccessToken() {
      return this.accessToken;
    },
  },
});
