<template>
    <div class="col-9">
        <div class="modal-form" v-if="showModal">
            <form @submit.prevent="onSubmit" id="form">
                <div class="form-group">
                    <label for="title">Название задания</label>
                    <input type="text" :class="['form-control',invalid.titleInvalid]" v-model="title" name="title" id="title"  placeholder="Введите название задания">
                    <small v-if="titleError" class="form-text text-muted">Обязательное поле</small>
                </div>
                <div class="form-group">
                    <label for="description">Краткое описание:</label>
                    <textarea class="form-control" id="description" v-model="description"  name="description" placeholder="Здесь вы можете добавить краткое описание"></textarea>
                </div>
                <div class="form-group">
                    <label for="link">Ссылка на задание</label>
                    <input type="text" class="form-control" v-model="link" id="link" name="link" placeholder="Введите название задания">
                </div>
                <div class="form-group">
                    <label for="mentor">Автор</label>
                    <select  :class="['form-control',invalid.mentorInvalid]" name="mentor" id="mentor" v-model="mentor">
                        <option value="0">Вы</option>
                        <option v-for="(item, index) in mentorsData"  :key="item.id"  :selected="item.id === mentor ? ' selected ' : ''"  :value=item.id>{{item.firstname}}</option>
                    </select>
                    <small v-if="mentorError" class="form-text text-muted">Обязательное поле</small>
                </div>
                <div class="form-group">
                    <select :class="['form-control',invalid.tagInvalid]"  name="tag" v-model="tag_id">
                        <option value="1">Bur</option>
                        <option value="2">Poll</option>
                    </select>
                    <small v-if="tagError" class="form-text text-muted">Обязательное поле</small>
                </div>
                <input type="hidden" name="id_exercises" v-model="id_exercise">
                <div class="form-group">
                    <label for="term">Срок выполнения </label>
                    <input type="date" id="term" name="term" >
                </div>
                <button type="submit"  class="btn btn-primary" >Изменить</button>
                <button type="button"  class="btn btn-info" @click="showModal=false">Отменить</button>
            </form>
        </div>
        <app-loader v-if="loading"></app-loader>
        <request-task :taskData="taskData" :currentMentor="currentMentor"  :path="route.params" @click="open" ></request-task>
    </div>
</template>

<script>
    import RequestTask from "../../../components/request/RequestTask";
    import AppLoader from "../../../components/ui/AppLoader";
    import {useStore} from 'vuex'
    import {useRoute} from 'vue-router'
    import {useRouter} from 'vue-router'
    import {requiredForm} from '../../../utils/requiredForm'

    import {ref,computed,onMounted,watch} from 'vue'
    export default {
        setup() {
            const route = useRoute()
            const router = useRouter()
            const store = useStore()
            const loading = ref()
            const title = ref()
            const description = ref()
            const tag_id = ref()
            const term = ref()
            const link = ref()
            const mentor = ref()
            const mentorsData = ref()
            const currentMentor = ref()
            const id_exercise = ref()
            const taskData = ref({})
            const showModal = ref(false)
            const titleError = ref()
            const mentorError = ref()
            const tagError = ref()
            const tblA = ref([])
            let error = ref({})
            let errorSchemaRequired = {
                title: true,
                tag: true,
                mentor: true
            }

            let invalid = ref({
                titleInvalid: '',
                mentorInvalid: '',
                tagInvalid: '',
            })
            const validIdIom = async() => {
                await store.dispatch('iom/getIomId',route.params)
                await tblA.value.push(store.state['iom'].tblNames)
            }
            validIdIom()
            onMounted(async() => {
                loading.value = true
                taskData.value = await store.dispatch('iom/getTaskById',{param:route.params})
                mentorsData.value = await store.dispatch('iom/getMentor',{token: localStorage.getItem('jwt-token')})
                title.value = taskData.value.title
                description.value = taskData.value.description
                tag_id.value = taskData.value['tag_id']
                term.value = taskData.value.term
                mentor.value = taskData.value.mentor
                link.value = taskData.value.link
                id_exercise.value = taskData.value['id_exercises']
                loading.value = false
                console.log(taskData.value)
                if(Object.keys(mentorsData.value).length !== 0) {
                    mentorsData.value.forEach((person) =>{
                        if(person.id === taskData.value.mentor){
                            currentMentor.value = person.firstname
                        }
                    })
                }else{
                    currentMentor.value = 'Вы'
                }


            })

            const onSubmit = async() => {
                requiredForm('input',errorSchemaRequired,error)
                requiredForm('select',errorSchemaRequired,error)

                tagError.value = error.value?.tag
                titleError.value = error.value?.title
                mentorError.value = error.value?.mentor

                if(Object.keys(error.value).length === 0) {
                    await store.dispatch('iom/updateExercise',{tbl:tblA.value[0][0].subTypeTableIom,values:{
                                        title:title.value,
                                        description:description.value,
                                        mentor:mentor.value,
                                        tag:tag_id.value,
                                        term:term.value,
                                        link:link.value,
                                        id_exercise:id_exercise.value,
                                        iomId: route.params.id
                                    }})
                    taskData.value = await store.dispatch('iom/getTaskById',{param:route.params})
                                showModal.value = false
                                await router.push(`/iom/${route.params.id}/exercise/${route.params.task}`)
                }

                error.value = {}
            }
            document.title = "Просмотр задания"
            return{
                loading,
                taskData,
                route,
                showModal,
                id_exercise,
                onSubmit,
                invalid,
                title,
                description,
                link,
                mentor,
                mentorsData,
                currentMentor,
                tag_id,
                error,
                tagError,
                titleError,
                mentorError,
                open: () => showModal.value = true,
            }

        },
        components: {RequestTask, AppLoader}
    }
</script>

<style scoped>

</style>