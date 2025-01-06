import axios from "axios";

const PRODUCT_API = process.env.REACT_APP_PRODUCT_API;

export const getAllProducts = async () => {
  try {
    if (!PRODUCT_API) throw new Error("API_URL is not defined");
    const response = await axios.get(`${PRODUCT_API}/get`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error.response.data;
  }
};
