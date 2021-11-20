<template>
    <div class="col-3">
        <h2> <router-link to="/">
            <img src="/itlogo.svg" alt="лого" > </router-link>
        </h2>
    </div>
    <div class="col-9">
        <nav class="navbar justify-content-end">
            <ul class="list-group list-group-horizontal list-top-menu-ul">
                <li class="list-group-item list-group-item-action list-top-menu-li">
                    <span v-if="notificationMessage && notificationMessage" class="badge badge-pill badge-danger" style="float:right;margin-bottom:-4px;">{{notificationMessage.length}}</span>
                    <router-link to="/tutor_conversations">Сообщения </router-link>
                </li>
                <li  class="list-group-item list-group-item-action list-top-menu-li">
                    <span v-if="notificationAction" class="badge badge-pill badge-primary" style="float:right;margin-bottom:-4px;">{{notificationAction}}</span>
                    <a href="#"  data-toggle="dropdown">Уведомления </a>
                    <ul v-if="notificationAction" class="dropdown-menu">
                        <li>
                            <router-link :to="{path:`/show_exercises_accepted`}" style="font-size: .8em">В ожидании проверки <span style="font-size:1.2em;color: #4e73e5; font-weight: bold">{{pendingExercise.length}}</span> </router-link>
                        </li>
                    </ul>
                </li>
                <li class="list-group-item list-group-item-action list-top-menu-li">
                    <div style="display: flex; align-items: center; " class="acc" data-toggle="dropdown">
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
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import {onMounted, ref} from "vue";
    export default {
        setup(){
            const store = useStore()
            const router = useRouter()
            const notificationMessage = ref()
            const notificationAction = ref()
            const pendingExercise = ref(null)
            const baseUrl = ref(process.env.VUE_APP_URL)
            const myAccount = ref(null)
            const avatar = ref(null)
            const name = ref(null)
            const requestStudents = ref(0)

            onMounted(async() => {
                myAccount.value = await store.dispatch('user/getTutorData',localStorage.getItem('jwt-token'))

                avatar.value = baseUrl.value +'/'+myAccount.value[0].avatar
                name.value = myAccount.value[0].name
                pendingExercise.value = await store.dispatch('notification/getRequestPendingExercise', {
                    token: localStorage.getItem('jwt-token')
                })

                if(pendingExercise.value ){
                    notificationAction.value = pendingExercise.value.length

                }
                // requestStudents.value = await store.dispatch('notification/getRequestStudents')
                // requestStudents.value = requestStudents.value ? requestStudents.value[0].id : 0
                // requestTutors.value = requestTutors.value ? requestTutors.value[0].id : 0
                // requestFromUsers.value = requestStudents.value + requestTutors.value
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
                notificationAction,
                pendingExercise,
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