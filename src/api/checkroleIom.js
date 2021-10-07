import store from '../store'
export function before () {
const func = async (to, from, next) => {
        try{
            await store.dispatch('auth/confirmRole')
            if(store.state['auth'].role && store.state['auth'].status == 'on' && store.state['auth'].role !== "student" ) {
                const role = await store.state['auth'].role
                const LayoutName = {
                    tutor: "TutorContext",
                    admin: "AdminContext"
                }
                to.meta.layout = LayoutName[role]
                next()
            } else if(store.state['auth'].role && store.state['auth'].status == 'on' && store.state['auth'].role === "student") {
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

