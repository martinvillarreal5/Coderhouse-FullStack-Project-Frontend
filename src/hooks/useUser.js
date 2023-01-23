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
      console.log(r);
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
      revalidateOnFocus: false,
      revalidateIfStale: false,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 204 or 400+ codes.
        if (error.status === 204) return;
        if (error.status >= 400) return;

        //TODO Handle server conection error

        // Only retry up to 3 times.
        if (retryCount >= 3) return;

        // Retry after 10 seconds.
        setTimeout(() => revalidate({ retryCount }), 10000);
      },
    }
  );

  return {
    user: data,
    isAdmin: data?.isAdmin,
    isLogged: data && !error ? true : false,
    isLoading: !error && !data,
    isError: error,
    mutate, // check https://swr.vercel.app/examples/optimistic-ui
  };
};

export default useUser;
