<template>
    <div class="row auth-container">
        <div class="col-md-3 "></div>
        <div class="col-md-6 auth-block">
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
        <div class="col-md-3"></div>
    </div>
</template>

<script>
import {useLoginForm} from '../use/login-form'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {error} from '../utils/error'
    export default {
        setup () {
            const route = useRoute()
            const store = useStore()
            if(route.query.message) {
                store.dispatch('setSystemMessage',{
                    value:error(route.query.message),
                    type: 'warning'
                })
            }
            return {...useLoginForm()} 
            
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

