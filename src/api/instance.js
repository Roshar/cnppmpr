import axios from 'axios'

const instance = axios.create({
    baseUrl: 'http://localhost:3500/',
    withCredentials: true,
    headers: {
        accept: 'application/json'
    }
})

export default instance