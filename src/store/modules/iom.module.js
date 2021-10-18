import axios from '../../axios/request'
import router from "../../router";
const USERID = 'userId'
const MESSAGE = 'message'


export default {
    namespaced: true,

    state: {
        userId: localStorage.getItem(USERID),
        iomData: null,
        exercise: null,
        iomId: null,
        exerciseData: [],
        tblNames: [],
        taskData: []
    },

    mutations: {
        setMessage(state, message) {
            state.message = message
            localStorage.setItem(MESSAGE,message)
        },
        setIomData(state, iomData) {
            state.iomData = iomData
        },
        setExercise(state, exercise) {
            state.exercise = exercise
        },
        setIssetStatusIom(state, iomId) {
            state.iomId = iomId
        },
        setExerciseData(state, exercise) {
            state.exerciseData = exercise
        },
        clearExerciseData(state) {
            state.exerciseData = []
        },
        setTblNames(state,tblNames) {
            state.tblNames.push(tblNames)
        }
    },

    actions:{

        async getData ({commit, dispatch, state}, token) {
            try {
                const {data} = await axios.post('/api/iom/getData',{token} )
                if(data.values) {
                    commit('setIomData',data.values)
                }
                console.log(state.iomData)
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getMentor ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/iom/getMentor',payload )
                return data.values ? data.values : []
            } catch(e){
                console.log(e)
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },


        // Создание ИОМа
        async addNewIom ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/iom/addNewIom',{
                    token: localStorage.getItem('jwt-token'),
                    payload
                } )
                let iomId = data.values.iomId
               await router.push({path: `/iom/${iomId}/exercise`})
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },
        async getIomId ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/iom/issetIomId',{
                    token: localStorage.getItem('jwt-token'),
                    payload
                })
                commit('setTblNames',data.values[0])
                return (data.values[1].length) ? true :  router.push('/404')
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
                commit('clearExerciseData')
                const {data} = await axios.post('/api/iom/getExercises',{token: localStorage.getItem('jwt-token'),payload})
                if(data.values.length){
                    commit('setExerciseData',data.values)
                }
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async getTaskById ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/iom/getTask',{token: localStorage.getItem('jwt-token'),payload})
                return data.values
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },

        async addExercise({ commit, dispatch}, payload) {
            try{
                const {data} = await axios.post('/api/iom/addExercise',payload)
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
        async addExerciseFromLib({ commit, dispatch}, payload) {
            try{
                const {data} = await axios.post('/api/iom/addExerciseFromLib',payload)
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

        async updateExercise({ commit, dispatch}, payload) {
            try{
                const {data} = await axios.post('/api/iom/updateExercise',payload)
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

        async deleteTask({commit, dispatch}, payload) {
            try{
                const {data} = await axios.post('/api/iom/deleteTask',payload)
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
        async deleteIom({commit, dispatch}, payload) {
            try{
                const {data} = await axios.post('/api/iom/deleteIom',payload)
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
        }
    },

    getters: {
        getExercisesByIomId(state) {
            return state.exerciseData
        }

    }
}