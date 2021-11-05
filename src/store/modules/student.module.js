import axios from '../../axios/request'
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
    },

    mutations: {
        setMessage(state, message) {
            state.message = message
            localStorage.setItem(MESSAGE,message)
        },
        setStatistics(state, statistics) {
            state.statistics = statistics
        },
        setStudents(state, value) {
            state.students = value
        },
        setStudentsFromIom(state, value) {
            state.membersIom = value
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
                const {data} = await axios.post('/api/student/getUsersFromIomEducation',
                    {token: localStorage.getItem('jwt-token'),
                        filter: payload.filter,
                        iomId: payload.iomId})
                if(data.values) {
                    commit('setStudentsFromIom',data.values)
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

        async deleteStudentFromIomEducation ({commit, dispatch, state}, payload) {
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




    },

    getters: {
        getStudentsForTutor(state) {
           return state.students
        },
        getUsersFromIomEducation(state) {
           return state.membersIom
        },
        getFreeStudents(state) {
           return state.freestudents
        },
    }
}