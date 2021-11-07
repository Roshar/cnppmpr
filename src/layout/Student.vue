<template>
    <div class="container-fluid own-bg">
        <div class="own-size">
            <div class="row">
               <student-navbar-top></student-navbar-top>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <app-message />
        <div class="row justify-content-center">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import StudentMainMenu from "../components/studentMenu/StudentMainMenu";
    import StudentNavbarTop from '../components/StudentNavbarTop.vue'
    import AppMessage from '../components/ui/AppMessage'
    export default {
        components: {StudentMainMenu,StudentNavbarTop, AppMessage}
    }
</script>

<style>

    .own-size {
        max-width:1140px;
        margin:0 auto;
        padding:10px 20px;
    }
    .own-bg{
        background-color: white;
    }

</style>