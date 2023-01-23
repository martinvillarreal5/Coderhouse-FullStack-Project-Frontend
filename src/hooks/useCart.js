import useSWR from "swr";
import axios from "axios";

axios.defaults.withCredentials = true;

const fetcher = (url) =>
  axios
    .get(url, {
      validateStatus: function (status) {
        return status < 500;
      },
    })
    .then((r) => {
      if (r.status === 401) {
        const authError = new Error(
          "Not Authorized, you must be logged in to access a cart"
        );
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
        if (error.status === 401 || error.status === 204) {
          return;
        }
        if (retryCount >= 5) return;
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  return {
    cart: data,
    loggedOut: error && error.status === 401,
    emptyCart: error && error.status === 204,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useCart;
