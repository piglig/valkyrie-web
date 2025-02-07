import axios from "@/api/axios"; // Import global axios instance

// Function to fetch titles from API
export const fetchTitles = async () => {
  try {
    const response = await axios.get("/title/all"); // API endpoint
    if (response.code == 200) {
        return response.data;
    } else {
        console.warn("Error fetching titles:", response.data);
        return [];
    }
  } catch (error) {
    console.error("Error fetching titles:", error);
    throw error;
  }
};
