import axios from '../../axios/request'
const TOKEN_KEY = 'jwt-token'

export default {
    namespaced: true,
    state: {
        libraryData: [],
    },
    mutations:{
        setLibraryData(state, data) {
            state.libraryData = data
        },
        clearLibraryData(state) {
            state.libraryData = []
        }
    },
    actions:{
        async getLibraryData({commit, dispatch, state}, payload) {
            try {
                commit('clearLibraryData')
                const {data} = await axios.post('/api/library/getLibraryData',payload )
                if(data.values.length){
                    commit('setLibraryData',data.values)
                }

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },
        async addExercise({ commit, dispatch}, payload) {
            try{
                const {data} = await axios.post('/api/library/addExercise',payload)
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
        async getTaskById ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/library/getTask',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async updateExercise({ commit, dispatch}, payload) {
            try{
                const {data} = await axios.post('/api/library/update',payload)
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
        async deleteTask({commit, dispatch}, payload) {
            try{
                const {data} = await axios.post('/api/library/deleteTask',payload)
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
        getLibraryData(state) {
            return state.libraryData
        }
    }
}