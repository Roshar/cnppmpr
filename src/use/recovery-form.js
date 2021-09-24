import {computed, watch, ref} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from "vue-router";
import {useRoute} from "vue-router"

export function useRecoveryForm() {

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
