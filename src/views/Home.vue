<template>
    <component :is="role" v-if="role"></component>
</template>

<script>
    import {computed} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'
    import student from '../views/student/index'
    import tutor from '../views/tutor/index'
    import admin from '../views/admin/index'

    export default {
        setup() {
            const store = useStore()
            const router = useRoute()
            const role = computed(() => store.state['auth'].role)
            const tpl = computed(() => `/`)
            return {
                role
            }
        },
        components: {student, tutor, admin}
    }
</script>

<style lang="scss" scoped>

</style>