import axios, { InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  timeoutErrorMessage:
    "Request timed out. Please check your network connection and try again.",
  withCredentials: true,
});
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (err) => {
    console.error("Request Error:", err);
    return Promise.reject(err);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (err) => {
    console.error("Response Error:", err.response.data);
    return Promise.reject(err.response.data);
  }
);

export default apiClient;
