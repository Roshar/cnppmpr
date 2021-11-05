<template>
    <div class="row register-container">
        <div class="col-md-3 "></div>
        <div class="col-md-6 auth-block">
            <h2 class="text-center">Регистрация администратора</h2>
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
                    <div class="form-group">
                        <label for="phone" style="color:grey; font-style: italic"> Введите секретный код  </label>
                        <input type="tel" :class="['form-control',{invalid:codeError}]" name="code" id="code" v-model="code"  @blur="codeBlur" placeholder="код">
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
        <div class="col-md-3"></div>
    </div>
</template>

<script>
    import {useRegisterAdminForm} from "../../use/registration-admin-form";
    export default {
        setup(){
            return {...useRegisterAdminForm()}
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

