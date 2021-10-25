<template>
    <div class="container-fluid own-bg">
        <div class="own-size">
            <div class="row">
                <admin-navbar-top/>
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
    import AdminNavbarTop from '../components/AdminNavBarTop'
    import AdminStudentMenu from "../components/adminMenu/AdminStudentMenu";
    import AppMessage from '../components/ui/AppMessage'
    export default {
        components: {AdminNavbarTop,AppMessage,AdminStudentMenu}
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