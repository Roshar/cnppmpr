import axios from '../../axios/request'
const USERID = 'userId'
const MESSAGE = 'message'


export default {
    namespaced: true,

    state: {
        userId: localStorage.getItem(USERID),
        iomData: null
    },

    mutations: {
        setMessage(state, message) {
            state.message = message
            localStorage.setItem(MESSAGE,message)
        },
        setIomData(state, iomData) {
            state.iomData = iomData
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
        }
    },

    getters: {

    }
}