import axios from '../../axios/request'
import app from '../../main'

export default {
    namespaced: true,

    state: {
        dialogs: JSON.parse(localStorage.getItem('dialogs')) ?? [],
        messages: JSON.parse(localStorage.getItem('messages')) ?? [],
        students: [],
    },

    getters: {
        getDialogs(state){
            return state.dialogs
        },

        getDialogByTutorId(state){
            return id => state.dialogs.find(dialog => dialog.tutor_id == id)
        },

        getDialogByStudentId(state){
            return id => state.dialogs.find(dialog => dialog.student_id == id)
        },

        getMessagesByDialogId(state){
            return id => state.messages.filter((message) => message.dialog_id == id)
        },

        getContactsOfStudents(state){
            return state.students
        },

        getStudentById(_, getters){
            return id => getters['getContactsOfStudents'].find(student => student.user_id == id)
        }
    },

    mutations: {
        sentMessage(rootState, state, payload){
            const messages = state.messages.length 
                            ? JSON.stringify([...state.messages, payload]) 
                            : JSON.stringify([payload]);
            localStorage.setItem('messages', messages);
            state.messages = JSON.parse(localStorage.getItem('messages'))
            app.$socket.emit('add_message', {msg: payload, userId: rootState.userId})
        },

        addMessage(state, payload){
            state.messages.push(payload);
        },

        createDialog(state, payload){
            const dialogs = state.dialogs.length 
                            ? JSON.stringify([...state.dialogs, payload]) 
                            : JSON.stringify([payload]);
            localStorage.setItem('dialogs', dialogs);
            state.dialogs = JSON.parse(localStorage.getItem('dialogs'))
            app.$socket.emit('create_dialog', {dialog: payload})
        },

        setContactsOfStudents(state, payload){
            state.students = payload.students
        }
    },

    actions: {
        async setContactsOfStudents({commit, dispatch}) {
            try {
                const {data} = await axios.post('/api/messenger/getStudents', {tutor_id: localStorage['userId']})
                console.log(data)
                commit('setContactsOfStudents', {students: data.values})

            } catch(e){
                dispatch('setSystemMessage', {
                    value: e.response.data.values.message,
                    type: 'danger'
                }, {root: true})
                throw new Error()
                console.log("not module messenger")
            }
        },

        //listening socket events from server

        SOCKET_CONNECT(){
            console.log('socket: connected with server')
        },

        SOCKET_ADD_MESSAGE(store, msg) {
            store.emit('addMessage', msg);
        }
    },

}