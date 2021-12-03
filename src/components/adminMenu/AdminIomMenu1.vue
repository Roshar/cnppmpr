<template>
    <div class="student-menu">
        <nav class="colorlib-main-menu" role="navigation">
            <ul class="navbar-menu">
                <li><router-link to="/"  class="router-link" >Мой профиль</router-link></li>
                <li><router-link to="/iom"  class="router-link" >ИОМы</router-link></li>
                <li v-if="iomData"> <router-link :to="{path: `/iom/${iomData.iom}/${iomData.tutorId}`}"  class="router-link" >
                    <span v-if="iomData.task">
                        Вернуться к списку
                    </span>
                    <span v-if="iomData.single">
                        Автор: {{iomData.author}}
                    </span>
                </router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        props:['iomData'],
        setup() {

        }
    }
</script>

<style  scoped>
    .colorlib-main-menu {
        background-color: white;
        width: 100%;
    }
    .colorlib-main-menu ul {
        list-style-type: none;
        width: 100%;
        padding: 0;
    }

    .colorlib-main-menu ul li .router-link {
        display: block;
        padding: 20px;
        text-align: center;
        color: #4571a3;

    }
    .colorlib-main-menu ul li .router-link:hover {
        text-decoration: none;
        background-color:rgba(192,192,192,0.1);
        border-right: rgba(192,192,192,0.3) solid 5px;
    }

    .colorlib-main-menu ul li .active {
        text-decoration: none;
        background-color:rgba(192,192,192,0.1);
        border-right: rgba(192,192,192,0.3) solid 5px;
        color: #4571a3;
        font-weight: 500;
    }
    .center-content {
        width: 50%;
        margin: 0 auto;
    }
    .inside-block-indent {
        margin:10px 0 10px 0;
    }
    .btn-primary-outline {
        background-color: transparent;
        border:1px solid rgba(69, 113, 163, 0.4) ;
        padding:8px 25px;
        color: #4571a3;
        box-sizing: border-box;
        width:100%;

    }
    .btn-primary-outline:hover {
        border-color:#4571a3;
        text-decoration: none;

    }
    .btn-danger-outline {
        background-color: transparent;
        border:1px solid rgba(255, 99, 71, 0.4);
        padding:8px 25px;
        color: tomato;
        box-sizing: border-box;
        width:100%;
    }

    .btn-danger-outline:hover {
        border-color:tomato
    }
</style>