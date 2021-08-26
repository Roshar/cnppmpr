// import { useLoginForm } from "../../use/login-form"

export default {
    namespaced: true,
    state() {
        return {
            token: null
        }
    },
    mutation: {
        setToken(state, token){
            state.token = token
            localStorage.setItem('jwt-token',token)
        },
        logout(state){
            state.token - null
            localStorage.removeItem('jwt-token')
        }
    },

    action:{
        async login({ commit }, user) {
            commit('setToken', 'Test token')
            console.log(user)
        }
    },

    getters: {
        token(state){
            return state.token
        },
        isAuthenticated(_, getters){
            return !!getters.token
        }
    }
}