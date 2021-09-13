<template>
    <component :is="layout" v-if="layout"></component>
</template>
<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import Main from './layout/Main.vue'
import Auth from './layout/Auth.vue'
import MainStudent from "./layout/MainStudent";
import MainTutor from "./layout/MainTutor";

export default {
    setup(){
        const route = useRoute()
       return {
           layout: computed(()=> route.meta.layout)
       }
    },
    components: {Main,Auth,MainStudent,MainTutor}
}
</script>
<style>

body{
    background-color: #edeef0;
}
    
</style>