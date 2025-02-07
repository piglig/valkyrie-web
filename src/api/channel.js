import axios from "@/api/axios"; // Import global axios instance

export const getFormattedChannels = async () => {
  try {
    const response = await axios.get("/channel/all");
    if (response.code == 200) {
        
      const formattedChannels = response.data.map(obj => {
        // Extracting the first key of each object (as they contain only one key)
        const key = Object.keys(obj)[0]; 
        return obj[key]; // Return the value of the key
      });
    
      return formattedChannels;
    } else {
        console.warn("Error fetching channel:", response.data);
        return [];
    }
  } catch (error) {
    console.error("Error fetching channel:", error);
    throw error;
  }
};