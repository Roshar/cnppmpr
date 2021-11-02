import axios from '../../axios/request'
const TOKEN_KEY = 'jwt-token'

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('jwt-token'),
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
        async getLibraryData({commit, dispatch, state}) {
            try {
                commit('clearLibraryData')
                const {data} = await axios.post('/api/admin/globalLibrary/getData')
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

        async getLibraryDataByTutorDiscipline({commit, dispatch, state},payload) {
            try {
                commit('clearLibraryData')
                const {data} = await axios.post('/api/admin/globalLibrary/getDataByTutorDiscipline',payload)
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

        async getLibraryDataById({commit, dispatch, state}, payload) {
            try {
                commit('clearLibraryData')
                const {data} = await axios.post('/api/admin/globalLibrary/getDataById',payload)
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

        async getLibraryDataWithFilter({commit, dispatch}, payload) {
            try {
                commit('clearLibraryData')
                const {data} = await axios.post('/api/admin/globalLibrary/getDataWithFilter',payload)
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

        async deleteLibraryById({commit, dispatch}, payload) {
            try {
                console.log(payload)
                const {data} = await axios.post('/api/admin/globalLibrary/deleteById',payload)
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

        async addInLibrary({commit, dispatch, state}, payload) {
            try {

                const {data} = await axios.post('/api/admin/globalLibrary/addInLibrary',{
                        payload,
                        token: state.token
                })
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

        async updateInLibrary({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/admin/globalLibrary/updateInLibrary',{
                        payload
                })
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
        }


    },
    getters: {
        getLibraryData(state) {
            return state.libraryData
        }
    }
}