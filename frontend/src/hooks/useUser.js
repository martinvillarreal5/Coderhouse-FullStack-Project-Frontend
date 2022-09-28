import useSWR from 'swr'
import axios from 'axios'

/* const fetcher = async (url) => {
        
        const response = await axios.get(url);
        //console.log(response.data);
        return response.data;
    
} */
axios.defaults.withCredentials = true;
const fetcher = (url) => axios(url).then((r) => r.data);


const useUser = () => {
    const { data, error, mutate } = useSWR(
        'http://localhost:8080/user/',
        fetcher,
        { shouldRetryOnError: false } // check better options, with this one, it doesnt stop retrying
    );

    //console.log(error?.response.status)

    return {
        user: data?.user,
        loggedOut: error && error.response.status === 401,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export default useUser;
/*
//use case:

   const { user, isLoading, isError } = useUser()
   if(isLoading) return <Spinner />
   if (isError) return <Error />
   return <img src={user.avatar} /> 
*/