import axios from '../../axios/request'

export default {
    namespaced: true,

    state: {
        dialogs: JSON.parse(localStorage.getItem('dialogs')) ?? [],
        messages: JSON.parse(localStorage.getItem('messages')) ?? [],
        contacts: []
    },

    getters: {
        getDialogs(state){
            return state.dialogs
        },

        getDialogByTutorId(state){
            return id => state.dialogs.find(dialog => dialog.tutor_id == id)
        },

        getMessagesByDialogId(state){
            return id => state.messages.filter((message) => message.dialog_id == id)
        },

        getContacts(state){
            console.log(state.users)
        }
    },

    mutations: {
        addMessage(state, payload){
            const messages = state.messages.length 
                            ? JSON.stringify([...state.messages, payload]) 
                            : JSON.stringify([payload]);
            localStorage.setItem('messages', messages);
            state.messages = JSON.parse(localStorage.getItem('messages'))
        },

        createDialog(state, payload){
            const dialogs = state.dialogs.length 
                            ? JSON.stringify([...state.dialogs, payload]) 
                            : JSON.stringify([payload]);
            localStorage.setItem('dialogs', dialogs);
            state.dialogs = JSON.parse(localStorage.getItem('dialogs'))
        },

        setContacts(state, payload){
            console.log(state.users)
            /* state.users.push(payload) */
        }
    },

    actions: {
        /* async setContacts({commit, dispatch}) {
            try {
                const {data} = await axios.post('/api/user/getAllUsers')
                console.log(data)
                commit('setUsers', data.values[0])

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
                console.log("not module messenger")
            }
        } */
    },

}