import axios from "axios";
import { API_KEY, API_BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Attach API key to every request automatically
api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    apiKey: API_KEY,
    language: "en",
  };
  return config;
});

// Global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong.";
    return Promise.reject(new Error(message));
  }
);

export default api;