// import { useLoginForm } from "../../use/login-form"
import axios from 'axios'
const TOKEN_KEY = 'jwt-token'
const ROLE = 'role'
const STATUS = 'status'
const CODE = 'code'
const MESSAGE = 'message'
const RECOVERY = 'recovery'
const LOGIN = 'login'

export default {
    //для экспорта модуля  в  глобальный store, например: store.dispatch('auth/login')
    namespaced: true,

    state: {
        token: localStorage.getItem(TOKEN_KEY),
        // role: localStorage.getItem(ROLE),
        role: null,
        status: null,
        schoolsList: [],
        areasList: [],
        disciplineList: [],
        code: localStorage.getItem(CODE),
        message: null,
        recovery: localStorage.getItem(RECOVERY),
        login: localStorage.getItem(LOGIN)
    },

    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY,token)
        },
        setRole(state, role){
            state.role = role
            localStorage.setItem(ROLE,role)
        },
        setStatus(state, status) {
            state.status = status
            localStorage.setItem(STATUS,status)
        },
        setCode(state, code) {
            state.code = code
            localStorage.setItem(CODE,code)
        },
        setCodeRecovery(state, recovery) {
            state.code = recovery
            localStorage.setItem(RECOVERY,recovery)
        },
        setMessage(state, message) {
            state.message = message
            localStorage.setItem(MESSAGE,message)
        },
        setLogin(state, login) {
            state.login = login
            localStorage.setItem(LOGIN, login)
        },
        logout(state){
            state.token = null
            state.role = null
            state.message = null
            state.code = null
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(ROLE)
            localStorage.removeItem(STATUS)
            localStorage.removeItem(MESSAGE)
            localStorage.removeItem(CODE)
        },
        setSchools(state, list) {
            state.schoolsList = list
        },
        clearSchools(state) {
            state.schoolsList = []
        },
        clearCodeRecovery(state) {
            state.recovery = null
            localStorage.removeItem(RECOVERY)
        },
        clearLogin(state) {
            state.login = null
            localStorage.removeItem(LOGIN)
        },
        setAreas(state, list) {
            state.areasList = list
        },
        setDisciplines(state, list) {
            state.disciplineList = list
        }
    },

    actions:{
        //авторизация
        async login({ commit, dispatch}, user) {
            try{

                const {data} =  await axios.post('http://localhost:3500/api/auth/signin',user)
                // console.log(data.values.role)
                    commit('setToken', data.values.token)
                    commit('setRole', data.values.role)
                    commit('setStatus', data.values.status)
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
            // console.log(payload)
            try{
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
                const {data} = await axios.post('http://localhost:3500/api/getschools/area')
                commit('setAreas',data.values)
            }catch (e) {
                console.log(e)
            }
        },

        // список дисциплин
        async disciplines({commit, dispatch}) {
            try {
                const {data} = await axios.post('http://localhost:3500/api/get/discipines')
                commit('setDisciplines',data.values)
            }catch (e) {
                console.log(e)
            }
        },

        async confirmRole({commit, dispatch, state}, payload) {
            try {
                const user = {'token':state.token}
                const {data} =  await axios.post('http://localhost:3500/api/get/role', user)
                commit('setRole', data.values.role)
                commit('setStatus', data.values.status)
            } catch (e) {
                console.log(e)
            }
        },

        async logout({commit, dispatch, state}, payload) {
            try {
                const user = {'token':state.token}
                const res = await axios.post('http://localhost:3500/api/logout', user)
                commit('logout')
            } catch (e) {
                console.log('ошибка logout')
            }
        },

        async sendCodeToMail({commit, dispatch, state}, payload) {
            try {
                const user = {token:state.token}
                const {data} = await axios.post('http://localhost:3500/api/sendCodeToMail', user)
                console.log(data)
                commit('setCode', data.values.code)
                commit('setMessage', data.values.message)
            } catch (e) {
                console.log('ошибка logout')
            }
        },

        async confirmCode({commit, dispatch, state}, payload) {
            try {
                console.log(payload)
                await axios.post('http://localhost:3500/api/auth/confirmcode',payload)
            } catch(e) {

            }
        },

        async recovery({commit, dispatch, state}, payload) {
            try {
                if(payload.value) {
                    const {data} = await axios.post('http://localhost:3500/api/auth/recovery',{recovery:payload.value})
                    commit('setLogin',payload.value)
                    dispatch('setErrorMessage', {
                        value: data.values.message,
                        type: 'primary'
                    }, {root: true})
                }
            } catch(e){
                dispatch('setErrorMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async recoverychecklink({commit, dispatch, state}, payload) {
            try {

                const {data} = await axios.post('http://localhost:3500/api/auth/recoverychecklink',payload)
                commit('setCodeRecovery', data.values.code)
                dispatch('setErrorMessage', {
                    value: data.values.message,
                    code: data.values.code,
                    type: 'primary'
                }, {root: true})
            } catch(e){
                dispatch('setErrorMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async changepassword({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('http://localhost:3500/api/auth/changepassword', payload)
                commit('clearLogin')
                commit('clearCodeRecovery')
                dispatch('setErrorMessage', {
                    value: data.values.message,
                    type: 'primary'
                }, {root: true})
            } catch(e){
                dispatch('setErrorMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },




    },

    getters: {
        token(state) {
            return state.token
        },
        role(state) {
            return state.role
        },
        status(state) {
            return state.status
        },
        code(state) {
            return state.code
        },
        isAuthenticated(store, token){
            return !!store.token
        },
        isActive(store, status) {
            return !!store.status
        },

        schoolsList(state) {
            return state.schoolsList
        },
        areasList(state) {
            return state.areasList
        }
    }
}