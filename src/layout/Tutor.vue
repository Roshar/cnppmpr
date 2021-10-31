<template>
    <div class="container-fluid own-bg">
        <div class="own-size">
            <div class="row">
                <tutor-navbar-top/>
            </div>
        </div>
    </div>
    <div class="container-fluid">
        <app-message />
        <div class="row">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import TutorNavbarTop from '../components/TutorNavbarTop.vue'
    import AppMessage from '../components/ui/AppMessage'
    import TutorMainMenu from "../components/tutorMenu/TutorMainMenu";
    export default {
        components: {TutorNavbarTop, AppMessage,TutorMainMenu }
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