import axios from '../../axios/request'
const USERID = 'userId'
const MESSAGE = 'message'


export default {
    namespaced: true,

    state: {
        userId: localStorage.getItem(USERID),
        statistics: null
    },

    mutations: {
        setMessage(state, message) {
            state.message = message
            localStorage.setItem(MESSAGE,message)
        },
        setStatistics(state, statistics) {
            state.statistics = statistics
        }

    },

    actions:{
        async getFromTutorTbls ({commit, dispatch, state}, token) {
            try {
                console.log('token')
                const {data} = await axios.post('/api/user/getFromTutorTbls',{token} )
                commit('setStatistics', data.values[0])
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
                console.log("not module user")
            }
        }
    },

    getters: {

    }
}