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
        tblNames: []
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

        async getExerciseByIomId ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/iom/getExercise',{token: localStorage.getItem('jwt-token'),payload})
                // console.log('getExerciseByIomId')
                // console.log(data.values)
                commit('setExerciseData',data.values)
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
    },

    getters: {

    }
}