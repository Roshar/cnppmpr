<template>
    <div class="row register-container">
        <div class="col-md-3 "></div>
        <div class="col-md-6 auth-block">
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
                                <p> Вы уже вошли в систему. Вам нужно выйти из системы чтобы пройти регистрацию. </p>
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
                <h2 class="text-center">Регистрация тьютора</h2>
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
                    <div class="form-group mb-3">
                        <div class="form-group">
                            <input type="password" :class="['form-control',{invalid:cpError}]" name="confirmPassword" id="confirmPassword" v-model="confirmPassword"  @blur="cpBlur" placeholder="Повторите пароль:">
                            <small v-if="cpError">{{cpError}}</small>
                            <small v-if="checkInput" > Пароль не совпадает </small>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <div class="form-group">
                            <input type="text" :class="['form-control',{invalid:fnError}]" name="first_name" id="first_name" v-model="first_name"  @blur="fnBlur" placeholder="Имя:">
                            <small v-if="fnError">{{fnError}}</small>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <div class="form-group">
                            <input type="text" :class="['form-control',{invalid:snError}]" name="surname" id="surname" v-model="surname"  @blur="snBlur" placeholder="Фамилия:">
                            <small v-if="snError">{{snError}}</small>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <div class="form-group">
                            <input type="text" class="form-control" name="patronymic" id="patronymic" v-model="patronymic"  placeholder="Отчество:">
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <div class="form-group">
                            <label for="discipline"> Выберите ваш предмет:</label>
                            <select :class="['form-control',{invalid:disError}]" name="area"  v-model="discipline" required   @blur="disBlur" id="discipline">
                                <option value="">Выбрать</option>
                                <option v-for="item of disciplineList" :key="item.id_dis" v-bind:value="item.id_dis">{{item.title_discipline}}</option>
                            </select>
                            <small v-if="disError">{{disError}}</small>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <div class="form-group">
                            <label for="gender"> Выберите ваш пол</label>
                            <select :class="['form-control',{invalid:genderError}]" name="gender"  v-model="gender"  required   @blur="genderBlur" id="gender">
                                <option value="">Выбрать</option>
                                <option value="man">Муж</option>
                                <option value="woman">Жен</option>
                            </select>
                            <small v-if="genderError">{{genderError}}</small>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <div class="form-group">
                            <label for="phone" style="color:grey; font-style: italic"> Введите только код и цифры без пробелов, пример: +79281111111</label>
                            <input type="tel" :class="['form-control',{invalid:phoneError}]" name="phone" id="phone" v-model="phone"  @blur="phoneBlur" placeholder="Номер телефона:">
                            <small v-if="phoneError">{{phoneError}}</small>
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <label for="term">Укажите дату рождения </label>
                        <input type="date" id="term" name="birthday" class="form-control" v-model="birthday">
                        <small v-if="birthdayError">{{birthdayError}}</small>
                    </div>
                    <div class="form-group mb-3">
                        <div class="form-group">
                            <label for="code" style="color:grey; font-style: italic"> Введите секретный код  </label>
                            <input type="text" :class="['form-control',{invalid:codeError}]" name="code" id="code" v-model="code"  @blur="codeBlur" placeholder="код">
                            <small v-if="codeError">{{codeError}}</small>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <button type="submit" class="btn auth-btn" :disabled="isSubmiting"> Зарегистрироваться </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="col-md-3"></div>
    </div>
</template>

<script>
    import {useRegisterTutorForm} from "../../use/registration-tutor-form";
    import {onMounted, ref} from "vue";
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    export default {
        setup(){
            const authenticated = ref(false)
            const store = useStore()
            const router = useRouter()

            onMounted(async()=>{
                if(localStorage.getItem('jwt-token')){
                    await store.dispatch('auth/confirmRole')
                    const authResult = store.state['auth']
                    if(authResult) {
                        authenticated.value = true
                    }
                }else {
                    authenticated.value = false
                }
            })

            const cancelLogout = () => {
                router.go(-1)
            }

            const doConfirm = async() => {
                await store.dispatch('auth/logout')
                authenticated.value = false
            }

            return {...useRegisterTutorForm(),authenticated,doConfirm,cancelLogout}
        }
    }
</script>

<style>

    .modal-dialog.modal-confirm {
        padding: 0;
        margin: 0;
    }

    .modal-header.flex-column {
        padding: 10px;
    }

    .btn-outline-primary-send{
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }

    .modal-confirm .icon-box {
        width: 80px;
        height: 80px;
        margin: 0 auto;
        z-index: 9;
        text-align: center;
        border: none
    }
    .modal-confirm .icon-box svg {
        color: #f15e5e;
        font-size: 46px;
        display: inline-block;
        margin-top: 13px;
    }
    .modal-confirm .btn, .modal-confirm .btn:active {
        color: #fff;
        border-radius: 4px;
        background: #60c7c1;
        text-decoration: none;
        transition: all 0.4s;
        line-height: normal;
        min-width: 120px;
        border: none;
        min-height: 40px;
        border-radius: 3px;
        margin: 0 5px;
    }
    .modal-confirm .btn-secondary {
        background: #c1c1c1;
    }
    .modal-confirm .btn-secondary:hover, .modal-confirm .btn-secondary:focus {
        background: #a8a8a8;
    }
    .modal-confirm .btn-danger {
        background: #f15e5e;
    }
    .modal-confirm .btn-danger:hover, .modal-confirm .btn-danger:focus {
        background: #ee3535;
    }
    .modal-confirm .close {
        position: absolute;
        top: 15px;
        right: 12px;
    }
    .modal-confirm h4 {
        text-align: center;
        font-size: 26px;
        margin: 30px 0 -10px;
    }
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

