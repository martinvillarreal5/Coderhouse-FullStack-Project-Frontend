
import axios from "axios";

const logIn = async (data) => {
    try {
        const authResponse = await axios.post('http://localhost:8080/user/login', data)
        console.log(authResponse.data);
        //if (authResponse.status)
        return authResponse
    } catch (error) {
        console.log(error);
    }
};

export const logOut = async () => {
    try {
        axios.defaults.withCredentials = true;
        const authResponse = await axios.post('http://localhost:8080/user/logout')
        console.log(authResponse.data);

    } catch (error) {
        console.log(error);
    }
}

