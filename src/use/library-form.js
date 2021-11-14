import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

export function useLibraryForm(fn){



    const {handleSubmit,isSubmiting} = useForm({
        initialValues: {
            category:'',
        }
    })



    const {value:title, errorMessage: titleError, handleBlur:titleBlur} = useField(
        'title',
        yup
            .string()
            .trim()
            .required('Обязательное поле')
    )
    const {value:description} = useField(
        'description',
        yup
            .string()
            .trim()
    )
    const {value:link} = useField(
        'link',
        yup
            .string()
            .trim()
    )

    const {value:category, errorMessage: catError, handleBlur:catBlur} = useField(
        'category',
        yup
            .string()
            .trim()
            .required('Обязательное поле')
    )

    const onSubmit = handleSubmit(fn)

    return {
        title,
        description,
        link,
        category,
        titleError,
        catError,
        titleBlur,
        catBlur,
        onSubmit,
        isSubmiting,
    }
}