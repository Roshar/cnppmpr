<template>
    <div class="container-fluid own-bg">
        <div class="own-size">
            <div class="row">
                <tutor-navbar-top/>
            </div>
        </div>
    </div>
    <div class="container">
        <app-message />
        <div class="row">
            <div class="col-3">
                <tutor-navbar-left/>
            </div>
            <router-view/>
        </div>
    </div>
</template>

<script>
    import TutorNavbarLeft from "../components/TutorNavbarLeft";
    import TutorNavbarTop from '../components/TutorNavbarTop'
    import AppMessage from '../components/ui/AppMessage'
    export default {
        components: {TutorNavbarLeft,TutorNavbarTop, AppMessage}
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