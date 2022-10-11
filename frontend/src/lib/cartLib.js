import axios from "axios";
import { baseServerUrl } from "../config/paths";

export const addProductToCart = async (productData) => {
  axios.defaults.withCredentials = true;
  const reponse = await axios.post(baseServerUrl + "/cart", productData);
  return reponse.data;
};
