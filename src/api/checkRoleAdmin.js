import store from '../store'
export function beforeAdmin () {
    return async (to, from, next) => {
        try{
            await store.dispatch('auth/confirmRole')
            const authResult = store.state['auth']
            if(authResult.role && authResult.status === 'on' && authResult.role == "admin" ) {
                store.commit('setLayout',authResult.role)
                next()
            } else if(authResult.role && authResult.status === 'on' && authResult.role != "admin") {
                console.log('404')
                next('/404')
            } else {
                next('/auth?message=auth')
            }
        } catch(e){
            console.log('Ошибка подтверждения')
        }
    }
}