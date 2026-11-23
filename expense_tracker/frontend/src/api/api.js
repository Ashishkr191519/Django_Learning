
import axios from "axios";

// Local aur Production backend URL
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Main Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  withXSRFToken: true,
});

// Refresh ke liye separate Axios instance
const refreshApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  withXSRFToken: true,
});

let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("auth/login/") ||
      originalRequest.url?.includes("auth/register/")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshApi
          .post("/auth/refresh/")
          .finally(() => {
            refreshPromise = null;
          });
      }

      await refreshPromise;

      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me/");
  return response.data;
};

export default api;
