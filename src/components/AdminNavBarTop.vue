<template>
    <div class="col-2">
        <h2> <router-link to="/">ЦНППМ</router-link></h2>
    </div>
    <div class="col-10">
        <nav class="navbar justify-content-end">
            <ul class="list-group list-group-horizontal list-top-menu-ul">
                <li class="list-group-item list-group-item-action list-top-menu-li">
                    <a href="#"  data-toggle="dropdown">Категории </a>
                    <ul class="dropdown-menu">
                        <li>
                            <router-link :to="{path:`/students`}" style="font-size: .8em">Студенты</router-link>
                            <router-link :to="{path:`/tutors`}" style="font-size: .8em">Тьюторы</router-link>
                            <router-link :to="{path:`/iom`}" style="font-size: .8em">ИОМ</router-link>
                            <router-link :to="{path:`/report`}" style="font-size: .8em">Отчеты</router-link>
                        </li>
                    </ul>
                </li>
                <li class="list-group-item list-group-item-action list-top-menu-li">
                    <span v-if="notificationMessage" class="badge badge-pill badge-danger" style="float:right;margin-bottom:-4px;">{{notificationMessage.length}}</span>
                    <router-link to="/">Сообщения </router-link>
                </li>
                <li  class="list-group-item list-group-item-action list-top-menu-li">
                    <span v-if="notificationAction.length" class="badge badge-pill badge-primary" style="float:right;margin-bottom:-4px;">{{notificationAction.length}}</span>
                    <a href="#"  data-toggle="dropdown">Уведомлений </a>
                    <ul v-if="notificationAction.length" class="dropdown-menu">
                        <li>
                            <router-link :to="{path:`/notifications`}" style="font-size: .8em">Запрос на удаление ИОМа</router-link>
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

            onMounted(async() => {
                notificationAction.value = await store.dispatch('notification/getNotificationAction')
            })

            const onSubmit = handleSubmit(async values => {
                try{
                    await store.dispatch('auth/logout')
                    await  router.push('/auth')
                }catch (e) {

                }
            })
            return {
                onSubmit,
                notificationMessage,
                notificationAction
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