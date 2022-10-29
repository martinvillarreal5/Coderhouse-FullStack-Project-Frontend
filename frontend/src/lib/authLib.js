import axios from "axios";
import { baseServerUrl } from "../config/paths";

const logIn = async (data) => {
  //improve and implement
  axios.defaults.withCredentials = true;
  const authResponse = await axios.post(baseServerUrl + "/user/login", data);
  return; // authResponse;
};

export const logOut = async () => {
  axios.defaults.withCredentials = true;
  const authResponse = await axios.post(baseServerUrl + "/user/logout");
  console.log(authResponse.data);
};

export const SignUp = async (data) => {
  /* const formData = Object.keys(data).reduce((formData, key) => {
    formData.append(key, data[key]);
    return formData;
  }, new FormData()); */
  const formData = new FormData();

  //formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("password", data.password);
  formData.append("avatar", data.avatar);
  formData.append("phone", data.phone);

  console.log(formData);
  const headers = {
    "Content-Type": "form-data",
  }; // necesary?
  const authResponse = await axios.post(
    baseServerUrl + "/user/register",
    formData,
    headers
  );
  return authResponse;
};
