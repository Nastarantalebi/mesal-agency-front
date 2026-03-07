import axios from  "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

class APIClient<T> {
    endpoint : string;

    constructor(endpoint : string){
        this.endpoint = endpoint;
    }

    getAll = () => {
        return axiosInstance
        .get<T[]>(this.endpoint)
        .then((res => res.data));
    }

    get = () => {
        return axiosInstance
        .get<T>(this.endpoint)
        .then((res => res.data))
    }

    post = (data : T) => {
        return axiosInstance
        .post<T>(this.endpoint, data)
        .then(res => res.data);
    }

    delete = () => { 
        return axiosInstance
        .delete<T>(this.endpoint)
        .then(res => res.data);
    }

}

export default APIClient