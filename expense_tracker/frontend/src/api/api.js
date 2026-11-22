import axios from "axios";

// Main Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  withXSRFToken: true,
});

// Refresh ke liye separate Axios instance
const refreshApi = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  withXSRFToken: true,
});

// Multiple requests ek saath fail ho toh
// sirf ek refresh request bhejna
let refreshPromise = null;

api.interceptors.response.use(
  // Successful response
  (response) => response,

  // Error response
  async (error) => {
    const originalRequest = error.config;

    // Sirf 401 error par refresh karna
    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("auth/login/") ||
      originalRequest.url?.includes("auth/register/")
    ) {
      return Promise.reject(error);
    }

    // Same request ko baar-baar retry na karna
    originalRequest._retry = true;

    try {
      // Agar refresh already chal raha hai,
      // toh usi ka result wait karna
      if (!refreshPromise) {
        refreshPromise = refreshApi.post("/auth/refresh/").finally(() => {
          refreshPromise = null;
        });
      }

      await refreshPromise;

      // Naya access token cookie mein set ho chuka hai
      // Ab original request dobara bhejna
      return api(originalRequest);
    } catch (refreshError) {
      // Refresh token bhi invalid/expired ho sakta hai
      return Promise.reject(refreshError);
    }
  },
);
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me/");
  return response.data;
};

export default api;
