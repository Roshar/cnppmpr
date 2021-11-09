import axios from '../../axios/request'

export default {
    namespaced: true,

    actions:{
        async getAreas({dispatch}) {
            try {
                const {data} = await axios.post('/api/getschools/area')
                return data.values ? data.values : []
            }catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async test({dispatch}) {

            try {
                const {data} = await axios.post('/api/users')
                return data.values ? data.values : []
            }catch(e){
                dispatch('setSystemMessage', {
                    value: e,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

    },

}