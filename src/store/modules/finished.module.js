import axios from '../../axios/request'

export default {
    namespaced: true,
    state: {
        statusInCurrentIom: [],
        courses: [],
        finishedStudents: [],
    },
    mutations: {
        setStatus(state, value) {
            state.statusInCurrentIom = value
        },
        setCourses(state, value) {
            state.courses = value
        },

        setFinishedStudents(state, value) {
            state.finishedStudents = value
        },
    },
    actions:{
        async studentEducation({ commit, dispatch}, payload) {
            try {
                const {data} = await axios.post('/api/finished/studentEducation', payload)
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: (data.code === 200) ? 'primary' : 'warning'
                }, {root: true})
            }catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async checkStudentIOM({ commit, dispatch}, payload) {
            try {
                const {data} = await axios.post('/api/finished/checkStudentIOM', payload)
                if(data.values && data.values.length) {
                    commit('setStatus', data.values)
                }
            }catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getFinishedCourses({ commit, dispatch}, payload) {
            try {
                const {data} = await axios.post('/api/finished/getFinishedCourses', payload)

                if(data.values && data.values.length) {
                    commit('setCourses', data.values)
                }
            }catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },


        async getStudentsForTutor({ commit, dispatch}, payload) {
            try {
                const {data} = await axios.post('/api/finished/getStudentsForTutor', payload)

                if(data.values && data.values.length) {
                    commit('setFinishedStudents', data.values)
                }
            }catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

    },

    getters: {
        getStatusByIOM(state) {
            return state.statusInCurrentIom
        },
        getCourses(state) {
            return state.courses
        },

        finishedStudents(state) {
            return state.finishedStudents
        },
    }

}