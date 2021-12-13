<template>
    <div class="col-3">
        <TutorMainMenu></TutorMainMenu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <div class="modal-form" v-if="showModal">
                <form @submit.prevent="onSubmit" id="form">
                    <div class="form-group">
                        <label for="title">Название задания</label>
                        <input type="text" :class="['form-control',invalid.titleInvalid]" v-model="title" name="title" id="title"  placeholder="Введите название задания">
                        <small v-if="titleError" class="form-text text-muted">Обязательное поле</small>
                    </div>
                    <div class="form-group">
                        <label>Краткое описание <i style="font-size: .8em">(необязательное поле)</i></label>
                        <ckeditor :editor="editor" v-model="description" :config="editorConfig"></ckeditor>
                    </div>
                    <div class="form-group">
                         <label for="link">Ссылка на задание <i style="font-size: .8em">(необязательное поле)</i></label>
                        <input type="text" class="form-control" v-model="link" id="link" name="link" placeholder="Ссылка">
                    </div>

                    <div class="form-group">
                        <select :class="['form-control',invalid.tagInvalid]"  name="tag" v-model="tag_id">
                             <option v-for="(item, index) in tagsData"  :key="item['id_tag']"  :selected="item['id_tag'] === tag_id ? ' selected ' : '' "  :value="item['id_tag']">{{item['title_tag']}}</option>
                        </select>
                        <small v-if="tagError" class="form-text text-muted">Обязательное поле</small>
                    </div>

                    <div class="form-group">
                        <select class="form-control"  name="tag" v-model="level_id">
                             <option v-for="(item, index) in levels"  :key="item['id']"  :value="item['id']">{{item['title']}}</option>
                        </select>
                        <small v-if="levelError" class="form-text text-muted">Обязательное поле</small>
                    </div>

                    <input type="hidden" name="id_exercises" v-model="id_exercise">
                    <div class="row">
                        <div class="col-6">
                            <button type="submit"  class="btn btn-block btn-outline-primary-send" >Изменить</button>
                        </div>
                        <div class="col-6">
                            <button type="button"  class="btn btn-block  btn-outline-secondary" @click="showModal=false">Отменить</button>
                        </div>
                    </div>
                </form>
            </div>
            <app-loader v-if="loading"></app-loader>
            <div class="load-content" v-else>
                <div class="row">
                    <div class="col-4">
                        <button type="button" @click="refund" class="btn btn-outline-iom btn-block">
                            <span style="padding-right:.4rem">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                     <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                 </svg>
                            </span>
                            Вернуться к списку
                        </button>
                    </div>
                    <div class="col-4">
                        <button type="button" @click="showModal = true" class="btn btn-outline-iom btn-block" >
                            <span style="padding-right:.4rem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            </span>
                            Изменить задание
                        </button>
                    </div>
                    <div class="col-4">
                        <button type="button" @click="deleteTask" class="btn btn-outline-iom-del btn-block">
                            <span style="padding-right:.4rem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shield-x" viewBox="0 0 16 16">
                              <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                              <path d="M6.146 5.146a.5.5 0 0 1 .708 0L8 6.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 7l1.147 1.146a.5.5 0 0 1-.708.708L8 7.707 6.854 8.854a.5.5 0 1 1-.708-.708L7.293 7 6.146 5.854a.5.5 0 0 1 0-.708z"/>
                            </svg>
                            </span>
                            Удалить это задание </button>
                    </div>
                </div>

                <div class="content-task" v-if="!showModal">
                    <request-library-task :taskData="taskData" :path="route.params" ></request-library-task>
                </div>
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
import TutorMainMenu from "../../../components/tutorMenu/TutorMainMenu";
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {useRouter} from 'vue-router'
import {requiredForm} from '../../../utils/requiredForm'
import {ref,computed,onMounted,watch} from 'vue'
import RequestLibraryTask from "../../../components/request/RequestLibraryTask";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {mysqlEscape} from '../../../utils/mysqlEscape'
export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        const loading = ref()
        const title = ref()
        const description = ref()
        const tag_id = ref()
        const levels = ref()
        const level_id = ref()
        const term = ref()
        const link = ref()
        const mentor = ref()
        const tagsData = ref()
        const id_exercise = ref()
        const taskData = ref({})
        const showModal = ref(false)
        const titleError = ref()
        const level = ref()
        const tagError = ref()
        const levelError = ref()
        const tblA = ref([])
        let error = ref({})
        const editor =  ClassicEditor
        const editorConfig = {
            removePlugins: ["EasyImage","ImageUpload","MediaEmbed"]
        }
        let errorSchemaRequired = {
            title: true,
            tag: true,
            level_id: true
        }

        let invalid = ref({
            titleInvalid: '',
            tagInvalid: '',
            levelError: '',
        })

        onMounted(async() => {
            loading.value = true
            taskData.value = await store.dispatch('library/getTaskById',{token: localStorage.getItem('jwt-token'),
            id: route.params.id})
            tagsData.value = await store.dispatch('tag/getTag')
            levels.value = await store.dispatch('discipline/getLevels')
            title.value = taskData.value.title
            description.value = taskData.value.description
            tag_id.value = taskData.value['tag_id']
            link.value = taskData.value.link
            level.value = taskData.value['level_title']
            level_id.value = taskData.value['level_id']
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
            levelError.value = error.value?.level_id

            if(Object.keys(error.value).length === 0) {
                console.log('UPDATE')
                await store.dispatch('library/updateExercise',{token: localStorage.getItem('jwt-token'),values:{
                        title:title.value,
                        description:mysqlEscape(description.value),
                        tag:tag_id.value,
                        link:link.value,
                        id:id_exercise.value,
                        level:level_id.value,
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
            levels,
            level_id,
            invalid,
            levelError,
            level,
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
            editor,
            editorConfig
        }

    },
    components: {RequestLibraryTask, AppLoader, TutorMainMenu}
}
</script>

<style scoped>

    .btn-outline-iom{
        color: #4571a3;
        border-color: #4571a3;
    }
    .btn-outline-iom-del{
        color: tomato;
        border-color: tomato;
    }
    .btn-outline-iom:hover {
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }
    .btn-outline-iom-del:hover {
        color: #fff;
        background-color: tomato;
        border-color: tomato;
    }

    .title-page {
        color: #4571a3;
    }

    .btn-outline-primary-send{
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }

    .content-wallpaper, .tutor-left-main-menu {
        margin-top: 1.5rem;
        background-color: white;
        color: #5d5d5d;
    }
    .content-wallpaper-margin {
        background-color: white;
        color: #5d5d5d;
        padding: 25px;
    }

    .content-wallpaper {
        padding: 25px;
    }

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