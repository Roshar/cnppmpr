<template>
    <component :is="layout" v-if="layout"></component>
</template>
<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import Main from './layout/Main.vue'
import Auth from './layout/Auth.vue'
import Student from "./layout/Student";
import Tutor from "./layout/Tutor";

export default {
    setup(){
        const route = useRoute()
       return {
           layout: computed(()=> route.meta.layout)
       }
    },
    components: {Main,Auth,Student,Tutor}
    // components: {Main,Auth}
}
</script>
<style>

body{
    background-color: #edeef0;
}
    
</style>