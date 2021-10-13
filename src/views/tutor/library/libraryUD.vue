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
                <select :class="['form-control',invalid.tagInvalid]"  name="tag" v-model="tag_id">
                     <option v-for="(item, index) in tagsData"  :key="item['id_tag']"  :selected="item['id_tag'] === tag_id ? ' selected ' : '' "  :value="item['id_tag']">{{item['title_tag']}}</option>
                </select>
                <small v-if="tagError" class="form-text text-muted">Обязательное поле</small>
            </div>
            <input type="hidden" name="id_exercises" v-model="id_exercise">
            <button type="submit"  class="btn btn-primary" >Изменить</button>
            <button type="button"  class="btn btn-info" @click="showModal=false">Отменить</button>
        </form>
    </div>
    <app-loader v-if="loading"></app-loader>
    <div class="load-content" v-else>
        <button type="button" @click="refund" class="btn btn-success">Вернуться к списку </button>
        <button type="button" @click="showModal = true" class="btn btn-warning" >Изменить задание </button>
        <button type="button" @click="deleteTask" class="btn btn-danger">Удалить это задание </button>
        <div class="content-task" v-if="!showModal">
            <request-library-task :taskData="taskData" :path="route.params" ></request-library-task>
        </div>
    </div>
</div>
<transition  name="fade" appear>
    <div class="modal-overlay" v-if="showModal" @click="showModal=false">
    </div>
</transition>
</template>

    <script>

import AppLoader from "../../../components/ui/AppLoader";
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {useRouter} from 'vue-router'
import {requiredForm} from '../../../utils/requiredForm'
import {ref,computed,onMounted,watch} from 'vue'
import RequestLibraryTask from "../../../components/request/RequestLibraryTask";
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
        const tagsData = ref()
        const id_exercise = ref()
        const taskData = ref({})
        const showModal = ref(false)
        const titleError = ref()
        const tagError = ref()
        const tblA = ref([])
        let error = ref({})
        let errorSchemaRequired = {
            title: true,
            tag: true,
        }

        let invalid = ref({
            titleInvalid: '',
            tagInvalid: '',
        })

        onMounted(async() => {
            loading.value = true
            taskData.value = await store.dispatch('library/getTaskById',{token: localStorage.getItem('jwt-token'),
            id: route.params.id})
            tagsData.value = await store.dispatch('tag/getTag')
            title.value = taskData.value.title
            description.value = taskData.value.description
            tag_id.value = taskData.value['tag_id']
            link.value = taskData.value.link
            id_exercise.value = taskData.value['id']
            loading.value = false

        })

        const deleteTask = async() => {
            await store.dispatch('library/deleteTask', {token:localStorage.getItem('jwt-token'),id: route.params.id})
            await router.push('/library')
        }

        const onSubmit = async() => {
            requiredForm('input',errorSchemaRequired,error)
            requiredForm('select',errorSchemaRequired,error)
            tagError.value = error.value?.tag
            titleError.value = error.value?.title

            if(Object.keys(error.value).length === 0) {
                console.log('UPDATE')
                await store.dispatch('library/updateExercise',{token: localStorage.getItem('jwt-token'),values:{
                        title:title.value,
                        description:description.value,
                        tag:tag_id.value,
                        link:link.value,
                        id:id_exercise.value,
                    }})
                taskData.value = await store.dispatch('library/getTaskById',{token: localStorage.getItem('jwt-token'),
                    id: route.params.id})
                showModal.value = false
                await router.push(`/library/${id_exercise.value}`)
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
            tagsData,
            tag_id,
            error,
            tagError,
            titleError,
            deleteTask,
            open: () => showModal.value = true,
            refund: () => {
                router.push(`/library`)
            },
        }

    },
    components: {RequestLibraryTask, AppLoader}
}
</script>

<style scoped>
.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 98;
    background-color: rgba(0,0,0, 0.5);
}
.modal-form{
    position: fixed;
    top: 27%;
    left: 50%;
    transform: translate(-50%,-27%);
    z-index: 99;
    width: 60%;
    /*max-width:400px;*/
    background-color: #edeef0;
    padding: 60px 60px;
}

ul.iom-add {
    list-style-type: none;
}

.iom-add li {
    display: inline-block;
    padding: 10px;
    border: 1px solid gray;
    background-color: gray;
    color: #5d5d5d;
}

.iom-add li.active {
    color: #edeef0;
}
</style>