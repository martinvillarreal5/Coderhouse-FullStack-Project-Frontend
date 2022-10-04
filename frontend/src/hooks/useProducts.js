import { baseServerUrl } from "../../config/paths.js";

import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((response) => response.data);

const useProducts = () => {
    const { data, error, mutate } = useSWR(baseServerUrl + "/products", fetcher);

    return {
        products: data,
        //loggedOut: error && error.status === 401,
        isLoading: !error && !data,
        isError: error,
        mutate,
      };
}

export default useProducts;