<template>
    <component v-if="layout" :is="layout" > </component>
</template>
<script>
    import {computed, ref} from 'vue'
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