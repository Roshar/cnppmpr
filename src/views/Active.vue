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
                <div class="form-group mb-3" v-if="isInput" >
                    <input type="text"  :class="['form-control',{invalid:cError}]" name="code" id="code" v-model="code" @blur="cBlur" placeholder="Введите код:">
                    <small v-if="cError">{{cError}}</small>
                </div>

                <div class="form-group mb-3" v-if="notification">
                    <button type="button" @click="onClick" class="btn auth-btn" > {{buttonVal}} </button>
                </div>
                <div class="msg">
                    <span> {{ message.text }} </span><br>
                    <span v-if="timeover"> Если вы не получили код на свой электронный адрес, через {{ timeover }} вы можете повторно запросить код </span>
                </div>

                <div class="row" >
                    <div class="col-12">
                        <button type="submit" class="btn auth-btn" :disabled="!isSub" > Отправить </button>
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
            const {handleSubmit,isSubmiting} = useForm();
            const store = useStore();
            const router = useRouter();
            let notification = ref(true);
            let buttonVal = ref('Получить код');
            const message = ref({});
            let flag;
            let isSub = ref(false);
            let isInput = ref(false);
            let timeover = ref()


            const {value:code, errorMessage: cError, handleBlur:cBlur} = useField(
                'code',
                yup
                    .string()
                    .trim()
                    .required('Обязательное поле')
            )

            let timer = function() {
                const t = setInterval(() => {
                    if(!localStorage.getItem("timer") && flag){
                        let num = localStorage.setItem("timer", 10)
                    }else {
                        let num2 = parseInt(localStorage.getItem("timer"))
                        localStorage.setItem("timer", --num2)
                        timeover.value = localStorage.getItem("timer")
                        if(num2 < 1){
                            notification.value = !notification.value
                            clearInterval(t)
                            localStorage.removeItem("time")
                            localStorage.removeItem("timer")
                            timeover.value = false
                        }
                        console.log(num2)
                    }
                },1000)
            }


            const load = window.addEventListener('load', () => {
                flag = localStorage.getItem("time")
                const firstClick = localStorage.getItem("first")
                if(firstClick) {
                    buttonVal.value = "Прислать повторно код"
                    isInput.value = true
                    isSub.value = true
                    message.value.text = localStorage.getItem("message")
                }
                if(!flag) {
                    notification.value = true
                }else {
                    isInput.value = true
                    isSub.value = true
                    notification.value = false
                    timer()
                }

            })

            const onClick = async () => {
                try {
                    await store.dispatch('auth/sendCodeToMail')
                    const code = await store.state['auth'].code
                    const text = await store.state['auth'].message
                    localStorage.setItem("first", true)
                    isSub.value = true
                    isInput.value = true
                    buttonVal.value = "Прислать повторно код"

                    if(localStorage.getItem('time')) {
                        notification.value = !notification.value
                        localStorage.removeItem('time')
                    }
                    if(localStorage.getItem("timer")){
                        localStorage.removeItem('timer')
                    }
                    localStorage.setItem('time', 10)
                    flag = localStorage.getItem("time")
                    timer()
                    notification.value = !notification.value
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
                code,
                cError,
                cBlur,
                onClick,
                onSubmit,
                message,
                isSub,
                isInput,
                buttonVal,
                timeover


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

