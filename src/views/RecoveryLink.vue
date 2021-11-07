<template>
    <div class="row auth-container">
        <div class="col-md-3 "></div>
        <div class="col-md-6 auth-block">
            <h2 class="text-center">Восстановление пароля </h2>
            <form >
                <div class="form-group mb-3" >
                    <div class="form-group">
                        <input type="password" class="form-control" name="password" id="password" v-model="password"  placeholder="Введите новый пароль:">
                        <small v-if="pError"> Обязательное поле</small>
                    </div>
                </div>
                <div class="form-group mb-3" >
                    <div class="form-group">
                        <input type="password" class="form-control" name="confirmPassword" id="confirmPassword" v-model="confirmPassword"  @blur="cpBlur" placeholder="Повторите пароль:">
                        <small v-if="cpError">Обязательное поле</small>
                        <small v-if="checkInput" > Пароль не совпадает </small>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12" >
                        <button  @click="onClick" class="btn auth-btn" > Сохранить новый пароль </button>
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
            const password = ref()
            const passwordConfirm = ref()
            const pError = ref()
            const cpError = ref()
            const checkInput = ref()

            const onClick = async() => {

            }

            onMounted(async()=>{
                console.log(route.params.link)
            })



            return {
                password,
                passwordConfirm,
                pError,
                cpError,
                checkInput,
                onClick
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

