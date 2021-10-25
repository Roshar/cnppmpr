import axios from '../../axios/request'

export default {
    namespaced: true,

    state: {

    },

    mutations: {

    },
    actions:{
        async sendMessage ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/conversation/send',payload)
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'primary'
                }, {root:true})
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getUsersForConversation ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/conversion/getUsersForConversation',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getCompanions ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/conversation/getCompanions',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getChat ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/conversation/getChat',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },


        async searchUser ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/conversation/searchUser',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async createConversationWithoutInsert ({dispatch},payload) {
            try {
                await axios.post('/api/conversation/createConversationWithoutInsert', payload)
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },



    },

    getters: {

    }
}