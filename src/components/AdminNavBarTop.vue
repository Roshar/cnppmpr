<template>
    <div class="col-3">
        <h2> <router-link to="/">IT-GOVZALLA</router-link></h2>
    </div>
    <div class="col-9">
        <nav class="navbar justify-content-end">
            <ul class="list-group list-group-horizontal list-top-menu-ul">
                <li class="list-group-item list-group-item-action list-top-menu-li">
                    <span v-if="requestFromUsers !== 0" class="badge badge-pill badge-danger" style="float:right;margin-bottom:-4px;">{{requestFromUsers}}</span>
                    <a href="#"  data-toggle="dropdown">Заявки </a>
                    <ul class="dropdown-menu" v-if="requestFromUsers !== 0">
                        <li v-if="requestStudents !== 0">
                            <span  class="badge badge-pill badge-danger" style="float:right;margin-bottom:-4px;">{{requestStudents}}</span>
                            <router-link :to="{path:`/last_student`}" style="font-size: .8em">Студенты</router-link>
                        </li>
                        <li v-if="requestTutors !== 0">
                            <span  class="badge badge-pill badge-danger" style="float:right;margin-bottom:-4px;">{{requestTutors}}</span>
                            <router-link :to="{path:`/last_tutor`}" style="font-size: .8em">Тьюторы</router-link>
                        </li>
                    </ul>
                </li>
                <li class="list-group-item list-group-item-action list-top-menu-li">
                    <a href="#"  data-toggle="dropdown">Категории </a>
                    <ul class="dropdown-menu">
                        <li>
                            <router-link :to="{path:`/students`}" style="font-size: .8em">Студенты</router-link>
                            <router-link to="/tutors" style="font-size: .8em">Тьюторы</router-link>
                            <router-link to="/global_library" style="font-size: .8em">Библиотека мероприятий</router-link>
                            <router-link to="/" style="font-size: .8em">ИОМ</router-link>
                            <router-link to="/" style="font-size: .8em">Отчеты</router-link>
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
                    <ul v-if="notificationAction.length" class="dropdown-menu">
                        <li>
                            <router-link :to="{path:`/admin_notifications`}" style="font-size: .8em">Запрос на удаление ИОМа</router-link>
                        </li>
                    </ul>
                </li>
                <li class="list-group-item list-group-item-action list-top-menu-li">
                    <form @submit.prevent="onSubmit">
                        <button type="submit" class="btn auth-btn" > Выход </button>
                    </form>

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

    export default {
        setup(){
            const store = useStore()
            const router = useRouter()
            const notificationMessage = ref(false)
            const notificationAction = ref(false)
            const requestFromUsers = ref(0)
            const requestStudents = ref(0)
            const requestTutors = ref(0)

            onMounted(async() => {
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
                    await  router.push('/auth')
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
            }
        }
    }
</script>

<style scoped>

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