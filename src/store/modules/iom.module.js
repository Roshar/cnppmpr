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
        }
    },

    actions:{
        async getData ({commit, dispatch, state}, token) {
            try {
                const {data} = await axios.post('/api/iom/getData',{token} )
                commit('setIomData',data)
                console.log(state.iomData)
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
                console.log("not module user")
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
                console.log("not module user")
            }
        },
        async getIomId ({commit, dispatch, state}, payload) {
            try {
                const {data} = await axios.post('/api/iom/issetIomId',{
                    token: localStorage.getItem('jwt-token'),
                    payload
                })
                console.log(data)
                return data
                // router.push('/param')
            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
                console.log("not module user")
            }
        },
    },

    getters: {

    }
}