import axios from "axios";
import router from '../router'


const requestAxios = axios.create({
    // baseURL: process.env.VUE_APP_URL
    // baseURL: 'https://it-govzalla-back.onrender.com'
       baseURL: 'http://193.168.46.58:8081'
})

requestAxios.interceptors.response.use(null,error => {
    console.log('axios')
    if(error.response.status === 401) {
        router.push('/auth')
    }
    return Promise.reject(error);
});

export default requestAxios