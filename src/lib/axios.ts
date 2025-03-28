import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const baseURL = import.meta.env.VITE_API_URL || "BASE_URL";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const statusCode = error.response?.status;

    switch (statusCode) {
      case 401:
        // Handle unauthorized
        localStorage.removeItem("token");
        window.location.href = "/login";
        break;
      case 403:
        toast.error("Permission denied");
        break;
      case 404:
        toast.error("Resource not found");
        break;
      case 500:
        toast.error("Server error");
        break;
      default:
        toast.error("An error occurred");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
