import axios from "axios";

// Set the base URL for Axios requests
const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;
