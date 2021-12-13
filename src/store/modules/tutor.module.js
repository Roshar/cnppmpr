import axios from '../../axios/request'
import router from "../../router";
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
        },

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
        },

        // получить комментарии к заданию

        async getCommentsByTaskForTutor ({commit, dispatch, state }, payload) {
            try {
                const {data} = await axios.post('/api/tutor/getCommentsByTaskForTutor', payload)
                return data.values
            } catch(e){
                await router.push({name:'404'})
            }
        },

        // отправить комментарий
        async sendCommentsForTaskTutor ({commit, dispatch, state }, payload) {
            try {
                const {data} = await axios.post('/api/tutor/sendCommentsForTaskTutor', payload)
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'premier'
                }, {root: true})

            } catch(e){
                await router.push({name:'404'})
            }
        },

        async updateTutorProfile ({commit, dispatch, state}, payload) {
            try {

                const {data} = await axios.post('/api/user/updateTutorProfile',payload )
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'premier'
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

    }
}