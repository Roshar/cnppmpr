import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from "vue-router";

export function useExerciseForm(){

    const {handleSubmit,isSubmiting} = useForm()
    const store = useStore()
    const router = useRouter()

    const {value:title, errorMessage: titleError, handleBlur:titleBlur} = useField(
        'title',
        yup
            .string()
            .trim()
            .required('Обязательное поле')
    )
    const {value:description, errorMessage: descriptionError, handleBlur:descriptionBlur} = useField(
        'description',
        yup
            .string()
            .trim()
    )
    const {value:link, errorMessage: linkError, handleBlur:linkBlur} = useField(
        'link',
        yup
            .string()
            .trim()
    )
    const {value:author, errorMessage: authorError, handleBlur:authorBlur} = useField(
        'author',
        yup
            .string()
            .trim()
            .required('Обязательное поле')
    )

    const {value:term, errorMessage: termError, handleBlur:termBlur} = useField(
        'term',
        yup
            .string()
            .trim()
    )

    const onSubmit = handleSubmit(async values => {
        try{
            await store.dispatch('auth/login',values)
            await  router.push('addExercise')
        }catch (e) {

        }
    })

    return {
        title,
        description,
        link,
        author,
        term,
        titleError,
        descriptionError,
        linkError,
        authorError,
        termError,
        titleBlur,
        descriptionBlur,
        linkBlur,
        authorBlur,
        termBlur,
        onSubmit,
        isSubmiting,
    }
}