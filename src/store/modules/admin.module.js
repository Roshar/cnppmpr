import axios from '../../axios/request'

export default {
    namespaced: true,

    state: {

    },

    mutations: {

    },
    actions:{
        async getUserCount ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getUserCount', payload)
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
        async getTutorAndCheckAtFree ({dispatch}) {
            try {
                const {data} = await axios.post('/api/admin/getTutorAndCheckAtFree')
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

        async deleteIom ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/deleteIom',payload)
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
        async getReportCount ({dispatch}) {
            try {
                const {data} = await axios.post('/api/admin/getReportCount')
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
        async liveSearch ({dispatch},payload) {
            try {
                console.log(payload)
                if(payload.areaId == 0 && payload.disId == 0){
                    const {data} = await axios.post('/api/admin/liveSearchInput',payload)
                    return data.values
                }else if(payload.areaId != 0 && payload.disId == 0) {
                    const {data} = await axios.post('/api/admin/liveSearchInputAndArea',payload)
                    return data.values
                }else if(payload.areaId != 0 && payload.disId != 0) {
                    const {data} = await axios.post('/api/admin/liveSearchInputAndAreaAndDis',payload)
                    return data.values
                }else if(payload.areaId == 0 && payload.disId != 0) {
                    const {data} = await axios.post('/api/admin/liveSearchInputAndDis',payload)
                    return data.values
                }
            } catch(e){
                console.log(e)
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async createGroup({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/createGroup',payload)
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'primary'
                }, {root: true})
            } catch(e){
                console.log(e)
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getGroups ({dispatch}) {
            try {
                const {data} = await axios.post('/api/admin/getGroups')
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