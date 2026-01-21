import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// 🔐 Register new user
export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

// 🔑 Login user
export const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

// 🚪 Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// 🔎 Get token
export const getToken = () => {
  return localStorage.getItem("token");
};
