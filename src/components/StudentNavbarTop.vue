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
                    <span v-if="notificationMessage" class="badge badge-pill badge-danger" style="float:right;margin-bottom:-4px;">{{notificationMessage.length}}</span>
                    <router-link to="/develops">Сообщения </router-link>

                </li>
                <li  class="list-group-item list-group-item-action list-top-menu-li">
                    <span v-if="notificationAction.length" class="badge badge-pill badge-primary" style="float:right;margin-bottom:-4px;">{{notificationAction.length}}</span>
                    <a href="#"  data-toggle="dropdown">Уведомления </a>
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
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import {ref} from "vue";
    export default {
        setup(){
            const store = useStore()
            const router = useRouter()
            const notificationMessage = ref(false)
            const notificationAction = ref(false)

            const onSubmit = handleSubmit(async values => {
                try{
                    await store.dispatch('auth/logout')
                    window.location.href = `/auth`;
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