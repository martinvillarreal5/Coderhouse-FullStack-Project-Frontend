import { baseServerUrl } from "../config/paths.js";

import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((response) => response.data);

const useData = (route) => {
  const { data, error, mutate } = useSWR(baseServerUrl + route, fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status >= 404) return;
      if (retryCount >= 3) return;

      setTimeout(() => revalidate({ retryCount }), 10000);
    },
  });
  return {
    data: data,
    //? destructure data as {data: any name} for example {data: product} = useData(route)
    //? then use the new name like normal
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useData;
