import store from '../store'
export function checkAccess () {
    return  async (to, from, next) => {
        try{
            await store.dispatch('auth/confirmRole')
            const roleAuth = store.state['auth'].role
            if((roleAuth === 'student' || roleAuth === 'tutor')  && store.state['auth'].status === 'on') {
                console.log(roleAuth)
                store.commit('setLayout',roleAuth)
                await store.dispatch('user/getUserData',localStorage.getItem('jwt-token'))
                next()
            } else if (roleAuth === 'admin'  && store.state['auth'].status == 'null') {
                await store.dispatch('user/getAdminData',localStorage.getItem('jwt-token'))
                next('/adminconfirm?token='+store.state['auth'].token)
            }else if (roleAuth === 'admin'  && store.state['auth'].status === 'on') {
                store.commit('setLayout',roleAuth)
                await store.dispatch('user/getAdminData',localStorage.getItem('jwt-token'))
                next()
            } else if (store.state['auth'].role && (store.state['auth'].status == 'null' || store.state['auth'].status == 'ban' )) {
                // next('/active?token='+store.state['auth'].token)
                // next('/adminconfirm')
                next('/adminconfirm?token='+store.state['auth'].token)

            } else {
                console.log('нет подтверждения роли')
                next('/auth?message=auth')
            }
        } catch(e){
            console.log('Ошибка подтверждения')
        }
    }
}

