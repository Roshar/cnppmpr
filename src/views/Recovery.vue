<template>
    <div class="row auth-container">
        <div class="col-md-3 "></div>
        <div class="col-md-6 auth-block">
            <h2 class="text-center">Восстановление пароля </h2>
            <p v-if="!time">Для восстановления пароля, укажите логин (ваш электронный почтовый адрес).На почту вашего аккаунта будет выслано письмо с дальнейшими инструкциями.</p>
            <p v-if="time"> Электронное письмо с запросом на изменение пароля было выслано на Ваш электронный адрес. Если вы не получили данное письмо, проверьте папки «Спам» и «Удаленные», так как письмо могло автоматически туда перейти</p>
            <form>
                <div class="form-group mb-3" >
                    <div class="form-group">
                        <input type="email" class="form-control"  required name="login" id="login" v-model="login"  placeholder="Введите ваш email">
                        <small v-if="lError"> Обязательное поле</small>
                        <small v-if="lErrorLength"> Обязательное поле</small>
                    </div>
                </div>
                <div class="row">

                    <div class="col-12">
                        <p v-if="time">Повторный запрос будет доступен через: {{limit}} </p>
                        <button type="button" :disabled="time"  @click="sendRequest" class="btn auth-btn" > Отправить запрос  </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-md-3"></div>
    </div>
</template>

<script>

    import {useStore} from "vuex";
    import {useRoute, useRouter} from "vue-router";
    import {ref, onMounted, watch} from 'vue'

    export default {

        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            // const baseUrl = ref('http://localhost:8080')
            const baseUrl = ref('https://it-govzalla.onrender.com')
            const login = ref()
            const lError = ref()
            const lErrorLength = ref()
            const time = ref()
            const code = ref()
            const limit = ref()

            onMounted(()=>{
                if(localStorage.getItem('timer')){
                    limit.value = localStorage.getItem('timer')
                    time.value = true
                    timer()
                }else {
                    time.value = false
                }
            })

            console.log(baseUrl.value)

            const timer = () => {
                setInterval(() => {
                    if(limit.value !== 0) {
                        const dd = limit.value --
                        localStorage.setItem('timer',dd)
                    }else {
                        localStorage.removeItem('timer');
                        time.value = false
                    }
                }, 1000)
            }

            const sendRequest = async() => {
                if(login.value.length > 4) {
                    code.value = store.getters['auth/getCodeRecovery']
                    if(code.value !==true) {
                        limit.value = 45
                        localStorage.setItem('timer',limit.value)
                        time.value = true
                        timer()
                    }
                    await store.dispatch('auth/recovery', {login:login.value, baseUrl:baseUrl.value})

                }else {
                    lErrorLength.value = 'Некорректный адрес '
                }

            }

            return {
                login,
                lError,
                sendRequest,
                lErrorLength,
                time,
                limit

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

