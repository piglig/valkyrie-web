import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Replace with your actual API base URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
  },
});

// ✅ Request Interceptor: Logs every request
axiosInstance.interceptors.request.use(
    (config) => {
      console.log("📤 Sending Request:", {
        method: config.method.toUpperCase(),
        url: config.baseURL + config.url,
        headers: config.headers,
        data: config.data || "No body",
      });
      const token = localStorage.getItem("jwt_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("❌ Request Error:", error);
      return Promise.reject(error);
    }
  );
  
  // ✅ Response Interceptor: Logs every response
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("📥 Received Response:", {
        url: response.config.baseURL + response.config.url,
        status: response.status,
        data: response.data,
      });
      return response;
    },
    (error) => {
      console.error("⚠️ Response Error:", {
        url: error.config?.baseURL + error.config?.url,
        message: error.message,
        response: error.response?.data || "No response data",
      });
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("jwt_token"); // Clear JWT token
        window.location.href = "/login"; // Redirect to login page
      }
      return Promise.reject(error);
    }
  );

// ✅ Response Interceptor: Standardize response format
axiosInstance.interceptors.response.use(
    (response) => {
      console.log("📥 Received Response:", {
        url: response.config.baseURL + response.config.url,
        status: response.status,
        data: response.data,
      });
  
      // Ensure response follows the standard format
      if (response.data && typeof response.data === "object") {
        return {
          code: response.data.code ?? 200, // Default to 200 if not present
          data: response.data.data ?? null, // Default to null if no data
          msg: response.data.msg ?? "ok", // Default message
        };
      }
  
      // If response format is unexpected, return a fallback structure
      return {
        code: response.status,
        data: response.data,
        msg: "Unexpected response format",
      };
    },
    (error) => {
      console.error("⚠️ Response Error:", {
        url: error.config?.baseURL + error.config?.url,
        message: error.message,
        response: error.response?.data || "No response data",
      });
  
      // Return standardized error format
      return Promise.reject({
        code: error.response?.status || 500,
        data: null,
        msg: error.response?.data?.msg || "An error occurred",
      });
    }
  );
  
export default axiosInstance;
