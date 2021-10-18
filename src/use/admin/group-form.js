import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

export function useGroupForm(fn){

    const {handleSubmit,isSubmiting} = useForm({
        initialValues: {
            tutor:''
        }
    })

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

    const {value:tutor, errorMessage: tutorError, handleBlur:tutorBlur} = useField(
        'tutor',
        yup
            .string()
            .trim()
            .required('Обязательное поле')
    )


    const onSubmit = handleSubmit(fn)

    return {
        title,
        description,
        tutor,
        titleError,
        descriptionError,
        tutorError,
        titleBlur,
        descriptionBlur,
        tutorBlur,
        onSubmit,
        isSubmiting,
    }
}