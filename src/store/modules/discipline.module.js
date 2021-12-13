import axios from '../../axios/request'

export default {
    namespaced: true,

    actions:{
        async getDisciplines({dispatch}) {
            try {
                const {data} = await axios.post('/api/get/discipines')
                return data.values ? data.values : []
            }catch (e) {
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getLevels({dispatch}) {
            try {
                const {data} = await axios.post('/api/get/levels')
                return data.values ? data.values : []
            }catch (e) {
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

    },

}