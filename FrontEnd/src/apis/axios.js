import axios from "axios";
console.log(import.meta.env.VITE_ENV)

const isProduction = typeof window !== "undefined" && (window.location.hostname.includes("skill-forge-dsa") || !window.location.hostname.includes("localhost"));
const url = isProduction ? "https://projectx-o5ae.onrender.com/api" : "http://localhost:5003/api"
console.log("Using API URL:", url);
const api = axios.create({
  baseURL: url
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // simple, safe redirect
    }
    return Promise.reject(err);
  }
);

export default api;
