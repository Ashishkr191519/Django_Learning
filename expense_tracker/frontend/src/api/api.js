
import axios from "axios";

// Local aur Production backend URL
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Main Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Refresh ke liye separate Axios instance
const refreshApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let refreshPromise = null;
let csrfPromise = null;

// CSRF token backend se fetch karo
const getCSRFToken = async () => {
  if (!csrfPromise) {
    csrfPromise = axios
      .get(`${BASE_URL}/auth/csrf/`, {
        withCredentials: true,
      })
      .then((response) => response.data.csrfToken)
      .finally(() => {
        csrfPromise = null;
      });
  }

  return csrfPromise;
};

// Unsafe requests mein CSRF header add karo
const attachCSRF = async (config) => {
  const method = (config.method || "get").toLowerCase();

  if (["post", "put", "patch", "delete"].includes(method)) {
    const token = await getCSRFToken();
    config.headers.set("X-CSRFToken", token);
  }

  return config;
};

// Dono instances mein CSRF protection
api.interceptors.request.use(attachCSRF);
refreshApi.interceptors.request.use(attachCSRF);

// JWT refresh interceptor
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("auth/login/") ||
      originalRequest.url?.includes("auth/register/") ||
      originalRequest.url?.includes("auth/refresh/")
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
