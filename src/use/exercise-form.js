import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useRoute} from 'vue-router'
import {computed, ref} from "vue"
import router from "../router";

export function useExerciseForm(){

    const {handleSubmit,isSubmiting} = useForm({
        initialValues: {
            tag:1,
            author:1
        }
    })
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    let tbl = ref([])
    let exe = ref(store.state['iom'].exerciseData)

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


    const validIdIom = async() => {
        await store.dispatch('iom/getIomId',route.params)
        await tbl.value.push(store.state['iom'].tblNames)
    }
    validIdIom()



    const dataExercises = async() => {
        await store.dispatch('iom/getExerciseByIomId',route.params)
         exe.value = store.state['iom'].exerciseData
    }
    dataExercises()

    console.log(tag.value)
    const reset = () => {
        // ref.form.reset()
        console.log(ref)
    }
    const onSubmit = handleSubmit(async values => {
        try{
            values['iom'] = route.params
            await store.dispatch('iom/addExercise',{tbl:tbl.value[0][0].subTypeTableIom,values})

            dataExercises()
            reset()
            await router.push(`/iom/${route.params.id}/exercise`)
        }catch (e) {

        }
    })

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
        // exe: computed(() => store.state['iom'].exerciseData),
        exe,
    }
}