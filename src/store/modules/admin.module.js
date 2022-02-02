import axios from '../../axios/request'

export default {
    namespaced: true,

    state: {
        studentsFromCurrentGroup: null,
        dependenciesData: null,
    },

    mutations: {
        setDependenciesData(state, values) {
            state.dependenciesData = values
        },

        setAppointedStudentsCurrentGroup(state,values) {
            state.studentsFromCurrentGroup = values
        },

    },
    actions:{
        async getUserCount ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getUserCount', payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getIomData ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getUserCount', payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async updateAdminProfile ({commit, dispatch, state}, payload) {
            try {

                const {data} = await axios.post('/api/user/updateAdminProfile',payload )
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'premier'
                }, {root: true})
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getUsersActive ({dispatch},payload) {
            try {

                if(payload.filter){
                    if(payload.areaId == '0' && payload.disId == '0' && payload.gender == '0' ) {
                        const {data} = await axios.post('/api/admin/getUsersActive', payload)
                        return data.values
                    }else if(payload.areaId != '0' && payload.disId != '0' && payload.gender != '0') {
                        const {data} = await axios.post('/api/admin/getUsersWithDisAreaGenderFilter', payload)
                        return data.values
                    }else if(payload.areaId != '0' && payload.disId == '0' && payload.gender == '0'){
                        const {data} = await axios.post('/api/admin/getUsersWithAreaFilter', payload)
                        return data.values
                    }else if(payload.areaId == '0' && payload.disId != '0' && payload.gender == '0') {
                        const {data} = await axios.post('/api/admin/getUsersWithDisFilter', payload)
                        return data.values
                    }else if(payload.areaId == '0' && payload.disId == '0' && payload.gender != '0') {
                        const {data} = await axios.post('/api/admin/getUsersWithGenderFilter', payload)
                        return data.values
                    }else if(payload.areaId == '0' && payload.disId != '0' && payload.gender != '0') {
                        const {data} = await axios.post('/api/admin/getUsersWithDisGenderFilter', payload)
                        return data.values
                    }else if(payload.areaId != '0' && payload.disId != '0' && payload.gender == '0') {
                        const {data} = await axios.post('/api/admin/getUsersWithDisAreaFilter', payload)
                        return data.values
                    }else if(payload.areaId != '0' && payload.disId == '0' && payload.gender != '0') {
                        const {data} = await axios.post('/api/admin/getUsersWithAreaGenderFilter', payload)
                        return data.values
                    }
                }else {
                    const {data} = await axios.post('/api/admin/getUsersActive', payload)
                    return data.values
                }

            } catch(e){
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

                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getHistoryInfoIOM ({dispatch}, payload) {
            try {
                const {data} = await axios.post('/api/admin/getHistoryInfoIOM', payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getAreasStatisticsByStudent ({dispatch}) {
            try {
                const {data} = await axios.post('/api/admin/getAreasStatisticsByStudent')
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getIomStatistic ({dispatch}) {
            try {
                const {data} = await axios.post('/api/admin/getIomStatistic')
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getDisciplineStatisticsByStudentOrTutor ({dispatch}, payload) {
            try {
                const {data} = await axios.post('/api/admin/getDisciplineStatisticsByStudentOrTutor',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getFinishedStudentsByYear ({dispatch}, payload) {
            try {
                const {data} = await axios.post('/api/admin/getFinishedStudentsByYear',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
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

                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async activationById ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/activationById',payload)
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

        async deactivationById ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/deactivationById',payload)
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

        async addMentor ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/addMentor',payload)
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'primary'
                }, {root: true})
            } catch(e){
                console.log(e)
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getUsersWithBanStatus ({dispatch},payload) {
            try {
                console.log(payload)
                const {data} = await axios.post('/api/admin/getUsersWithBanStatus',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getCountGender({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getCountGender',payload)
                return data.values
            } catch(e){
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
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getProfile ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getProfile',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getMentorData ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getMentors',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getMentorById ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getMentorById',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async editMentorData ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/editMentorData',payload)
                console.log(data.values)
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

        async deleteMentor ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/deleteMentor',payload)
                console.log(data.values)
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

        async getDependenciesStudent ({dispatch, commit},payload) {
            try {
                const {data} = await axios.post('/api/admin/getDependenciesStudent',payload)
                if(data.values.length) {
                    commit('setDependenciesData',data.values)
                }
                return data.values

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getDependenciesTutor ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getDependenciesTutor',payload)
                // console.log(data.values)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getIomByStudentAndTutor ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getIomByStudentAndTutor',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getAllIomDataByTutorId ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getAllIomDataByTutorId',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getTask ({dispatch},payload) {
            try {

                const {data} = await axios.post('/api/admin/getTask',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getDataFromIOM ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getDataFromIOM',payload)
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getExercisesByIomId ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/admin/getExercisesByIomId',
                    {payload})
                return data.values

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getStatusFinished ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/admin/getStatusFinished',
                    {tutorId: payload.tutorId,
                        studentId:payload.studentId,
                        iomId: payload.iomId} )
               if(data.values){
                   return data.values
               }

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getStatusToPendingFinish ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/admin/getStatusToPendingFinish',
                    {tutorId: payload.tutorId,
                        studentId:payload.studentId,
                        iomId: payload.iomId} )
               if(data.values){
                   return data.values
               }

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getLastUsers ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getLastUsers',payload)
                return data.values
            } catch(e){
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
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async liveSearch ({dispatch},payload) {
            try {

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

                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async deleteGroup({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/deleteGroup',payload)
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

        async deleteInGroup({dispatch},payload) {
            try {
                console.log('start')
                const {data} = await axios.post('/api/admin/deleteInGroup',payload)

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

        async addUserInGroupAndTutor({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/addUserInGroupAndTutor',payload)
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

        async getGroups ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getGroups',payload)
                return data.values
            } catch(e){

                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getIomByTutorId ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getIomByTutorId',payload)
                return data.values
            } catch(e){

                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getFinishedStudentsCountByTutor ({dispatch},payload) {
            try {
                const {data} = await axios.post('/api/admin/getFinishedStudentsCountByTutor',payload)
                return data.values
            } catch(e){

                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },


        async getGroupById ({dispatch}, payload) {
            try {
                const {data} = await axios.post('/api/admin/getGroupById',payload)
                return data.values
            } catch(e){

                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getFreeStudentsByDisciplineId({dispatch}, payload) {
            try {
                const {data} = await axios.post('/api/admin/getFreeStudentsByDisciplineId',payload)
                return data.values
            } catch(e){

                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getAppointedStudentsCurrentGroup({dispatch,commit}, payload) {
            try {
                const {data} = await axios.post('/api/admin/getAppointedStudentsCurrentGroup',payload)
                if(data.values) {
                    commit('setAppointedStudentsCurrentGroup',data.values)
                }
                return data.values
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
        getAppointedStudentsCurrentGroup(state) {
            return state.studentsFromCurrentGroup
        },
        getDependenciesData(state) {
            return state.dependenciesData
        }
    }
}