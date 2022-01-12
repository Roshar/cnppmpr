<template>
    <div class="student-menu">
        <nav class="colorlib-main-menu" role="navigation">
            <ul class="navbar-menu">
                <li><router-link to="/"  class="router-link" >Мой профиль</router-link></li>
                <li><router-link to="/students"  class="router-link" >Слушатели</router-link></li>
                <li><router-link to="/tutors"  class="router-link" >Тьюторы</router-link></li>
                <li><router-link to="/mentor"  class="router-link" >Наставники</router-link></li>
                <li><router-link to="/statistic"  class="router-link" >Статистика</router-link></li>
                <li><router-link to="/group"  class="router-link" >Учебные группы</router-link></li>
                <li><router-link to="/iom"  class="router-link" >Идивидуальные образовательные маршруты</router-link></li>
                <li><router-link to="/global_library"  class="router-link" >Библиотека мероприятий</router-link></li>
                <li><router-link to="/last_student"  class="router-link" > Последние зарегистрировавшиеся студенты </router-link></li>
                <li><router-link to="/last_tutor"  class="router-link" > Последние зарегистрировавшиеся тьюторы </router-link></li>
                <li><router-link to="/ban"  class="router-link" > Заблокированные пользователи </router-link></li>
                <li><router-link to="/search"  class="router-link" >Поисковик</router-link></li>
            </ul>
        </nav>
    </div>
</template>


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