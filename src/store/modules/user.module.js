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
        userData: [],
        userLink: [],
        adminData: null,

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

        setAdminData(state, values) {
            state.adminData = values
        },
        setUserLink(state, userData) {
            state.userLink = userData
        },
        setMessage(state, message) {
            state.message = message
            localStorage.setItem(MESSAGE,message)
        },

    },

    actions:{
        async getAdminData({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/user/getAdminData',{user:payload} )
                commit('setUserData', data.values[0])
                return data.values

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
                console.log("not module user")
            }
        },

        async getTutorData({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/user/getTutorData',{user:payload} )
                return data.values

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
                console.log("not module user")
            }
        },

        async getDataAdminAccount({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/user/getDataAdminAccount',payload )
                commit('setAdminData', data.values)
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
                console.log("not module user")
            }
        },

        async getUserData({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/user/getUserData',{user:payload} )
                commit('setUserData', data.values[0])
                commit('setUserLink', data.values[1])

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
                console.log("not module user")
            }
        },
        async getFromTutorTbls ({commit, state}, token) {
            try {
                const {data} = await axios.post('/api/user/getFromTutorTbls',{token} )
                // console.log(data.values[0].name)
                // commit('setUserData', data.values[0])
                // commit('setUserLink', data.values[1])


            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
                console.log("not module user")
            }
        },


        async changeAvatar ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/user/changeAvatar',payload)
                if(data.values.code === 400) {
                    dispatch('setSystemMessage', {
                        value: data.values.message,
                        type: 'danger'
                    }, {root: true})
                }else {
                    dispatch('setSystemMessage', {
                        value: data.values.message,
                        type: 'primary'
                    }, {root: true})
                }
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async deleteTutor ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/user/deleteTutor',payload)
                if(data.values) {
                    dispatch('setSystemMessage', {
                        value: data.values.message,
                        type: 'primary'
                    }, {root: true})
                }
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async deleteStudent ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/user/deleteStudent',payload)
                if(data.values) {
                    dispatch('setSystemMessage', {
                        value: data.values.message,
                        type: 'primary'
                    }, {root: true})
                }
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }

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
        getUserLinks(state) {
            return state.userLink
        },
        getAdminData(state) {
            return state.adminData
        }

    }
}