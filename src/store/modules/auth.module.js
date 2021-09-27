import axios from '../../axios/request'
const TOKEN_KEY = 'jwt-token'
const ROLE = 'role'
const STATUS = 'status'
const CODE = 'code'
const MESSAGE = 'message'
const RECOVERY = 'recovery'
const LOGIN = 'login'
const USERID = 'userId'

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
        login: localStorage.getItem(LOGIN),
        userId: localStorage.getItem(USERID)

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
        setUserId(state, userId) {
            state.userId = userId
            localStorage.setItem(USERID, userId)
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
            localStorage.removeItem(USERID)
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
                const {data} =  await axios.post('/api/auth/signin',user)
                    commit('setToken', data.values.token)
                    commit('setRole', data.values.role)
                    commit('setStatus', data.values.status)
                    commit('setUserId', data.values.userId)
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        //регистрация

        async registration({ commit, dispatch}, payload) {
            try{
                const {data} = await axios.post('/api/auth/signup',payload)
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'primary'
                }, {root: true})
            } catch(e){
                dispatch('setSystemMessage', {
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
                    const {data} =  await axios.post('/api/getschools/byarea',parameter)
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
                const {data} = await axios.post('/api/getschools/area')
                commit('setAreas',data.values)
            }catch (e) {
                console.log(e)
            }
        },

        // список дисциплин

        async disciplines({commit, dispatch}) {
            try {
                const {data} = await axios.post('/api/get/discipines')
                commit('setDisciplines',data.values)
            }catch (e) {
                console.log(e)
            }
        },

        // подтверждение роли пользователя

        async confirmRole({commit, dispatch, state}, payload) {
            try {
                const user = {'token':state.token}
                const {data} =  await axios.post('/api/get/role', user)
                console.log("auth " + data.values.role)
                commit('setRole', data.values.role)
                commit('setStatus', data.values.status)
            } catch (e) {
                console.log(e)
            }
        },

        // Выход

        async logout({commit, dispatch, state}, payload) {
            try {
                const user = {'token':state.token}
                await axios.post('/api/logout', user)
                commit('logout')
            } catch (e) {
                console.log('ошибка logout')
            }
        },

        // отправка кода для активации личного кабинета

        async sendCodeToMail({commit, dispatch, state}, payload) {
            try {
                const user = {token:state.token}
                const {data} = await axios.post('/api/sendCodeToMail', user)
                commit('setCode', data.values.code)
                commit('setMessage', data.values.message)
            } catch (e) {
                console.log('ошибка logout')
            }
        },

        // верификация роли

        async confirmCode({commit, dispatch, state}, payload) {
            try {
                await axios.post('/api/auth/confirmcode',payload)
            } catch(e) {

            }
        },

        // 1-й этап | восстановление пароля | отправка хэш-ссылки на почту

        async recovery({commit, dispatch, state}, payload) {
            try {
                if(payload.value) {
                    const {data} = await axios.post('/api/auth/recovery',{recovery:payload.value})
                    commit('setLogin',payload.value)
                    dispatch('setSystemMessage', {
                        value: data.values.message,
                        type: 'primary'
                    }, {root: true})
                }
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        // 2-й этап | восстановление пароля | верификация ссылки

        async recoverychecklink({commit, dispatch, state}, payload) {
            try {

                const {data} = await axios.post('/api/auth/recoverychecklink',payload)
                commit('setCodeRecovery', data.values.code)
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    code: data.values.code,
                    type: 'primary'
                }, {root: true})
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        // 3-й этап | восстановление пароля | смена пароля

        async changepassword({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/auth/changepassword', payload)
                commit('clearLogin')
                commit('clearCodeRecovery')
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'primary'
                }, {root: true})
            } catch(e){
                dispatch('setSystemMessage', {
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