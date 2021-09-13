<template>
    <div class="row register-container">
        <div class="col-md-3 "></div>
        <div class="col-md-6 auth-block">
            <h2 class="text-center">Регистрация </h2>
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
                        <label for="area"> Выберите ваш город/район:</label>
                        <select :class="['form-control',{invalid:areaError}]" name="area"  v-model="area" @change="onChange($event)" required   @blur="areaBlur" id="area">
                            <option v-for="item of areaList" :key="item.id_area" v-bind:value="item.id_area">{{item.title_area}}</option>
                        </select>
                        <small v-if="areaError">{{areaError}}</small>
                    </div>
                </div>

                <div class="form-group mb-3" >
                    <div class="form-group">
                        <label for="area"> Выберите вашу школу:</label>
                        <select :class="['form-control',{invalid:schoolError}]"  name="school" v-model="school" required @blur="schoolBlur" id="school">
                            <option v-for="item in schoolList" :key="item.id_school" v-bind:value="item.id_school">
                                {{ item.school_name }}
                            </option>
                        </select>
                        <small v-if="schoolError">{{schoolError}}</small>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <div class="form-group">
                        <label for="phone" style="color:grey; font-style: italic"> Введите только код и цифры без пробелов, пример: +79281111111</label>
                        <input type="tel" :class="['form-control',{invalid:phoneError}]" name="phone" id="phone" v-model="phone"  @blur="phoneBlur" placeholder="Номер телефона:">
                        <small v-if="phoneError">{{phoneError}}</small>
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
    import {computed, watch} from 'vue'
    import * as yup from 'yup'
    import {useField, useForm} from 'vee-validate'
    import {useStore} from 'vuex'
    import {useRouter} from "vue-router";

    export default {
        setup(){
            const {handleSubmit,isSubmiting} = useForm()
            const store = useStore()
            const router = useRouter()


            const {value:login, errorMessage: lError, handleBlur:lBlur} = useField(
                'login',
                yup
                    .string()
                    .trim()
                    .required('Обязательное поле')
                    .email('Необходимо ввести корректный email')
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


            const {value:first_name, errorMessage: fnError, handleBlur:fnBlur} = useField(
                'first_name',
                yup
                    .string()
                    .trim()
                    .required('Обязательное поле')
            )

            const {value:surname, errorMessage: snError, handleBlur:snBlur} = useField(
                'surname',
                yup
                    .string()
                    .trim()
                    .required('Обязательное поле')
            )

            const {value:patronymic, errorMessage: patError, handleBlur:patBlur} = useField(
                'patronymic',
                yup
                    .string()
                    .trim()
            )

            const {value:area, errorMessage: areaError, handleBlur:areaBlur} = useField(
                'area',
                yup
                    .string()
                    .trim()
                    // .required('Необходимо выбрать поле "город/район"')
            )

            const {value:school, errorMessage: schoolError, handleBlur:schoolBlur} = useField(
                'school',
                yup
                    .string()
                    .trim()
                    // .required('Необходимо выбрать образовательную организацию')
            )
            const {value:phone, errorMessage: phoneError, handleBlur:phoneBlur} = useField(
                'phone',
                yup
                    .string()
                    .trim()
                    .required('Необходимо указать ваш контактный номер (мобильный)')
            )

            const onChange =  async (val) =>{
                if(val.target.value){
                    try {
                        await store.dispatch('auth/schools',{id:val.target.value})
                    }catch (e) {
                        console.log(e)
                    }
                }
            }


            const getAreas = async () => {
                await store.dispatch('auth/areas')
            }
            getAreas()

            const onSubmit = handleSubmit(async values => {
                values.role = "student"
                values.patronymic ? values.patronymic : " "
                try{
                    await store.dispatch('auth/registration',values)
                    await  router.push('/auth')
                }catch (e) {

                }
            })

            return {
                login,
                password,
                first_name,
                surname,
                patronymic,
                area,
                school,
                phone,
                lError,
                pError,
                fnError,
                cpError,
                snError,
                areaError,
                schoolError,
                phoneError,
                lBlur,
                pBlur,
                cpBlur,
                fnBlur,
                snBlur,
                areaBlur,
                schoolBlur,
                onSubmit,
                isSubmiting,
                confirmPassword,
                checkInput,
                schoolList: computed(() => store.state['auth'].schoolsList),
                areaList: computed(() => store.state['auth'].areasList),
                onChange
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

