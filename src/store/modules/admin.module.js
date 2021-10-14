import axios from '../../axios/request'

export default {
    namespaced: true,

    state: {

    },

    mutations: {

    },
    actions:{
        async getStudentsCount ({dispatch}) {
            try {
                const {data} = await axios.post('/api/admin/getStudentsCount')
                return data.values
            } catch(e){
                console.log(e)
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },
        async getOptionFromStudents ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getOptionFromStudents',payload)
                return data.values
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