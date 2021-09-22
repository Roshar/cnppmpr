<template>
    <div class="row auth-container">
        <div class="col-md-3 "></div>
        <div class="col-md-6 auth-block">
            <h2 class="text-center">Восстановление пароля </h2>
            <form>
                <div class="form-group mb-3" v-if="notification">
                    <input type="email" :class="['form-control',{invalid:lError}]" name="login" id="login" v-model="login" aria-describedby="emailHelp" @blur="eBlur" placeholder="Введите логин (email):">
                    <small v-if="lError">{{lError}}</small>
                </div>
            </form>
            <form @submit.prevent="onSubmit">

                <div class="form-group mb-3" v-if="formactive">
                    <div class="form-group">
                        <input type="password" :class="['form-control',{invalid:pError}]" name="password" id="password" v-model="password" @blur="pBlur" placeholder="Введите новый пароль:">
                        <small v-if="pError">{{pError}}</small>
                    </div>
                </div>
                <div class="form-group mb-3" v-if="formactive">
                    <div class="form-group">
                        <input type="password" :class="['form-control',{invalid:cpError}]" name="confirmPassword" id="confirmPassword" v-model="confirmPassword"  @blur="cpBlur" placeholder="Повторите пароль:">
                        <small v-if="cpError">{{cpError}}</small>
                        <small v-if="checkInput" > Пароль не совпадает </small>
                    </div>
                </div>
                <div class="form-group mb-3" v-if="notification">
                    <button type="button" @click="onClick" class="btn auth-btn" > Отправить </button>
                </div>
                <div class="row">
                    <div class="col-12" v-if="!notification">
                        <button type="submit" class="btn auth-btn" :disabled="isSubmiting"> Сохранить новый пароль </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-md-3"></div>
    </div>
</template>

<script>

    import {computed, watch, ref} from 'vue'
    import * as yup from 'yup'
    import {useField, useForm} from 'vee-validate'
    import {useStore} from 'vuex'
    import {useRouter} from "vue-router";
    import {useRoute} from "vue-router"

    export default {
        setup(){
            const {handleSubmit,isSubmiting} = useForm()
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            let notification = ref(true);
            let formactive = ref();

            const load = addEventListener('load', () => {
                if(route.query.link){
                    if(!localStorage.getItem('recovery')){
                        store.dispatch('auth/recoverychecklink',{link:route.query.link})
                    }
                    formactive.value = true
                    notification.value = false
                }else{
                    notification.value = true
                    formactive.value = false
                }
            })

            const {value:login, errorMessage: lError, handleBlur:lBlur} = useField(
                'login',
                yup
                    .string()
                    .trim()
            )

            const PASSWORD_MIN_LENGTH = 4
            const {value:password, errorMessage: pError, handleBlur:pBlur} = useField(
                'password',
                yup
                    .string()
                    .trim()
                    .required('Обязательное поле')
                    .min(PASSWORD_MIN_LENGTH, 'Пароль не может быть меньше '+ PASSWORD_MIN_LENGTH + ' символов')
            )

            const checkInput = computed(() => password.value !== confirmPassword.value)

            const {value:confirmPassword, errorMessage: cpError, handleBlur:cpBlur} = useField(
                'confirmPassword',
                yup
                    .string()
                    .trim()
                    .required('Обязательное поле')
            )

            const onClick = async () => {
                try {
                    await store.dispatch('auth/recovery', login)
                }catch (e) {
                    console.log(e)
                }
            }

            const onSubmit = handleSubmit(async values => {

                try{
                    values.login = store.state['auth'].login || null
                    await store.dispatch('auth/changepassword',values)
                    await  router.push('/auth')
                }catch (e) {
                    console.log(e)
                }
            })

            return {
                login,
                password,
                confirmPassword,
                pError,
                cpError,
                pBlur,
                cpBlur,
                lError,
                lBlur,
                notification,
                onClick,
                checkInput,
                formactive,
                router,
                onSubmit,
                isSubmiting
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

