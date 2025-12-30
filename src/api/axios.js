import axios from "axios";

const api = axios.create({
  baseURL: "https://restaurant-reservation-backend-1-agd2.onrender.com/api"
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
