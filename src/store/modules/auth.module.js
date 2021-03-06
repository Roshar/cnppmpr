import axios from '../../axios/request'
import router from "../../router";
const TOKEN_KEY = 'jwt-token'
const ROLE = 'role'
const STATUS = 'status'
const CODE = 'code'
const MESSAGE = 'message'
const RECOVERY = 'recovery'
const LOGIN = 'login'
const USERID = 'userId'

export default {

    namespaced: true,

    state: {
        token: localStorage.getItem(TOKEN_KEY),
        // role: localStorage.getItem(ROLE),
        role: null,
        status: null,
        layout: null,
        schoolsList: [],
        areasList: [],
        disciplineList: [],
        code: localStorage.getItem(CODE),
        message: null,
        recovery: null,
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
            if(status !== 'null') {
                state.status  = status
            }
        },
        setCode(state, code) {
            state.code = code
            localStorage.setItem(CODE,code)
        },
        setCodeRecovery(state, recovery) {
            state.recovery = recovery
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
            state.layout = null
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

        addLayout(state,value) {
            state.layout = value
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
        //??????????????????????
        async login({ commit, dispatch}, user) {
            try{
                console.log('login start')
                const {data} =  await axios.post('/api/auth/signin',user)
                console.log('login end')
                    commit('setToken', data.values.token)
                    commit('setRole', data.values.role )
                    commit('setStatus',data.values.status )
                    commit('setUserId', data.values.userId)
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        //??????????????????????
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

        //?????????? ???? id ????????????

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

        // ???????????? ?????????? ????????????

        async areas({commit, dispatch}) {
            try {
                const {data} = await axios.post('/api/getschools/area')
                commit('setAreas',data.values)
            }catch (e) {
                console.log(e)
            }
        },

        // ???????????? ??????????????????

        async disciplines({commit, dispatch}) {
            try {
                const {data} = await axios.post('/api/get/discipines')
                commit('setDisciplines',data.values)
            }catch (e) {
                console.log(e)
            }
        },

        // ?????????????????????????? ???????? ????????????????????????

        async confirmRole({commit, dispatch, state}, payload) {
            try {
                const user = {'token':state.token}
                const {data} =  await axios.post('/api/get/role', user)
                if(data) {
                    commit('setRole', data.values.role)
                    commit('setStatus', data.values.status)
                }else {
                    commit('setRole', null)
                    commit('setStatus', null)
                }

            } catch (e) {
                console.log(e)
            }
        },


        // ???????????????? ?????????????? ?????? ????????????????????
        async checkRoleByToken({state}, payload) {
            try {
                const {data} =  await axios.post('/api/get/role', payload)
                return data;
            } catch (e) {
                console.log(e)
            }
        },

        // ??????????

        async logout({commit, dispatch, state}, payload) {
            try {
                const user = {'token':state.token}
                await axios.post('/api/logout', user)
                commit('logout')
            } catch (e) {
                console.log('???????????? logout')
            }
        },

        // ???????????????? ???????? ?????? ?????????????????? ?????????????? ????????????????

        async sendCodeToMail({commit, dispatch, state}, payload) {
            try {
                const user = {token:state.token}
                const {data} = await axios.post('/api/sendCodeToMail', user)
                commit('setCode', data.values.code)
                commit('setMessage', data.values.message)
            } catch (e) {
                console.log('???????????? logout')
            }
        },

        // ?????????????????????? ????????

        async confirmCode({commit, dispatch, state}, payload) {
            try {
                 await axios.post('/api/auth/confirmcode',payload)
            } catch(e) {

            }
        },

        // 1-?? ???????? | ???????????????????????????? ???????????? | ???????????????? ??????-???????????? ???? ??????????

        async recovery({commit, dispatch, state}, payload) {

            try {
                if(payload) {
                    const {data} = await axios.post('/api/auth/recovery',payload)
                    state.recovery = null
                    if(data.status === 201) {
                        commit('setCodeRecovery', true)
                        dispatch('setSystemMessage', {
                            value: data.values.message,
                            type: 'warning'
                        }, {root: true})
                    }
                    if(data.status === 200) {
                        dispatch('setSystemMessage', {
                            value: data.values.message,
                            type: 'primary'
                        }, {root: true})
                    }

                }
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        // 2-?? ???????? | ???????????????????????????? ???????????? | ?????????????????????? ????????????

        async recoverychecklink({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/auth/recoverychecklink',payload)
                if(!data.values.length) {
                    await router.push('/404')
                }
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        // 3-?? ???????? | ???????????????????????????? ???????????? | ?????????? ????????????

        async changepassword({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/auth/changepassword', payload)
                if(data.values.code){
                    await router.push('/auth')
                }
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
        getCodeRecovery(state) {
            return state.recovery
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