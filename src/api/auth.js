export default function (instance) {
    return {
        signIn(payload) {
            return instance.post('api/auth/signin',payload)
        },
        signUp(payload) {
            return instance.post('api/auth/signup',payload)
        },
        logout() {
            return instance.delete('api/auth/logout')
        }
    }
}