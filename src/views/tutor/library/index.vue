<template>
    <div class="col-3">
        <TutorMainMenu></TutorMainMenu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <div class="row">
                <div class="col-8">
                    <h4 class="title-page">Библиотека заданий</h4>
                </div>
                <div class="col-4">
                    <button type="button" @click="showModal = true" class="btn btn-outline-iom btn-block" >
                            <span style="padding-right:.4rem">
                       <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                            </span>
                        Добавить задание в библиотеку </button>
                </div>
            </div>
            <hr>

            <div class="modal-form" v-if="showModal">
                <form @submit.prevent="onSubmit" id="form">
                    <div class="form-group">
                        <label for="title">Название задания</label>
                        <input type="text" :class="['form-control',{invalid:titleError}]" v-model="title"  id="title"  placeholder="Введите название задания">
                        <small v-if="titleError">{{titleError}}</small>
                    </div>
                    <div class="form-group">
                        <label >Краткое описание <i style="font-size: .8em">(необязательное поле)</i></label>
                        <ckeditor :editor="editor" v-model="description" :config="editorConfig"></ckeditor>
                        <small v-if="descriptionError">{{descriptionError}}</small>
                    </div>
                    <div class="form-group">
                        <label for="link">Ссылка на задание <i style="font-size: .8em">(необязательное поле)</i></label>
                        <input type="text" :class="['form-control',{invalid:linkError}]" v-model="link" id="link" name="link" placeholder="Вставьте ссылку">
                        <small v-if="linkError">{{linkError}}</small>
                    </div>
                    <div class="form-group">
                        <label for="link">Тип задания</label>
                        <select :class="['form-control',{invalid:catError}]"  name="tag" v-model="category">
                            <option v-for="(item, index) in tagsData"  :key="item['id_tag']"   :value="item['id_tag']">{{item['title_tag']}}</option>
                            <small v-if="catError">{{catError}}</small>
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <button type="submit"  class="btn  btn-block btn-outline-primary-send"  :disabled="isSubmiting">Добавить задание в библиотеку</button>
                        </div>
                        <div class="col-6">
                            <button type="button"  class="btn btn-block btn-outline-secondary" @click="showModal=false">Отменить</button>
                        </div>
                    </div>
                </form>
            </div>
            <request-filter  v-model="filter" :tags-data="tagsData" ></request-filter>
            <app-loader v-if="loading"></app-loader>
            <div class="exercise-content" v-else>
                <div class="row">
                    <library-list :libraryData="libraryData"></library-list>
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
     import {ref,computed,onMounted,watch} from 'vue'
     import TutorMainMenu from "../../../components/tutorMenu/TutorMainMenu";
     import LibraryList from "../../../components/request/RequestLibrary";
     import AppLoader from "../../../components/ui/AppLoader";
     import RequestFilter from "../../../components/request/RequestFilter";
     import {useLibraryForm} from "../../../use/library-form";
     import {useStore} from 'vuex'
     import {useRouter} from "vue-router";
     import {useRoute} from 'vue-router'
     import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
     import {mysqlEscape} from '../../../utils/mysqlEscape'

     export default {
         setup() {
             const store = useStore()
             const route = useRoute()
             const router = useRouter()
             const loading = ref(true)
             const showModal = ref(false)
             const filter = ref({})
             const tagsData = ref()
             const description = ref()

             const editor =  ClassicEditor
             const editorConfig = {
                 removePlugins: ["EasyImage","ImageUpload","MediaEmbed"]
             }

             onMounted(async()=>{
                 loading.value = true
                 await store.dispatch('library/getLibraryData',{token: localStorage.getItem('jwt-token')})
                 tagsData.value = await store.dispatch('tag/getTag')
                 loading.value = false
             })


            // Фильтрация: НАЗВАНИЕ|КАТЕГОРИЯ
             const libraryData = computed(() => store.getters['library/getLibraryData']
                 .filter(data => (filter.value.title) ? data.title.includes(filter.value.title) : data)
                 .filter(data => (filter.value.tag) ? filter.value.tag == data['tag_id'] : data))


             //Задания из текущего ИОМа
             const submit = async function (values)  {
                 values.description = mysqlEscape(description.value)
                 await store.dispatch('library/addExercise',{
                     token: localStorage.getItem('jwt-token'),
                     values})
                 await store.dispatch('library/getLibraryData',{token: localStorage.getItem('jwt-token')})
                 showModal.value = false
                 await router.push(`/library`)
             }

             document.title = "Библиотека заданий"
             return {...useLibraryForm(submit),showModal,close: () => showModal.value = false, description, libraryData, loading, filter, tagsData,editor, editorConfig}
         },
         components: {LibraryList,AppLoader,RequestFilter,TutorMainMenu}
     }
</script>

<style scoped>

    .btn-outline-iom{
        color: #fff;
        border-color: #4571a3;
        background-color: #4571a3;
    }
    .btn-outline-iom-del{
        color: tomato;
        border-color: tomato;
    }
    /*.btn-outline-iom:hover {*/
    /*    color: #fff;*/
    /*    background-color: #4571a3;*/
    /*    border-color: #4571a3;*/
    /*}*/
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