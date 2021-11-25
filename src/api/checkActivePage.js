import store from '../store'
export function checkAccess () {
    return  async (to, from, next) => {
        try{

            if(localStorage.getItem('jwt-token')) {
                await store.dispatch('auth/confirmRole')
                const roleAuth = store.state['auth'].role
                console.log(store.state['auth'].status)
                if((roleAuth === 'student' || roleAuth === 'tutor')  && store.state['auth'].status === 'on') {
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
                } else if (store.state['auth'].role && (store.getters['auth/status'] === null || store.getters['auth/status'] === 'ban' )) {
                    console.log('Я ТУТ')
                    if(store.state['auth'].role === 'student') {
                        console.log('im student')
                        next('/studentconfirm?token=' + store.state['auth'].token)
                    }else if(store.state['auth'].role === 'tutor') {
                        console.log('im tutor')
                        next('/tutorconfirm?token=' + store.state['auth'].token)
                    }else {
                        next('/adminconfirm?token=' + store.state['auth'].token)
                    }

                } else {
                    console.log('нет подтверждения роли')
                    next('/auth')
                }
            }else {
                store.commit('clearLayout')
                next('/auth')

            }


        } catch(e){
            console.log('Ошибка подтверждения')
        }
    }
}

