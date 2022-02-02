import axios from '../../axios/request'
import router from '../../router/'
const TOKEN = 'jwt-token'
const MESSAGE = 'message'


export default {
    namespaced: true,

    state: {
        token: localStorage.getItem(TOKEN),
        statistics: null,
        students: null,
        membersIom: null,
        freestudents: null,
        exercisesFromMyIom: null,
        tagsFromMyIom: null,
        countFinishedStudents: null,
    },

    mutations: {
        setMessage(state, message) {
            state.message = message
            localStorage.setItem(MESSAGE,message)
        },
        setStatistics(state, statistics) {
            state.statistics = statistics
        },

        setExercisesMyIom(state, value) {
            state.exercisesFromMyIom = value
        },

        setExercisesTags(state, value) {
            state.tagsFromMyIom = value
        },
        setStudents(state, value) {
            state.students = value
        },

        setStudentsFromIom(state, value) {
            state.membersIom = value
        },
        setStundentsFinishedIom(state, value) {
            state.countFinishedStudents = value
        },

        setStudentsFreeForIom(state, value) {
            state.freestudents = value
        }


    },

    actions:{
        async getStudentsForTutor ({commit, dispatch, state},payload) {
            try {
                if(!payload.filter) {
                    const {data} = await axios.post('/api/student/getStudentsForTutor',
                        {token: localStorage.getItem('jwt-token'),
                            filter: payload.filter})
                    commit('setStudents', data.values)
                }else if(payload.gender !== '0' && payload.areaId === '0' && payload.iom === '') {
                    const {data} = await axios.post('/api/student/getStudentsForTutorWithGender',
                        {token: localStorage.getItem('jwt-token'),
                            gender: payload.gender,
                        })
                    commit('setStudents', data.values)
                } else if(payload.gender !== '0' && payload.areaId !== '0' && payload.iom === '') {
                    console.log('aaaare')
                    const {data} = await axios.post('/api/student/getStudentsForTutorWithGenderAndArea',
                        {token: localStorage.getItem('jwt-token'),
                            gender: payload.gender,
                            areaId: payload.areaId,
                        })
                    commit('setStudents', data.values)
                }else if(payload.gender !== '0' && payload.areaId !== '0' && payload.iom !== '') {
                    const {data} = await axios.post('/api/student/getStudentsForTutorWithGenderAndAreaAndIom',
                        {token: localStorage.getItem('jwt-token'),
                            gender: payload.gender,
                            areaId: payload.areaId,
                            iom: payload.iom,
                        })
                    commit('setStudents', data.values)
                }else if(payload.gender === '0' && payload.areaId !== '0' && payload.iom !== '') {
                    const {data} = await axios.post('/api/student/getStudentsForTutorWithAreaAndIom',
                        {token: localStorage.getItem('jwt-token'),
                            gender: payload.gender,
                            areaId: payload.areaId,
                            iom: payload.iom,
                        })
                    commit('setStudents', data.values)
                }else if(payload.gender !== '0' && payload.areaId === '0' && payload.iom !== '') {
                    const {data} = await axios.post('/api/student/getStudentsForTutorWithGenderAndIom',
                        {token: localStorage.getItem('jwt-token'),
                            gender: payload.gender,
                            iom: payload.iom,
                        })
                    commit('setStudents', data.values)
                }else if(payload.gender === '0' && payload.areaId !== '0' && payload.iom === '') {
                    const {data} = await axios.post('/api/student/getStudentsForTutorWithArea',
                        {token: localStorage.getItem('jwt-token'),
                            areaId: payload.areaId,
                        })
                    commit('setStudents', data.values)
                }else if(payload.gender === '0' && payload.areaId === '0' && payload.iom !== '') {
                    const {data} = await axios.post('/api/student/getStudentsForTutorWithIom',
                        {token: localStorage.getItem('jwt-token'),
                            iom: payload.iom,
                        })
                    commit('setStudents', data.values)
                }


            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.data.values.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async getUsersFromIomEducation ({commit, dispatch, state}, payload) {
            try {
                if(!payload.filter) {
                    const {data} = await axios.post('/api/student/getUsersFromIomEducation',
                        {token: localStorage.getItem('jwt-token'),
                            filter: payload.filter,
                            iomId: payload.iomId,
                            param: null})
                    if(data.values) {
                        commit('setStudentsFromIom',data.values)
                    }
                }else {
                    const {data} = await axios.post('/api/student/getUsersFromIomEducation',
                        {token: localStorage.getItem('jwt-token'),
                            filter: payload.filter,
                            iomId: payload.iomId,
                            param: payload.param})
                    console.log(data)
                    if(data.values) {
                        commit('setStudentsFromIom',data.values)
                    }
                }

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async getUsersFinishedIom ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/student/getUsersFinishedIom',payload)
                if(data.values) {
                    commit('setStundentsFinishedIom',data.values)
                }
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async getUsersFromIomFreeForEducation ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/student/getUsersFromIomFreeForEducation',
                    {token: localStorage.getItem('jwt-token'),
                        filter: payload.filter,
                        iomId: payload.iomId,
                        param: payload.param,
                    })
                if(data.values) {
                    commit('setStudentsFreeForIom',data.values)
                }
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async addStudentInCurrentIom ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/student/addStudentInCurrentIom',
                    {token: localStorage.getItem('jwt-token'),
                        studentId: payload.studentId,
                        iomId: payload.iomId,
                    })
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'primary'
                }, {root: true})
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async deleteStudentFromIomEducation ({commit, dispatch,useRouter, state}, payload) {
            try {
                const {data} = await axios.post('/api/student/deleteStudentFromIomEducation',
                    {token: localStorage.getItem('jwt-token'),
                        studentId: payload.studentId,
                        iomId: payload.iomId,
                    })
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'primary'
                }, {root: true})
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async updateStudentProfile ({commit, dispatch, state}, payload) {
            try {

                const {data} = await axios.post('/api/user/updateStudentProfile',payload )
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

        async checkIssetMyIom ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/student/checkIssetMyIom',
                    {studentId: payload.studentId,
                         tutorId: payload.tutorId,
                        })
                 return data.values

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        // получить данные из таблицы ДОПОЛНИТЕЛЬНАЯ ИИНФОРМАЦИЯ
        async getStudentAdditionallyOptionById ({ dispatch}, payload) {
            try {
                const {data} = await axios.post('/api/student/getStudentAdditionallyOptionById', payload)
                return data.values

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        // получить уровни образования
        async getEducationLevels ({dispatch}) {
            try {
                const {data} = await axios.post('/api/student/getEducationLevels')
                 return data.values

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        // получитть список должностей
        async getPositions ({commit, dispatch, state}) {
            try {
                const {data} = await axios.post('/api/student/getPositions')
                 return data.values

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        // получить список со стажем
        async getExperience ({commit, dispatch, state}) {
            try {
                const {data} = await axios.post('/api/student/getExperience')
                 return data.values

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        // получить категории учителей
        async getCategoryTeach ({commit, dispatch, state}) {
            try {
                const {data} = await axios.post('/api/student/getCategoryTeach')
                 return data.values

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },


        // добавить или изменть дополнительную информацию о слушателе

        async insertOrUpdateAdditionally ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/student/insertOrUpdateAdditionally',payload)
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'primary'
                }, {root: true})

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async getExercisesFromMyIom ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/student/getExercisesFromMyIom', payload)
                if(data.values && data.values.length) {
                    commit('setExercisesMyIom',data.values[0])
                    commit('setExercisesTags',data.values[1])
                }
                 return data.values

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async getMyTaskById ({commit, dispatch, state }, payload) {
            try {
                const {data} = await axios.post('/api/student/getMyTaskById', payload)
                 return data.values
            } catch(e){
                router.push({name:'404'})
            }
        },



        async getStatisticByIOM ({commit, dispatch, state }, payload) {
            try {
                const {data} = await axios.post('/api/student/getStatisticByIOM', payload)
                 return data.values
            } catch(e){
                await router.push({name:'404'})
            }
        },

        async getCommentsByTask ({commit, dispatch, state }, payload) {
            try {
                const {data} = await axios.post('/api/student/getCommentsByTask', payload)
                 return data.values
            } catch(e){
                await router.push({name:'404'})
            }
        },


        async sendCommentsForTask ({commit, dispatch, state }, payload) {
            try {
                 await axios.post('/api/student/sendCommentsForTask', payload)

            } catch(e){
                await router.push({name:'404'})
            }
        },


        async insertInReportWithoutFile ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/student/insertInReportWithoutFile', payload)
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'primary'
                }, {root: true})
            } catch(e){
                await router.push('/404')
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async insertInReportWithFile ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/student/insertInReportWithFile', payload)
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'primary'
                }, {root: true})
            } catch(e){
                await router.push('/my_course')
                dispatch('setSystemMessage', {
                    value: 'Произошла ошибка во время загрузки файла. Размер загружаемого файла превышает допустимое значение.',
                    type: 'danger'
                }, {root: true})
            }
        },

        async updateInReportWithoutFile ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/student/updateInReportWithoutFile', payload)
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'primary'
                }, {root: true})
            } catch(e){
                await router.push('/404')
                dispatch('setSystemMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },

        async updateInReportWithFile ({commit, dispatch, state}, payload) {
            try {

                const {data} = await axios.post('/api/student/updateInReportWithFile', payload)
                console.log(payload)
                dispatch('setSystemMessage', {
                    value: data.values.message,
                    type: 'primary'
                }, {root: true})
            } catch(e){
                await router.push('/my_course')
                dispatch('setSystemMessage', {
                    value: 'Произошла ошибка во время загрузки файла. Размер загружаемого файла превышает допустимое значение.',
                    type: 'danger'
                }, {root: true})
            }
        },


    },

    getters: {
        getStudentsForTutor(state) {
           return state.students
        },
        getUsersFromIomEducation(state) {
           return state.membersIom
        },

        getUsersFinishedIom(state) {
            return state.countFinishedStudents
        },

        getFreeStudents(state) {
           return state.freestudents
        },

        getExercisesMyIom(state) {
           return state.exercisesFromMyIom
        },

        getTagsMyIom(state) {
           return state.tagsFromMyIom
        },
    }
}