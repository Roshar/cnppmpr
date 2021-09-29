<template>
    <component :is="role" v-if="role"></component>
</template>

<script>
    import {computed} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'
    import admin from '../views/admin/iom'
    import tutor from '../views/tutor/iom'

    export default {
        setup() {
            const store = useStore()
            const router = useRoute()
            const role = computed(() => store.state['auth'].role)
            const tpl = computed(() => `/`)
            console.log('Роль '+ role.value)
            return {
                role
            }
        },
        components: {admin, tutor}
    }
</script>

<style lang="scss" scoped>

</style>