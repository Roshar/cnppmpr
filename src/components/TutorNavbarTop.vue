<template>
    <div class="col-2">
        <h2>ЦНППМ</h2>
    </div>
    <div class="col-10">
        <nav class="navbar justify-content-end">
            <ul class="list-group list-group-horizontal list-top-menu-ul">
                <li class="list-group-item list-group-item-action list-top-menu-li">
                    <router-link to="/">Помощь</router-link>
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
    export default {
        setup(){
            const store = useStore()
            const router = useRouter()

            const onSubmit = handleSubmit(async values => {
                try{
                    await store.dispatch('auth/logout')
                    await  router.push('/auth')
                }catch (e) {

                }
            })
            return {
                onSubmit
            }
        }
    }
</script>

<style scoped>

    .list-top-menu-li{
        list-style-type: none;
        border:none
    }

    .list-top-menu-li a{
        color:#5d5d5d;
        padding:10px 15px;
    }

    .list-top-menu-li a:hover{
        padding:10px 15px;
        text-decoration: none;

    }

</style>