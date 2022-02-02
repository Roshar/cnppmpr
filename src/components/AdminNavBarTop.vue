<template>
    <div class="col-3">
        <h2> <router-link to="/">
            <img src="/itlogo.svg" alt="лого" > </router-link>
        </h2>
    </div>
    <div class="col-9">
        <nav class="navbar justify-content-end" >
            <ul class="list-group list-group-horizontal list-top-menu-ul">
                <li class="list-group-item list-group-item-action list-top-menu-li">
                    <span v-if="requestFromUsers !== 0" class="badge badge-pill badge-danger" style="float:right;margin-bottom:-4px;">{{requestFromUsers}}</span>
                    <a href="#"  data-toggle="dropdown">Заявки </a>
                    <ul class="dropdown-menu" v-if="requestFromUsers !== 0">
                        <li v-if="requestStudents !== 0">
                            <span  class="badge badge-pill badge-danger" style="float:right;margin-bottom:-4px;">{{requestStudents}}</span>
                            <router-link :to="{path:`/last_student`}" style="font-size: .9em">Студенты</router-link>
                        </li>
                        <li v-if="requestTutors !== 0">
                            <span  class="badge badge-pill badge-danger" style="float:right;margin-bottom:-4px;">{{requestTutors}}</span>
                            <router-link :to="{path:`/last_tutor`}" style="font-size: .9em">Тьюторы</router-link>
                        </li>
                    </ul>
                </li>
                <li class="list-group-item list-group-item-action list-top-menu-li">
                    <a href="#"  data-toggle="dropdown">Категории </a>
                    <ul class="dropdown-menu">
                        <li>
                            <router-link :to="{path:`/students`}" style="font-size: .9em">Слушатели</router-link>
                            <router-link to="/tutors" style="font-size: .9em">Тьюторы</router-link>
                            <router-link to="/global_library" style="font-size: .9em">Библиотека мероприятий</router-link>
                            <router-link to="/iom" style="font-size: .9em">ИОМ</router-link>
                            <router-link to="/" style="font-size: .9em">Отчеты</router-link>
                        </li>
                    </ul>
                </li>
                <li class="list-group-item list-group-item-action list-top-menu-li">
                    <span v-if="notificationMessage" class="badge badge-pill badge-danger" style="float:right;margin-bottom:-4px;">{{notificationMessage.length}}</span>
                    <router-link to="/admin_conversations">Сообщения </router-link>
                </li>
                <li  class="list-group-item list-group-item-action list-top-menu-li">
                    <span v-if="notificationAction.length" class="badge badge-pill badge-primary" style="float:right;margin-bottom:-4px;">{{notificationAction.length}}</span>
                    <a href="#"  data-toggle="dropdown">Уведомления </a>
                    <ul  class="dropdown-menu">
                        <li v-if="notificationAction.length">
                            <span v-if="notificationAction.length " class="badge badge-pill badge-primary" style="float:right;margin-bottom:-4px;">{{notificationAction.length }}</span>
                            <router-link :to="{path:`/admin_notifications`}" style="font-size: .9em">Запрос на удаление ИОМа</router-link>
                        </li>
                    </ul>
                </li>

                <li class="list-group-item list-group-item-action list-top-menu-li">
                    <div style="display: flex; align-items: center; " class="acc justify-content-end" data-toggle="dropdown">
                        <span style="margin-right: .5em"><strong>{{name}}</strong></span>
                        <div><img :src="avatar" alt="Админ" class="rounded-circle" width="36" height="36"  ></div>
                        <span style="display:inline-block; margin-left: .5em">
                             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor"  class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                            </svg>
                        </span>
                    </div>
                    <ul class="dropdown-menu my_account">
                        <router-link to="/" style="font-size: .9em">Мой профиль</router-link>
                        <li>
                            <form @submit.prevent="onSubmit">
                                <button type="submit" class=" btn-block my_account_btn"> Выход </button>
                            </form>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>

</template>

<script>
    import {useForm} from "vee-validate";

    const {handleSubmit} = useForm()
    import {ref, onMounted} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import store from "../store";

    export default {
        setup(){
            const store = useStore()
            const router = useRouter()
            const notificationMessage = ref(false)
            const notificationAction = ref(false)
            const requestFromUsers = ref(0)
            const requestStudents = ref(0)
            const group_id = ref()
            const baseUrl = ref(process.env.VUE_APP_URL)
            const requestTutors = ref(0)
            const myAccount = ref(null)
            const avatar = ref(null)
            const name = ref(null)

            onMounted(async() => {
                myAccount.value = await store.dispatch('user/getAdminData',localStorage.getItem('jwt-token'))
                avatar.value = baseUrl.value +'/'+myAccount.value[0].avatar
                name.value = myAccount.value[0].name
                notificationAction.value = await store.dispatch('notification/getNotificationAction')
                requestStudents.value = await store.dispatch('notification/getRequestStudents')
                requestTutors.value = await store.dispatch('notification/getRequestTutors')
                requestStudents.value = requestStudents.value ? requestStudents.value[0].id : 0
                requestTutors.value = requestTutors.value ? requestTutors.value[0].id : 0
                requestFromUsers.value = requestStudents.value + requestTutors.value
            })

            const onSubmit = handleSubmit(async values => {
                try{
                    await store.dispatch('auth/logout')
                    store.commit('clearLayout')
                    window.location.href = `/auth`;
                }catch (e) {

                }
            })
            return {
                onSubmit,
                notificationMessage,
                notificationAction,
                requestFromUsers,
                requestStudents,
                requestTutors,
                group_id,
                avatar,
                name
            }
        }
    }
</script>

<style scoped>



    .navbar a{
        min-height: 56px;
        align-items: center;
    }

    .acc {
        display: flex;
        color: #5d5d5d;
        padding: 10px 25px;
        min-width:230px
    }

    .acc:hover {
        cursor: pointer;
    }
    .list-group-item{
        padding: 0;
    }

    a:hover {
        cursor: pointer;
    }

    .my_account a:hover, .my_account_btn:hover {
        background-color: #f1f1f1;


    }
    ul.my_account {
        border: 1px solid #dcdcdc;


    }

    .my_account_btn {
        border: none;
        display: flex;
        color: #5d5d5d;
        padding: 10px 25px;
        background-color: transparent;
        font-size: .9em;
    }


    .list-top-menu-li{
        list-style-type: none;
        border:none;
    }
    .list-top-menu-li:hover {
        background-color: white;
    }

    .dropdown-menu {
        border: none;
    }

    .list-top-menu-li a{
        display: flex;
        color:#5d5d5d;
        padding:10px 25px;
    }

    .list-top-menu-li a:hover{
        color:#3c4142;
        padding:10px 25px;
        text-decoration: none;
    }

</style>