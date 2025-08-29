import axios from "axios";
import setupInterceptors from "./interceptors";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(apiClient);

export default apiClient;
