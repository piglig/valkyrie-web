import axios from "@/api/axios"; // Import global axios instance

export const getChannels = async () => {
  try {
    const response = await axios.get("/channel/all");
    if (response.code == 200) {
        return response.data;
    } else {
        console.warn("Error fetching channel:", response.data);
        return [];
    }
  } catch (error) {
    console.error("Error fetching channel:", error);
    throw error;
  }
};