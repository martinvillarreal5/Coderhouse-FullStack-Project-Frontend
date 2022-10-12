import axios from "axios";
import { baseServerUrl } from "../config/paths";

export const addProductToCart = async (productData) => {
  axios.defaults.withCredentials = true;
  const response = await axios.post(baseServerUrl + "/cart", productData);
  return response.data;
};

export const sendNewOrder = async () => {
  axios.defaults.withCredentials = true;
  const response = await axios.post(baseServerUrl + "/cart/order");
  return response.data;
};
