import useSWR from 'swr'
import axios from 'axios'

axios.defaults.withCredentials = true;

const fetcher = (url) => axios.get(url, {
    validateStatus: function (status) {
        return status < 500; // Resuelve solo si el código de estado es menor que 500
    }
}).then((r) => {
    if (r.status === 401) {
        //Add a catch for other errors?
        console.log("Intercepted Error 401")
        const authError = new Error('Not Authorized')
        authError.status = 401
        authError.info = r.data
        throw authError
    }
    return r.data
})

const useUser = () => {
    const { data, error, mutate } = useSWR(
        'http://localhost:8080/user/',
        fetcher,
        {
            onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
                // Never retry on 404.
                if (error.status === 404 || error.status === 401) return

                //TODO Handle server conection error

                // Never retry for a specific key.
                //if (key === '/api/user') return

                // Only retry up to 10 times.
                if (retryCount >= 10) return

                // Retry after 5 seconds.
                setTimeout(() => revalidate({ retryCount }), 5000)
            }
        } // check better options, with this one, it doesnt stop retrying
    );

    return {
        user: data?.user,
        loggedOut: error && error.status === 401,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export default useUser;

/* 
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (
            //isSameOrigin(error.response?.request?.responseURL) &&
             error.response?.status === 401
            //&& error.response?.data?.message !== 'Bad credentials.'
        ) {
            console.log("Intercepted Error 401")
            const authError = new Error('Not Authorized')
            authError.status = 401
            authError.info = error.response
            throw authError
        }

        return Promise.reject(error);
    }
);
 */