import axios from "@/api/axios"; // Import global axios instance

// Function to fetch titles from API
export const login = async (username, password) => {
  try {
    const response = await axios.post("/login", { username: username, password: password }); // API endpoint
    if (response.code == 200) {
        return response.data;
    } else {
        console.warn("Error fetching login:", response.data);
        return [];
    }
  } catch (error) {
    console.error("Error fetching login:", error);
    throw error;
  }
};
