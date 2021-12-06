import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

export function useLibraryForm(fn){



    const {handleSubmit,isSubmiting} = useForm({
        initialValues: {
            category:'',
            discipline:'',
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

    const {value:discipline, errorMessage: disError, handleBlur:disBlue} = useField(
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
        discipline,
        disError,
        disBlue,
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