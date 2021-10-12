import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

export function useLibraryForm(fn){

    const {handleSubmit,isSubmiting} = useForm({
        initialValues: {
            tag:1,
            mentor:0
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
    const {value:link, errorMessage: linkError, handleBlur:linkBlur} = useField(
        'link',
        yup
            .string()
            .trim()
    )


    const {value:tag, errorMessage: tagError, handleBlur:tagBlur} = useField(
        'tag',
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
        tag,
        titleError,
        descriptionError,
        linkError,
        tagError,
        titleBlur,
        descriptionBlur,
        linkBlur,
        tagBlur,
        onSubmit,
        isSubmiting,
    }
}