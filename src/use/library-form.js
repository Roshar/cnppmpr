import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

export function useLibraryForm(fn,data){

    const {handleSubmit,isSubmiting} = useForm({
        initialValues: {
            category: '',
            discipline:''
        }
    })

    // console.log(kk.value)

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

    const {value:category, errorMessage: catError, handleBlur:catBlur} = useField(
        'category',
        yup
            .string()
            .trim()
            .required('Обязательное поле')
    )

    const {value:discipline, errorMessage: dError, handleBlur:dBlur} = useField(
        'discipline',
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
        discipline,
        titleError,
        descriptionError,
        dError,
        linkError,
        catError,
        titleBlur,
        descriptionBlur,
        linkBlur,
        dBlur,
        catBlur,
        onSubmit,
        isSubmiting,
    }
}