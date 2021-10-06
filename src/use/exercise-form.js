import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

export function useExerciseForm(fn){

    const {handleSubmit,isSubmiting} = useForm({
        initialValues: {
            tag:1,
            author:1
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

    const {value:tag, errorMessage: tagError, handleBlur:tagBlur} = useField(
        'tag',
        yup
            .string()
            .trim()
    )

    const onSubmit = handleSubmit(fn)

    return {
        title,
        description,
        link,
        author,
        term,
        tag,
        titleError,
        descriptionError,
        linkError,
        authorError,
        termError,
        tagError,
        titleBlur,
        descriptionBlur,
        linkBlur,
        authorBlur,
        termBlur,
        tagBlur,
        onSubmit,
        isSubmiting,
    }
}