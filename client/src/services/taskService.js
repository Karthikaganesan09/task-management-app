import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

// attach token
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getTasks = () => {
  return axios.get(API_URL, authHeader());
};

export const addTask = (taskData) => {
  return axios.post(API_URL, taskData, authHeader());
};

export const updateTaskStatus = (id, status) => {
  return axios.put(`${API_URL}/${id}`, { status }, authHeader());
};

// ✅ ADD THIS (THIS WAS MISSING)
export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`, authHeader());
};
