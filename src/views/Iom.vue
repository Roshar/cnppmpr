<template>
    <component :is="role" v-if="role"></component>
</template>

<script>
    import {computed} from 'vue'
    import {useRoute} from 'vue-router'
    import { useRouter } from 'vue-router';
    import {useStore} from 'vuex'
    import admin from '../views/admin/index'
    import tutor from './tutor/iom/index'
    import tutorCreate from './tutor/iom/create'

    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const postfix = route.meta.postfix || ''
            // const role = computed(() => store.state['auth'].role + postfix)
            const role = computed(() => postfix)
            console.log(role.value)
            return {
                role,
                router,
                route
            }
        },
        components: {admin, tutor, tutorCreate}
    }
</script>

<style lang="scss" scoped>

</style>