import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
export function useLoginForm(){

    const {handleSubmit,isSubmiting} = useForm()
            const store = useStore()
            const router = useRouter()
            const {value:email, errorMessage: eError, handleBlur:eBlur} = useField(
                'email',
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
            const onSubmit = handleSubmit(async values=>{
                    console.log('Form:', values)
                    await  store.dispatch('auth/login', values)
                    router.push('/')
                })
            
            return {
                email,
                password,
                eError,
                pError,
                eBlur,
                pBlur,
                onSubmit,
                isSubmiting,
        
                
            }
}