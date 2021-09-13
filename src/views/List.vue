<template>
    <component :is="role" v-if="role"></component>
</template>

<script>
    import {computed} from 'vue'
    import {useStore} from 'vuex'
    import student from '../views/student/list'
    import tutor from '../views/tutor/list'

    export default {
        setup() {
            const store = useStore()

            const role = computed(() => store.state['auth'].role)

            console.log('Роль'+ role.value)
            return {
                role
            }
        },
        components: {student, tutor}
    }
</script>

<style lang="scss" scoped>

</style>