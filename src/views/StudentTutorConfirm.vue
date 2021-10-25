<template>
    <div class="center" v-if="status == 'null' ">
        <h3>Статус Вашего аккаунта еще не подтвержден. Свяжитесь с администрацией портала (адрес: <strong>novrazova2016@mail.ru</strong>) или дождитесь активации аккаунта, Вам сообщат об этом</h3>
        <div class="btn-out">
            <form @submit.prevent="onSubmit">
                <button type="submit" class="btn btn-info">ВЕРНУТЬ ПОЗЖЕ</button>
            </form>
        </div>
    </div>
    <div class="center" v-if="status == 'ban' ">
        <h3>Ваш аккаунт заблокирован администрацией сайта, а значит вся деятельность в нем временно приостановлена. Для выяснения причины блокировки свяжитесь с администрацией портала (адрес: <strong>novrazova2016@mail.ru</strong>)</h3>
        <div class="btn-out">
            <form @submit.prevent="onSubmit">
                <button type="submit" class="btn btn-info">ВЕРНУТЬ ПОЗЖЕ</button>
            </form>
        </div>
    </div>

</template>

<script>
    import {useForm} from "vee-validate";
    import {ref, onMounted, computed, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import {useRoute} from 'vue-router'
    import store from "../store";
    export default {
        setup(){
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const {handleSubmit} = useForm()
            const status = ref(false)
            const onSubmit = handleSubmit(async values => {
                try{
                    await store.dispatch('auth/logout')
                    await  router.push('/auth')
                }catch (e) {

                }
            })

            onMounted(async()=>{
                const token = route.query.token
                console.log(token)
                const statusCheck = await store.dispatch('auth/checkRoleByToken',{token:token})
                console.log(statusCheck)
                status.value = statusCheck.values.status
                if(status.value === 'on') {
                    await router.push('/')
                }
            })
            return {
                onSubmit,
                status
            }
        }
    }
</script>

<style scoped>
    .center {
        height: 300px;
        top:200px;
        position: relative;
        border: 3px solid cadetblue;
    }

    .center h3{
        text-align: center;
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

</style>