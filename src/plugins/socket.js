import store from '../store'
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'

const io = new VueSocketIO({
    withCredentials: true,
    debug: true,
    connection: SocketIO('http://localhost:3500'),
    vuex: {
        store: store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
})

export default io