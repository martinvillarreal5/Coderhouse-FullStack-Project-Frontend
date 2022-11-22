import useSWR from "swr";
import axios from "axios";

axios.defaults.withCredentials = true;

const fetcher = (url) =>
  axios
    .get(
      url /* , {
      validateStatus: function (status) {
        return status < 500; // Resuelve solo si el código de estado es menor que 500
      },
    } */
    )
    .then((r) => {
      if (r.status === 204) {
        const logInError = new Error("Not Logged In");
        logInError.status = 204;
        throw logInError;
      }
      return r.data;
    });

const useUser = () => {
  const { data, error, mutate } = useSWR(
    "http://localhost:8080/user/",
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 204 or 400+ codes.
        if (error.status === 204) return;
        if (error.status >= 400) return;

        //TODO Handle server conection error

        // Never retry for a specific key.
        //if (key === '/api/user') return

        // Only retry up to 10 times.
        if (retryCount >= 10) return;

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  return {
    user: data,
    isAdmin: data?.isAdmin,
    isLogged: data && !error ? true : false,
    loggedOut: error && error.status === 204,
    isLoading: !error && !data,
    isError: error,
    mutate, // check https://swr.vercel.app/examples/optimistic-ui
  };
};

export default useUser;