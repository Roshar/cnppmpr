export default function (instance) {
    return {
        getStudents(payload) {
            return instance.post('api/messenger/students',payload)
        }
    }
}