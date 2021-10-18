import store from '../store'
export function beforeAdmin () {
    const func = async (to, from, next) => {
        try{
            await store.dispatch('auth/confirmRole')
            if(store.state['auth'].role && store.state['auth'].status == 'on' && store.state['auth'].role == "admin" ) {
                const role = await store.state['auth'].role
                const LayoutName = {
                    admin: "AdminContext"
                }
                to.meta.layout = LayoutName[role]
                next()
            } else if(store.state['auth'].role && store.state['auth'].status == 'on' && store.state['auth'].role != "admin") {
                console.log('404')
                next('/404')
            } else {
                next('/auth?message=auth')
            }
        } catch(e){
            console.log('Ошибка подтверждения')
        }
    }
    return func
}