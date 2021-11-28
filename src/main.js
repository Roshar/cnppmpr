
require('./main.css')
import { createApp } from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue';
import App from './App.vue'
import router from './router'
import store from './store'
import SocketIo from './Socket'


// createApp(App).use(CKEditor).use(SocketIo, {
//     debug:true,
//     connection: 'http://localhost:8088/',
//     //connection: 'http://localhost:8088/socket.io/socket.io.js',
// }).use(store).use(router).mount('#app')

createApp(App).use(CKEditor).use(store).use(router).mount('#app')
