import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    Accept: "application/json",
  },
});

// ===============================
// ✅ REQUEST INTERCEPTOR
// Automatically attach JWT token
// ===============================
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// ✅ RESPONSE INTERCEPTOR
// Handle errors safely
// ===============================
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔥 If server not reachable
    if (!error.response) {
      return Promise.reject({
        message: "Server not reachable. Please try again.",
      });
    }

    const { status, data } = error.response;

    // 🔐 Only logout if token truly invalid
    if (
      status === 401 &&
      data?.message &&
      data.message.toLowerCase().includes("not authorized")
    ) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(data || { message: "Something went wrong" });
  }
);

export default axiosInstance;