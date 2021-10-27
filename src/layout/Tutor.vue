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
            <div class="col-3">
                <tutor-navbar-left-main/>
            </div>
            <router-view/>
        </div>
    </div>
</template>

<script>
    import TutorNavbarLeftMain from '../components/TutorNavbarLeftMain.vue'
    import TutorNavbarTop from '../components/TutorNavbarTop.vue'
    import AppMessage from '../components/ui/AppMessage'
    export default {
        components: {TutorNavbarLeftMain,TutorNavbarTop,AppMessage}
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