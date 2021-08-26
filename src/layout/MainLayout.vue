<template>
    <div class="container-fluid own-bg">
         <div class="own-size">
            <div class="row">
                <student-navbar-top/>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <student-navbar-left/>
            </div>
                 <router-view/>
        </div>
    </div>
</template>

<script>
import StudentNavbarLeft from '../components/StudentNavbarLeft.vue'
import StudentNavbarTop from '../components/StudentNavbarTop.vue'
    export default {
        components: {StudentNavbarLeft,StudentNavbarTop}
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