import useSWR from "swr";
import axios from "axios";

axios.defaults.withCredentials = true;

const fetcher = (url) =>
  axios
    .get(url, {
      validateStatus: function (status) {
        return status < 500; // Resuelve solo si el código de estado es menor que 500
      },
    })
    .then((r) => {
      if (r.status === 401) {
        const authError = new Error("Not Authorized");
        authError.status = 401;
        authError.info = r.data;
        throw authError;
      }
      if (r.status === 204) {
        const nullCartError = new Error("User doesn't have a cart yet");
        nullCartError.status = 204;
        throw nullCartError;
      }
      return r.data;
    });

const useCart = () => {
  const { data, error, mutate } = useSWR(
    "http://localhost:8080/cart/",
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        //TODO Handle server conection error
        if (
          error.status === 404 ||
          error.status === 401 ||
          error.status === 204
        ) {
          //console.log(error.status);
          return;
        }
        if (retryCount >= 5) return;
        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  return {
    cart: data,
    loggedOut: error && error.status === 401,
    nonCart: error && error.status === 204,
    isLoading: !error && !data,
    isError: error,
    mutate, //
  };
};

export default useCart;
