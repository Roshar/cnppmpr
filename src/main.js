import Cloudinary from "cloudinary-vue";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


createApp(App).use(Cloudinary, {
    configuration: {
        cloudName: "govzalla-ru"
    }
}).use(store).use(router).mount('#app')
