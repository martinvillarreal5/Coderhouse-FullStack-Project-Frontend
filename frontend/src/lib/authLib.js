import axios from "axios";

const logIn = async (data) => {
  //improve and implement
  try {
    // error handling
    axios.defaults.withCredentials = true;
    const authResponse = await axios.post(
      "http://localhost:8080/user/login",
      data
    );
    //console.log(authResponse.data);
    //if (authResponse.status)
    return; // authResponse;
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async () => {
  try {
    axios.defaults.withCredentials = true;
    const authResponse = await axios.post("http://localhost:8080/user/logout");
    console.log(authResponse.data);
  } catch (error) {
    console.log(error);
  }
};

export const SignUp = async (data) => {
  /* const formData = Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData()); */
  const formData = new FormData();
  //try catch below
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
  //console.log(data.avatar)
  const authResponse = await axios.post(
    "http://localhost:8080/user/register",
    formData,
    headers
  );
  console.log(authResponse.data);
  return authResponse;
};
