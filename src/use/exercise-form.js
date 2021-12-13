import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

export function useExerciseForm(fn){


    const {handleSubmit,isSubmiting} = useForm({
        initialValues: {
            tag:'',
            author:0,
            level:''
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
    const {value:mentor, errorMessage: mentorError, handleBlur:mentorBlur} = useField(
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
            .required('Обязательное поле')
    )

    const {value:level, errorMessage: liError, handleBlur: liBlur} = useField(
        'level',
        yup
            .string()
            .trim()
            .required('Обязательное поле')
    )

    const onSubmit = handleSubmit(fn)

    return {
        title,
        description,
        level,
        link,
        term,
        tag,
        mentor,
        titleError,
        descriptionError,
        linkError,
        liBlur,
        liError,
        mentorError,
        termError,
        tagError,
        titleBlur,
        descriptionBlur,
        linkBlur,
        termBlur,
        tagBlur,
        mentorBlur,
        onSubmit,
        isSubmiting,
    }
}