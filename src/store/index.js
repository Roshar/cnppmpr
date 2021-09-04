import { createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'

const plugins = []

if(process.env.NODE_ENV === 'development'){
    plugins.push(createLogger())
}

export default createStore({
  plugins,
  state(){
      return {
        errorMessage: null
      }
  },
  mutations: {
    //добавить сообщение об ошибке
    setErrorMessage(state, message) {
      state.errorMessage = message
    },
    //Очистить сообщение об ошибке
    clearErrorMessage(state) {
      state.errorMessage = null
    }

  },
  actions: {
    // Добавить и удалить сообщение об ошибке
    setErrorMessage({commit}, message) {
      commit('setErrorMessage', message)
      setTimeout(() => {
        commit('clearErrorMessage')
      }, 5000)
    }
  },
  modules: {
    auth,
  }
})
