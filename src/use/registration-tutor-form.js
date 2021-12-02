import {computed, watch, ref} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from "vue-router";

export function useRegisterTutorForm(role) {
        const {handleSubmit,isSubmiting} = useForm({
            initialValues: {
                gender: '',
                discipline: ''
            }
        })
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

        const {value:discipline, errorMessage: disError, handleBlur:disBlur} = useField(
            'discipline',
            yup
                .string()
                .trim()
                .required('Необходимо выбрать предмет')
        )

        const {value:gender, errorMessage: genderError, handleBlur:genderBlur} = useField(
            'gender',
            yup
                .string()
                .trim()
                .required('Необходимо выбрать пол')
        )


        const {value:phone, errorMessage: phoneError, handleBlur:phoneBlur} = useField(
            'phone',
            yup
                .string()
                .trim()
                .required('Необходимо указать ваш контактный номер (мобильный)')
        )

        const {value:birthday, errorMessage: birthdayError, handleBlur:birthdayBlur} = useField(
            'birthday',
            yup
                .string()
                .trim()
                .required('Необходимо указать дату рождения')
        )

        const {value:code, errorMessage: codeError, handleBlur:codeBlur} = useField(
            'code',
            yup
                .string()
                .trim()
                .required('Необходимо указать секретный код')
        )

        const getDisciplines = async () => {
            await store.dispatch('auth/disciplines')
        }
        getDisciplines()

        const onSubmit = handleSubmit(async values => {
            values.role = "tutor"
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
            discipline,
            birthday,
            phone,
            code,
            gender,
            lError,
            pError,
            fnError,
            cpError,
            snError,
            disError,
            phoneError,
            genderError,
            codeError,
            birthdayError,
            lBlur,
            pBlur,
            cpBlur,
            fnBlur,
            snBlur,
            disBlur,
            genderBlur,
            birthdayBlur,
            codeBlur,
            onSubmit,
            isSubmiting,
            confirmPassword,
            checkInput,
            disciplineList: computed(() => store.state['auth'].disciplineList),
        }
    }
