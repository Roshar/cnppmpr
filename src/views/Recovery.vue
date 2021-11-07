<template>
    <div class="row auth-container">
        <div class="col-md-3 "></div>
        <div class="col-md-6 auth-block">
            <h2 class="text-center">Восстановление пароля </h2>
            <form>
                <div class="form-group mb-3" >
                    <div class="form-group">
                        <input type="email" class="form-control"  required name="login" id="login" v-model="login"  placeholder="Введите ваш email">
                        <small v-if="lError"> Обязательное поле</small>
                        <small v-if="lErrorLength"> Обязательное поле</small>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12" >
                        <button type="button"  @click="sendRequest" class="btn auth-btn" > Отправить запрос  </button>
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
    import {ref, onMounted} from 'vue'

    export default {

        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const login = ref()
            const lError = ref()
            const lErrorLength = ref()

            const sendRequest = async() => {
                console.log(login.value.length)
                if(login.value.length < 3) {
                    await store.dispatch('auth/recovery', login)
                }else {
                    lErrorLength.value = 'Некорректный адрес '
                }

            }

            return {
                login,
                lError,
                sendRequest,
                lErrorLength

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

