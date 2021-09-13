// import { useLoginForm } from "../../use/login-form"
import axios from 'axios'
const TOKEN_KEY = 'jwt-token'
const ROLE = 'role'

export default {
    //для экспорта модуля  в  глобальный store, например: store.dispatch('auth/login')
    namespaced: true,

    state: {
        token: localStorage.getItem(TOKEN_KEY),
        role: localStorage.getItem(ROLE),
        // role: null,
        schoolsList: [],
        areasList: [],

    },

    mutations: {
        setToken(state, token){
            state.token = token
            localStorage.setItem(TOKEN_KEY,token)
        },
        setRole(state, role){
            state.role = role
            localStorage.setItem(ROLE,role)
        },
        logout(state){
            state.token = null
            state.role = null
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(ROLE)
            console.log(state.role)
        },
        setSchools(state, list) {
            state.schoolsList = list
        },
        clearSchools(state) {
            state.schoolsList = []
        },
        setAreas(state, list) {
            state.areasList = list
        }
    },

    actions:{
        //авторизация
        async login({ commit, dispatch}, user) {
            try{

                const {data} =  await axios.post('http://localhost:3500/api/auth/signin',user)
                console.log(data.values.role)
                    commit('setToken', data.values.token)
                    commit('setRole', data.values.role)
            } catch(e){

                // console.log(e.response.data.values.message)
                dispatch('setErrorMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        //регистрация

        async registration({ commit, dispatch}, payload) {
            console.log(payload)
            try{
                //
                await axios.post('http://localhost:3500/api/auth/signup',payload)
            } catch(e){
                dispatch('setErrorMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        //школы по id района
        async schools({commit, dispatch}, parameter) {
            try {
                if(parameter.id > 0){
                    const {data} =  await axios.post('http://localhost:3500/api/getschools/byarea',parameter)
                    commit('setSchools',data.values)
                }
                else {
                    commit('clearSchools')
                }

            }catch (e) {
                console.log(e)
            }
        },
        // районы общий список
        async areas({commit, dispatch}) {
            try {
                const {data} =  await axios.post('http://localhost:3500/api/getschools/area')
                commit('setAreas',data.values)
            }catch (e) {
                console.log(e)
            }
        },

        async confirmRole({commit, dispatch}, user) {
            try {
                const {data} =  await axios.post('http://localhost:3500/api/getschools/area')
                commit('setRole', data.values.role)
            } catch (e) {
                console.log(e)
            }
        }

    },

    getters: {
        token(state){
            return state.token
        },
        role(state){
            return state.role
        },
        isAuthenticated(store, token){
            return !!store.token
        },
        schoolsList(state) {
            return state.schoolsList
        },
        areasList(state) {
            return state.areasList
        }
    }
}