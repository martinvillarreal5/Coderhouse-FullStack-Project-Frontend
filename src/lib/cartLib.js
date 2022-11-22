import axios from "axios";
import { baseServerUrl } from "../config/paths";

export const addProductToCart = async (id, quantity) => {
  axios.defaults.withCredentials = true;
  const cartData = { productId: id, quantity: quantity };
  const response = await axios.post(baseServerUrl + "/cart", cartData);
  return response.data;
};

export const removeProductFromCart = async (id) => {
  axios.defaults.withCredentials = true;
  const response = await axios.delete(baseServerUrl + `/cart/product/${id}`);
  return response.data;
};
