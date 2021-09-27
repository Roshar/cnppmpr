import axios from '../../axios/request'
const TOKEN_KEY = 'jwt-token'
const ROLE = 'role'
const USERID = 'userId'
const MESSAGE = 'message'


export default {
    namespaced: true,

    state: {
        token: localStorage.getItem(TOKEN_KEY),
        userId: localStorage.getItem(USERID),
        role: null,
        userData: []

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
        setUserData(state, userData) {
            state.userData = userData
        },
        setMessage(state, message) {
            state.message = message
            localStorage.setItem(MESSAGE,message)
        },

    },

    actions:{
        async getUserData({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/user/getUserData',{user:payload} )
                console.log(data.values[0].name)
                commit('setUserData', data)

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
                console.log("not module user")
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
        }
    }
}