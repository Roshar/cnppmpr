import axios from "axios";
import router from '../router'


const requestAxios = axios.create({
    // baseURL: process.env.VUE_APP_URL
    baseURL: 'http://193.168.46.58:3500'
})

requestAxios.interceptors.response.use(null,error => {
    if(error.response.status === 401) {
        router.push('/auth')
    }
    return Promise.reject(error);
});

export default requestAxios