import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'
import user from './modules/user.module'
import messenger from './modules/messenger.module'


const plugins = []

if(process.env.NODE_ENV === 'development'){
    plugins.push(createLogger())
}

export default createStore({
  plugins,
  state(){
      return {
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
    messenger
  }
})
