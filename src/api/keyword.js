import axios from "@/api/axios"; // Import global axios instance

export const getKeywordWays = async () => {
  try {
    const response = await axios.get("/keyword/ways"); // API endpoint
    if (response.code == 200) {
        return response.data;
    } else {
        console.warn("Error getKeywordWays:", response.data);
        return [];
    }
  } catch (error) {
    console.error("Error getKeywordWays:", error);
    throw error;
  }
};
