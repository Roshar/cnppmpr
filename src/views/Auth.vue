<template>
    <div class="row auth-container">
        <div class="col-md-3 "></div>
        <div class="col-md-6 auth-block">
            <app-loader v-if="loading"></app-loader>
            <div class="load-content" v-else>
                <div class="modal-form2" v-if="authenticated">
                    <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header flex-column">
                                <div class="icon-box">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
                                        <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                                        <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
                                    </svg>
                                </div>
                                <h4 class="modal-title w-100">Вы уверены?</h4>
                                <div class="modal-body">
                                    <p> Вы уже вошли в систему. Вам нужно выйти из системы чтобы войти от имени другого пользователя. </p>
                                </div>
                            </div>
                            <div class="modal-footer justify-content-center">
                                <button type="button" class="btn btn-secondary"  @click="cancelLogout" data-dismiss="modal">Отмена</button>
                                <button type="button" @click="doConfirm" class="btn btn-danger">Выйти</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="load-content" v-else>
                    <h2 class="text-center">Войти в личный кабинет </h2>
                    <form @submit.prevent="onSubmit">
                        <div class="form-group mb-3">
                            <input type="email" :class="['form-control',{invalid:lError}]" name="login" id="login" v-model="login" aria-describedby="emailHelp" @blur="eBlur" placeholder="Введите логин (email):">
                            <small v-if="lError">{{lError}}</small>
                        </div>
                        <div class="form-group mb-3">
                            <div class="form-group">
                                <input type="password" :class="['form-control',{invalid:pError}]" name="password" id="password" v-model="password" @blur="pBlur" placeholder="Введите пароль:">
                                <small v-if="pError">{{pError}}</small>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <button type="submit" class="btn auth-btn" :disabled="isSubmiting">Войти</button>
                            </div>
                            <div class="col-6">
                                <router-link class="auth-not-btn" to="/recovery">Забыли пароль?</router-link>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <router-link to="/register">Зарегистрироваться как слушатель</router-link>
                            </div>
                            <div class="col-6">
                                <router-link class="auth-not-btn" to="/regtutor">Зарегистрироваться как тьютор</router-link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-3"></div>
    </div>
</template>

<script>
    import {useLoginForm} from '../use/login-form'
    import {useRoute, useRouter} from 'vue-router'
    import {useStore} from 'vuex'
    import {error} from '../utils/error'
    import {onMounted, ref} from "vue";
    import AppLoader from "../components/ui/AppLoader";
    export default {
        setup () {
            const route = useRoute()
            const authenticated = ref(false)
            const store = useStore()
            const router = useRouter()
            const loading = ref(true)

            onMounted(async()=>{
                loading.value = true
                if(localStorage.getItem('jwt-token')){
                    await store.dispatch('auth/confirmRole')
                    const authResult = store.state['auth']
                    if(authResult) {
                        authenticated.value = true
                    }
                }else {
                    authenticated.value = false
                }
                loading.value = false
            })

            const cancelLogout = () => {
                router.go(-1)
            }

            const doConfirm = async() => {
                await store.dispatch('auth/logout')
                authenticated.value = false
            }

            if(route.query.message) {
                store.dispatch('setSystemMessage',{
                    value:error(route.query.message),
                    type: 'warning'
                })
            }
            return {...useLoginForm(),authenticated,doConfirm,cancelLogout,loading}

        },
        components: {AppLoader}
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

