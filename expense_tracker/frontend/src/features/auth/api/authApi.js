import api from '../../../api/api'
export const initializeCSRF = async () => {
  const response = await api.get("auth/csrf/");
  return response.data;
};

// Register API
export const registerUser = async (userData) => {
  await initializeCSRF();

  const response = await api.post("auth/register/", userData);
  return response.data;
};
export const loginUser = async (userData) => {
  await initializeCSRF();

  const response = await api.post("auth/login/", userData);
  return response.data;
};
export const logoutUser = async () => {
  const response = await api.post("/auth/logout/");
  return response.data;
};