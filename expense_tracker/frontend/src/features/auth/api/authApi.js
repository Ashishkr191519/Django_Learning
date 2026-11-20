import axios from 'axios'

const api = axios.create({
    baseURL:'http://127.0.0.1:8000/api/auth/',
    withCredentials:true
})

// Register API

export const registerUser = async (userData) => {
  const response = await api.post("register/", userData);
  return response.data;
};

// Login API
export const loginUser = async (userData) => {
  const response = await api.post("login/", userData);
  return response.data;
};