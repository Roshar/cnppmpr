import axios from '../../axios/request'
const TOKEN_KEY = 'jwt-token'

export default {
    namespaced: true,

    state: {
        token: localStorage.getItem(TOKEN_KEY),
        s_companions: null,
        chatData: null,
        senderData: null,
        addresseeData: null,
        avatar: null
    },

    mutations: {

        setCompanions (state, values) {
            state.s_companions = values
        },

        setChat(state, values) {
            state.chatData = values
        },
        setSender(state, values) {
            state.senderData = values
        },
        setAddressee(state, values) {
            state.addresseeData = values
        },
        setAvatar(state, values) {
            state.avatar = values
        }
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

        async sendMessageInChat ({dispatch,state,commit},payload) {
            try {

                const {data} = await axios.post('/api/conversation/send',{
                    sendBody: payload.message,
                    targetUserId: payload.targetUserId,
                    token: state.token,
                    link: 'dfffdfgg'
                })
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

        async getCompanions ({commit, dispatch, state}) {
            try {
                const {data} = await axios.post('/api/conversation/getCompanions',{token: state.token})
                 commit('setCompanions',data.values['studentsData'])

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getChat ({dispatch,commit},payload) {
            try {
                const {data} = await axios.post('/api/conversation/getChat',payload)
                commit('setChat',data.values.chatData)
                commit('setSender',data.values.senderData)
                commit('setAddressee',data.values.addresseeData)
                commit('setAvatar',data.values.addresseeData)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        // async getChat ({dispatch,commit},payload) {
        //     return new Promise(resolve => {
        //        const {data} = axios.post('/api/conversation/getChat',payload)
        //     }).then((resolve)=>{
        //         console.log(resolve)
        //         // commit('setChat',data.values.chatData)
        //         // commit('setSender',data.values.senderData)
        //         // commit('setAddressee',data.values.addresseeData)
        //         // commit('setAvatar',data.values.addresseeData)
        //     })
        //     // try {
        //     //
        //     // } catch(e){
        //     //     dispatch('setSystemMessage', {
        //     //         value: e.message,
        //     //         type: 'danger'
        //     //     }, {root: true})
        //     //     throw new Error()
        //     // }
        // },


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

        async createConversationWithoutInsert ({dispatch, state},payload) {
            try {
                const {data} = await axios.post('/api/conversation/createConversationWithoutInsert',
                    {token: state.token,targetUserId: payload.targetUserId})
                return data.values
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
        getCompanions(state) {
            return state['s_companions']
        },
        getChat(state) {
            return state.chatData
        },
        getSender(state) {
            return state.senderData
        },
        getAddressee(state) {
            return state.addresseeData
        },
        getAvatar(state) {
            return state.avatar
        }
    }

}