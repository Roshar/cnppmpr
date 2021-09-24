import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import ApiPlugin from './plugins/api'

createApp(App).use(store).use(router).mount('#app')
