import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('access_token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
    loading: false
  }),
  getters: {
    isAuthenticated(state) {
      return state.accessToken !== '' && state.refreshToken !== ''
    },
    isRefreshToken(state) {
      return state.refreshToken !== ''
    }
  },
  actions: {
    setAuthToken(accessToken: string, refreshToken: string) {
      // Save Auth token to Pinia stores 🍍
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      // Save to Local storage for future use
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
    },
    clearAuthToken() {
      this.accessToken = ''
      this.refreshToken = ''
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },
    getAccessToken() {
      return this.accessToken
    }
  }
})
