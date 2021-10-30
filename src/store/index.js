import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import user from './modules/user.module'
import iom from './modules/iom.module'
import tutor from './modules/tutor.module'
import library from './modules/library.module'
import globalLibrary from './modules/globalLibrary.module'
import tag from './modules/tag.module'
import admin from './modules/admin.module'
import notification from './modules/notification.module'
import area from './modules/area.module'
import discipline from './modules/discipline.module'
import conversation from './modules/conversation.module'


const plugins = []

if(process.env.NODE_ENV === 'development'){
    plugins.push(createLogger())
}

export default createStore({
  plugins,
  state(){
      return {
        layout: null,
        systemMessage: null
      }
  },
  mutations: {
    //добавить сообщение об ошибке
    setSystemMessage(state, message) {
      state.systemMessage = message
    },
    //Очистить сообщение об ошибке
    clearSystemMessage(state) {
      state.systemMessage = null
    },

    setLayout(state, payload) {
      state.layout = payload
    }

  },
  actions: {

    // Сообщения системы

    setSystemMessage({commit}, message) {
      commit('setSystemMessage', message)
      setTimeout(() => {
        commit('clearSystemMessage')
      }, 8000)
    }
  },
  modules: {
    auth,
    user,
    iom,
    tutor,
    library,
    tag,
    admin,
    notification,
    area,
    discipline,
    conversation,
    globalLibrary
  }
})
