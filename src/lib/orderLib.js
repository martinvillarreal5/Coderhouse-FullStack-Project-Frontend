import axios from "axios";
import { baseServerUrl } from "../config/paths";

export const sendNewOrder = async () => {
  axios.defaults.withCredentials = true;
  const response = await axios.post(baseServerUrl + "/order");
  return response.data;
};
