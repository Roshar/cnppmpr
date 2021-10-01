import instance from './instance'
import authModule from './auth'
import messengerModule from './messenger'

export default {
    auth: authModule(instance),
    messenger: messengerModule(instance)
}