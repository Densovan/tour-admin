import { useAuthStore } from '@/stores/auth';
import axios, { AxiosRequestConfig } from 'axios';
import { storeToRefs } from 'pinia';
import { CredentialType } from '../types/keyword.type';

const TimeoutRequest = 5000;
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

// Create an axios instance
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: TimeoutRequest,
});

// Queue to hold requests awaiting token refresh
const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;

// Add request interceptor
request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers['Access-Control-Allow-Headers'] = '*';
    config.headers['Access-Control-Allow-Headers'] = 'Accept';

    const authStore = useAuthStore();
    const { accessToken, isAuthenticated, refreshToken } =
      storeToRefs(authStore);

    // Add Authorization header if user is authenticated
    // if (isAuthenticated.value) {
    config.headers['Authorization'] = `Bearer ${accessToken.value}`;
    // }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add response interceptor
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    // Handle response errors
    console.log(error, 'error====');
    const originalConfig: AxiosRequestConfig | any = error.config;

    // If token has expired and it's not already refreshing
    if (
      error.response &&
      error.response.status == 401 &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;

      // If not already refreshing, initiate token refresh
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Refresh token
          const refreshedToken = await refreshToken();
          // Retry failed request with new token
          error.config.headers['Authorization'] = `Bearer ${refreshedToken}`;
          return axios(originalConfig);
        } catch (refreshError) {
          // Handle token refresh error
          console.error('Error refreshing token:', refreshError);
          return Promise.reject(refreshError);
        } finally {
          // Reset refreshing flag
          isRefreshing = false;
        }
      } else {
        // If already refreshing, queue the request
        return new Promise((resolve, reject) => {
          refreshAndRetryQueue.push({
            config: originalConfig,
            resolve,
            reject,
          });
        });
      }
    }

    // Handle other types of errors
    if (error.response && error.response.status == 403) {
      console.log('error 2');
      // Handle 403 error
    }

    return Promise.reject(error);
  }
);

// Function to refresh token
async function refreshToken() {
  const authStore = useAuthStore();
  const { refreshToken } = storeToRefs(authStore);

  try {
    // Call your API to refresh token
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/auth/refresh`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken.value}`,
        },
      }
    );

    // Update token in local storage
    const newAccessToken = response.data.accessToken;
    localStorage.setItem(CredentialType.ACCESS_TOKEN, newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}

export default request;
