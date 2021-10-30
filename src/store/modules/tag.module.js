import axios from '../../axios/request'

export default {
    namespaced: true,

    state: {
        tags: null,
        tag: null
    },

    mutations: {
        setTags(state, value) {
            state.tags = value
        },

        setSingleTag(state, value) {
            state.tag = value
        }
    },
    actions:{
        async getTag ({dispatch,commit}) {
            try {
                const {data} = await axios.post('/api/iom/getTag')
                if(data.values) {
                    commit('setTags',data.values )
                }
                return data.values ? data.values : []
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getSingleTag ({dispatch,commit}, payload) {
            try {
                const {data} = await axios.post('/api/iom/getSingleTag',payload)
                if(data.values) {
                    commit('setSingleTag',data.values )
                }
                return data.values ? data.values : []
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async editTag({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/iom/editTag',payload)
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

        async addNew({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/iom/addNew',payload)
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

        async deleteTag({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/iom/deleteTag',payload)
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
        getTags(state) {
            return state.tags
        },
        getSingleTag(state) {
            return state.tag
        },

    }
}