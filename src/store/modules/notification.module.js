import axios from '../../axios/request'

export default {
    namespaced: true,

    state: {

    },

    mutations: {

    },
    actions:{
        async getNotificationAction ({dispatch}) {
            try {
                const {data} = await axios.post('/api/notification/getAction')
                return data.values ? data.values : []
            } catch(e){
                console.log(e)
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getIomRequest ({dispatch}) {
            try {
                const {data} = await axios.post('/api/notification/getIomRequest',{token:localStorage.getItem('jwt-token')})
                return data.values ? data.values : []
            } catch(e){
                console.log(e)
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