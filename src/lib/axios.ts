import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const baseURL =
  import.meta.env.VITE_API_URL ||
  "https://magic-korrie-myorgnazation-0c29b824.koyeb.app/";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user-storage");
    const parsedStorage = JSON.parse(token || "{}");
    const actualToken = parsedStorage.state?.token;
    console.log("🚀 ~ actualToken:", actualToken);
    if (actualToken) {
      config.headers.Authorization = `Bearer ${actualToken}`;
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
        toast.error("Unauthorized access. Please log in again.");

        localStorage.removeItem("user-storage");
        window.location.href = "/signin";
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
