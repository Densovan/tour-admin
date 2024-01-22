import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { storeToRefs } from "pinia";

const TimeoutRequest = 5000;

//create an axios instance
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: TimeoutRequest,
});

//Add request interceptor
request.interceptors.request.use(
  function (config) {
    //Do something before request is sent
    config.headers["Access-Control-Allow-Headers"] = "*";
    config.headers["Access-Control-Allow-Headers"] = "Accept";

    const authStore = useAuthStore();
    const { accessToken, isAuthenticated } = storeToRefs(authStore);

    if (isAuthenticated.value) {
      config.headers["Authorization"] = `Bearer ${accessToken.value}`;
    }
    return config;
  },
  function (error) {
    //Do something with request error
    return Promise.reject(error);
  }
);

//Add a response interceptor
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    //So something with response data
    const res = response?.data;
    return res;
  },
  function (error) {
    console.log("====error====", error.code);
    const errorResponse = error.response?.data;
    //401 Unauthorized - case 1: token expired, case 2:token invalid
    if (errorResponse?.statusCode === 401) {
      const authStore = useAuthStore();
      const { refreshToken } = authStore;
      console.log(refreshToken, "refreshtoken===");
      const requestOption = {
        method: "GET",
        url: `${import.meta.env.VITE_BASE_API_URL}/auth/refresh`,
        data: {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        },
      };

      axios(requestOption)
        .then((res) => {
          //if refresh token is valid then get new access token and retry request
          if (res.data) {
            authStore.setAuthToken(res.data.accessToken, res.data.refreshToken);
            const newRequestConfig = { ...error.config };
            newRequestConfig.headers["Authorization"] =
              `Bearer ${res.data.accessToken}`;
            request.request(newRequestConfig);
          }
        })
        .catch((error) => {
          authStore.clearAuthToken();

          // return Promise.reject(error);
        });
    }

    //Any status  codes that falls outside the range of 2xx cause function to tirgger
    //Do something with response error
    console.log(error);
    if (error.code === "ERR_NETWORK") {
      return Promise.reject({
        message: "Error Network Connection",
      });
    }
  }
);
export default request;
