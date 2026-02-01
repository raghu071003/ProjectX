import axios from "axios";
console.log(import.meta.env.VITE_ENV)

const url = import.meta.env.VITE_ENV === "production" ? "https://projectx-o5ae.onrender.com" : "http://localhost:5000/api"
console.log(url)
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
