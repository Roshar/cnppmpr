// import { useLoginForm } from "../../use/login-form"
import axios from 'axios'
const TOKEN_KEY = 'jwt-token'

export default {
    //для экспорта модуля  в  глобальный store, например: store.dispatch('auth/login')
    namespaced: true,

    state: {
        token: localStorage.getItem(TOKEN_KEY),
    },

    mutations: {
        setToken(state, token){
            state.token = token
            localStorage.setItem(TOKEN_KEY,token)
        },
        logout(state){
            console.log(state)
            state.token = null
            localStorage.removeItem(TOKEN_KEY)
        }
    },

    actions:{
        async login({ commit, dispatch}, user) {
            try{
                const {data} =  await axios.post('http://localhost:3500/api/auth/signin',user)
                // console.log(data.response.data.values)
                console.log(data)
                commit('setToken', data.values.token)
            } catch(e){
                // console.log(e.response.data.values.message)
                dispatch('setErrorMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        }
    },

    getters: {
        token(state){
            return state.token
        },
        isAuthenticated(store, token){
            return !!store.token
        }
    }
}