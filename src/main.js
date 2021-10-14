import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import ApiPlugin from './plugins/api'
import io from './plugins/socket'

const app = createApp(App)
    .use(store)
    .use(router)
    .use(io)
    .mount('#app')


export default app 