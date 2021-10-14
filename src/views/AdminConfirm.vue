<template>
    <div class="center">
        <h3>Статус Вашего аккаунта еще не подтвержден. Свяжитесь с разработчиками портала или дождитесь активации аккаунта, Вам сообщат об этом</h3>
        <div class="btn-out">
            <form @submit.prevent="onSubmit">
                <button type="submit" class="btn btn-info">ВЕРНУТЬ ПОЗЖЕ</button>
            </form>
        </div>
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
    .center {
        height: 200px;
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