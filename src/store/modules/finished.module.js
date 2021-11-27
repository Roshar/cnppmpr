import axios from '../../axios/request'

export default {
    namespaced: true,

    actions:{
        async studentEducation({ commit, dispatch}, payload) {
            try {
                const {data} = await axios.post('/api/finished/studentEducation', payload)
                return data.values
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