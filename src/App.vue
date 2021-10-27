<template>
    <component :is="layout" v-if="layout"> <router-view/></component>
</template>
<script>
    import {computed} from 'vue'
    import {useStore} from 'vuex'
    import {useRoute} from 'vue-router'
    import Main from './layout/Main.vue'
    import Auth from './layout/Auth.vue'
    import Student from "./layout/Student";
    import Admin from "./layout/Admin";
    import Tutor from "./layout/Tutor";
    import NotFound from "./layout/NotFound";
    import TutorContext from "./layout/TutorContext";
    import AdminContext from "./layout/AdminContext";
    export default {
        setup(){
            const route = useRoute()
            const {state} = useStore()
            const layout = computed(()=> state.layout)
            // const layout = computed(()=> route.meta.layout)
            return {
                layout
            }
        },
        components: {Main,Auth,Student,Tutor,NotFound,TutorContext,AdminContext,Admin}
    }
</script>
<style>

    body{
        background-color: #edeef0;
    }

</style>