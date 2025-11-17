import errorInterceptor from "./error";

const setupInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      // Prefer the standardized accessToken key, fall back to older 'token' for compatibility
      const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  errorInterceptor(axiosInstance);
};

export default setupInterceptors;
