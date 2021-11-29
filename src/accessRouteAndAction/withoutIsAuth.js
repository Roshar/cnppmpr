import store from '../store'
export function withoutIsAuth (layout) {
    return  (to, from, next) => {
        try{

            store.commit('setLayout',layout)
            next()
        } catch(e){
            console.log('Ошибка подтверждения')
        }
    }
}

