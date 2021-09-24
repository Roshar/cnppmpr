import axios from 'axios'
const TOKEN_KEY = 'jwt-token'
const ROLE = 'role'


export default {
    namespaced: true,

    state: {
        token: localStorage.getItem(TOKEN_KEY),
        // role: localStorage.getItem(ROLE),
        role: null,

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

        setMessage(state, message) {
            state.message = message
            localStorage.setItem(MESSAGE,message)
        },

        setDisciplines(state, list) {
            state.disciplineList = list
        }
    },

    actions:{
        async getUserData({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('http://localhost:3500/api/user/getUserData',{user:payload} )
                // console.log(payload)

            } catch(e){
                // dispatch('setSystemMessage', {
                //     value: e.response.data.values.message,
                //     type: 'danger'
                // }, {root: true})
                // throw new Error()
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