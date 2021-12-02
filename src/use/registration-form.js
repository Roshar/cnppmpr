import {computed, watch, ref} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from "vue-router";

export function useRegisterForm() {
        const {handleSubmit,isSubmiting} = useForm({
            initialValues: {
                gender: '',
                discipline: '',
                area: '',
                school: ''
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

        const {value:gender, errorMessage: genderError, handleBlur:genderBlur} = useField(
            'gender',
            yup
                .string()
                .trim()
                .required('Обязательное поле')
        )



        const {value:area, errorMessage: areaError, handleBlur:areaBlur} = useField(
            'area',
            yup
                .string()
                .trim()
                .required('Необходимо выбрать поле "город/район"')
        )


        const {value:birthday, errorMessage: birthdayError, handleBlur:birthdayBlur} = useField(
            'birthday',
            yup
                .string()
                .trim()
                .required('Необходимо указать дату рождения')
        )

        const {value:school, errorMessage: schoolError, handleBlur:schoolBlur} = useField(
            'school',
            yup
                .string()
                .trim()
            // .required('Необходимо выбрать образовательную организацию')
        )

        const {value:discipline, errorMessage: disError, handleBlur:disBlur} = useField(
            'discipline',
            yup
                .string()
                .trim()
                .required('Необходимо выбрать предмет')
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

        const getDisciplines = async () => {
            await store.dispatch('auth/disciplines')
        }
        getDisciplines()

        const onSubmit = handleSubmit(async values => {
            values.role = "student"
            values.patronymic = values.patronymic ? values.patronymic : " "
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
            gender,
            area,
            birthday,
            school,
            phone,
            discipline,
            disError,
            genderError,
            lError,
            pError,
            code,
            codeError,
            codeBlur,
            birthdayError,
            fnError,
            cpError,
            snError,
            areaError,
            schoolError,
            phoneError,
            lBlur,
            birthdayBlur,
            pBlur,
            cpBlur,
            fnBlur,
            snBlur,
            areaBlur,
            schoolBlur,
            disBlur,
            genderBlur,
            onSubmit,
            isSubmiting,
            confirmPassword,
            checkInput,
            schoolList: computed(() => store.state['auth'].schoolsList),
            areaList: computed(() => store.state['auth'].areasList),
            disciplineList: computed(() => store.state['auth'].disciplineList),
            onChange,
        }
}