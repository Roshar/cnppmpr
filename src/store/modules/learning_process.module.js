import axios from '../../axios/request'

export default {
    namespaced: true,

    actions:{
        async getLearningIOM({dispatch}, payload) {
            try {
                const {data} = await axios.post('/api/learning_process/getLearningIOM',payload)
                return data.values ? data.values : []
            }catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getLearningIomById({dispatch}, payload) {
            try {
                const {data} = await axios.post('/api/learning_process/getLearningIomById',payload)
                return data.values ? data.values : []
            }catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },



    },

}