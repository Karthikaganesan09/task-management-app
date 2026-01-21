import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getTasks = () => axios.get(API_URL, authHeader());
