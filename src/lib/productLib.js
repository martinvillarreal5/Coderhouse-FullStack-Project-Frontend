import axios from "axios";

import { baseServerUrl } from "../config/paths";

export const createProduct = async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("stock", data.stock);
  formData.append("picture", data.picture);
  formData.append("backPicture", data.backPicture);
  axios.defaults.withCredentials = true;
  const headers = {
    "Content-Type": "form-data",
  };
  const response = await axios.post(
    baseServerUrl + "/products/admin",
    formData,
    headers
  );
  return response.data;
};

export const updateProduct = async (id, data) => {
  console.log(data);
  const formData = Object.keys(data).reduce((formData, key) => {
    formData.append(key, data[key]);
    return formData;
  }, new FormData());
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}:`);
    console.log(pair[1]);
  }
  axios.defaults.withCredentials = true;
  const headers = {
    "Content-Type": "form-data",
  };
  const response = await axios.put(
    baseServerUrl + "/products/admin/" + id,
    formData,
    headers
  );
  return response.data;
};

export const deleteProduct = async (id) => {
  axios.defaults.withCredentials = true;
  const response = await axios.delete(baseServerUrl + "/products/admin/" + id);
  return response.data;
};
