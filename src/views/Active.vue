<template>
    <div class="col-10">
        <nav class="navbar justify-content-end">
            <ul class="list-group list-group-horizontal list-top-menu-ul">
                <li class="list-group-item list-group-item-action list-top-menu-li">
                    <form @submit.prevent="onLogout">
                        <button type="submit" class="btn auth-btn" > Выход </button>
                    </form>
                </li>
            </ul>
        </nav>
    </div>
    <div class="row register-container">
        <div class="col-md-3 "></div>
        <div class="col-md-6 auth-block">
            <h2 class="text-center">Активация личного кабинета </h2>
            <form @submit.prevent="onSubmit">
                <div class="form-group mb-3" >
                    <input type="text"  :class="['form-control',{invalid:cError}]" name="code" id="code" v-model="code" @blur="cBlur" placeholder="Введите код:">
                    <small v-if="cError">{{cError}}</small>
                </div>

                <div class="form-group mb-3" v-if="notification">

                    <button type="button" @click="onClick" class="btn auth-btn"> Получить код </button>
                </div>
                <div class="msg">
                    <span> {{ message.text }} </span>
                </div>
                <div class="row" v-if="!notification">
                    <div class="col-12">
                        <button type="submit" class="btn auth-btn " :disabled="isSubmiting"> Отправить </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-md-3"></div>
    </div>
</template>

<script>
    import {computed, watch} from 'vue'
    import { ref } from 'vue'
    import * as yup from 'yup'
    import {useField, useForm} from 'vee-validate'
    import {useStore} from 'vuex'
    import {useRouter} from "vue-router";

    export default {
        setup(){
            const {handleSubmit,isSubmiting} = useForm()
            const store = useStore()
            const router = useRouter()
            let notification = ref(true)
            const message = ref({

            })


            const {value:code, errorMessage: cError, handleBlur:cBlur} = useField(
                'code',
                yup
                    .string()
                    .trim()
                    .required('Обязательное поле')
            )

            const changeStatus = computed(() => {
                notification  = !notification.value
            })

            const onClick = async () => {
                try {
                    await store.dispatch('auth/sendCodeToMail')
                    const code = await store.state['auth'].code
                    const text = await store.state['auth'].message
                    notification.value = false
                    message.value = {
                        text: text,
                    }
                }catch (e) {
                    console.log(e)
                }
            }

            const onSubmit = handleSubmit(async values => {
                values.hash = store.state['auth'].code
                values.code = values.code + 'r'
                values.token = store.state['auth'].token
                console.log('sender')
                try{
                    await store.dispatch('auth/confirmCode',values)
                    await  router.push('/')
                }catch (e) {

                }
            })

            const onLogout = async () => {
                try{
                    await store.dispatch('auth/logout')
                    await  router.push('/auth')
                }catch (e) {

                }
            }

            return {
                notification,
                isSubmiting,
                onLogout,
                changeStatus,
                code,
                cError,
                cBlur,
                onClick,
                onSubmit,
                message
            }
        }
    }



</script>

<style>
    .auth-container{
        margin-top:10vh;
    }
    .auth-block{
        background-color: white;
        padding:25px 20px;
    }
    .auth-not-btn{
        display:inline-block;
        padding:7px 20px;
    }

    .auth-not-btn:hover{
        text-decoration: none;
    }

    .auth-btn{
        background-color: #4571a3;
        color:#fff;
        width:100%
    }
    .auth-btn:hover{
        color:#fff;
        background-color: #5181b8;
    }
    .invalid{
        border:1px solid tomato;
    }
</style>

