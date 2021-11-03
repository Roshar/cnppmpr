<template>
    <div class="col-3">
        <TutorMainMenu></TutorMainMenu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <h4 class="title-page">Карта индивидуального образовательного маршрута </h4>
            <hr>
            <div class="row">
                <div class="col-3">
                    <button type="button" class="btn  btn-outline-iom btn-block" @click="showModal = true">
                        <span style="padding-right:.4rem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </span>
                        Создать задание
                    </button>
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-iom btn-block" @click="getLibrary">
                        <span style="padding-right:.4rem">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                        <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        </span>
                        Моя библиотека
                    </button>
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-iom btn-block" @click="getLibraryGlobal">
                        <span style="padding-right:.4rem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
                              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                            </svg>
                        </span>
                        Глобальная библиотека
                    </button>
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-outline-iom-del btn-block" @click="showModalDelete=true" >
                        <span style="padding-right:.4rem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shield-x" viewBox="0 0 16 16">
                              <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                              <path d="M6.146 5.146a.5.5 0 0 1 .708 0L8 6.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 7l1.147 1.146a.5.5 0 0 1-.708.708L8 7.707 6.854 8.854a.5.5 0 1 1-.708-.708L7.293 7 6.146 5.854a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </span>
                        Удалить ИОМ!
                    </button>
                </div>
            </div>
            <hr>

            <h5 class="subtitle-page">Поисковик</h5>

            <request-library-data v-model="filterLib" :show-modal-lib="showModalLib"
                                  :execLib="execLib"
                                  :title="title"
                                  :tags-data="tagsData"
                                  @closeLib="showModalLib = false"></request-library-data>

            <request-library-data-global v-model="filterLibGlobal" :show-modal-lib-global="showModalLibGlobal"
                                  :execLibGlobal="execLibGlobal"
                                  :tags-data="tagsData"
                                  @closeLib="showModalLibGlobal = false"></request-library-data-global>

            <div class="modal-form" v-if="showModal">
                <div class="content-wallpaper-margin">
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
                        <label for="link">Автор</label>
                        <select :class="['form-control',{invalid:mentorError}]" name="author" v-model="mentor">
                            <option value=0>Вы</option>
                            <option v-if="mentorsData" v-for="(item, index) in mentorsData"  :key="item.id"  :selected="item.id === mentor ? ' selected ' : ''"  :value=item.id>{{item.firstname}}</option>
                        </select>
                        <small v-if="mentorError">{{mentorError}}</small>
                    </div>
                    <div class="form-group">
                        <label for="link">Тип задания</label>
                        <select :class="['form-control',{invalid:tagError}]"  name="tag" v-model="tag">
                            <option v-for="(item, index) in tagsData"  :key="item['id_tag']"   :value="item['id_tag']">{{item['title_tag']}}</option>
                            <small v-if="tagError">{{tagError}}</small>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="term">Срок выполнения </label>
                        <br>
                        <span> <i>Если дата будет указана раньше текущей, срок выполнения будет сохранен как "бессрочно" </i> </span>
                        <input type="date" class="form-control" id="term" name="term" v-model="term">
                        <small v-if="termError">{{termError}}</small>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <button type="submit"  class="btn  btn-block btn-outline-primary-send"  :disabled="isSubmiting">Добавить задание в ИОМ</button>
                        </div>
                        <div class="col-6">
                            <button type="button"  class="btn btn-block btn-outline-secondary" @click="showModal=false">Отменить</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>

            <div class="modal-form2" v-if="showModalDelete">
                <div class="modal-dialog modal-confirm">
                    <div class="modal-content">
                        <div class="modal-header flex-column">
                            <div class="icon-box">
                                <i class="material-icons"><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-cloud-lightning-rain" viewBox="0 0 16 16">
                                    <path d="M2.658 11.026a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm-7.5 1.5a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm-.753-8.499a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973zM8.5 1a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1zM7.053 11.276A.5.5 0 0 1 7.5 11h1a.5.5 0 0 1 .474.658l-.28.842H9.5a.5.5 0 0 1 .39.812l-2 2.5a.5.5 0 0 1-.875-.433L7.36 14H6.5a.5.5 0 0 1-.447-.724l1-2z"/>
                                </svg></i>
                            </div>
                            <h4 class="modal-title w-100">Вы уверены?</h4>
                            <button type="button" class="close"  @click="showModalDelete=false" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p> При нажатии красной кнопки, будет отправлен запрос на удаление текущего индивидуального образовательного маршрута (ИОМ). После подтверждения администраторами портала, ваш ИОМ будет удален </p>
                        </div>
                        <div class="modal-body">
                            <p> <span style="color: tomato"> <strong>Важно!</strong></span>  После удаления индивидуального образовательного маршрута вы не сможете вернуть данные. </p>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-secondary"  @click="showModalDelete=false" data-dismiss="modal">Одуматься</button>
                            <button type="button" @click="deleteIom" class="btn btn-danger">А, черт! Удаляем</button>
                        </div>
                    </div>
                </div>
            </div>

            <request-filter v-model="filter" :tags-data="tagsData" ></request-filter>

            <app-loader v-if="loading"></app-loader>

            <div class="exercise-content" v-else>
            <div class="row">
                <exercise-tbl :exeData="exeData"></exercise-tbl>
            </div>
            </div>
        </div>
    </div>
    <transition  name="fade" appear>
        <div class="modal-overlay" v-if="showModal || showModalLib || showModalLibGlobal || showModalDelete" @click="showModalOption"></div>
    </transition>

</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
    import {ref,computed,onMounted,watch} from 'vue'
    import TutorMainMenu from "../../../components/tutorMenu/TutorMainMenu";
    import ExerciseTbl from "../../../components/request/RequestExerciseTbl";
    import RequestLibraryData from "../../../components/request/RequestLibraryData";
    import RequestLibraryDataGlobal from "../../../components/request/RequestLibraryDataGlobal";
    import AppLoader from "../../../components/ui/AppLoader";
    import RequestFilter from "../../../components/request/RequestFilter";
    import {useExerciseForm} from "../../../use/exercise-form";
    import {useStore} from 'vuex'
    import {useRouter} from "vue-router";
    import {useRoute} from 'vue-router'
    import {checkPossibilityDeleteIom} from "../../../api/checkPossibilityDeleteData";
    export default {
        setup() {
            const store = useStore()
            const route = useRoute()
            const router = useRouter()
            const loading = ref(true)
            const tblA = ref([])
            const showModal = ref(false)
            const showModalLib = ref(false)
            const showModalLibGlobal = ref(false)
            const showModalDelete = ref(false)
            const filter = ref({})
            const mentorsData = ref()
            const tagsData = ref()
            const filterLib = ref({})
            const filterLibGlobal = ref({})
            const termNot = ref(false)

            const editor =  ClassicEditor
            const editorConfig = {
                removePlugins: ["EasyImage","ImageUpload","MediaEmbed"]
                    }


            // Проверка текущего ИОМ : TRUE|FALSE
            // Получить все таблицы тьютора | Array
            const validIdIom = async() => {
                await store.dispatch('iom/getIomId',route.params)
                await tblA.value.push(store.state['iom'].tblNames)
            }
            validIdIom()

            const showModalOption = () => {
                showModal.value = false
                showModalLib.value = false
                showModalLibGlobal.value = false
            }

            const getLibraryGlobal = async() => {
                showModalLibGlobal.value = true
            }

            const getLibrary = async() => {
                showModalLib.value = true
            }

            onMounted(async()=>{
                loading.value = true
                await store.dispatch('iom/getExercisesByIomId',route.params)
                await store.dispatch('library/getLibraryData',{token: localStorage.getItem('jwt-token')})
                await store.dispatch('globalLibrary/getLibraryDataByTutorDiscipline',
                    {token: localStorage.getItem('jwt-token')})

                mentorsData.value = await store.dispatch('iom/getMentor',{token: localStorage.getItem('jwt-token')})
                tagsData.value = await store.dispatch('tag/getTag')
                loading.value = false
            })

            //Фильтрация: НАЗВАНИЕ|КАТЕГОРИЯ
            const exeData = computed(() => store.getters['iom/getExercisesByIomId']
                .filter(data => (filter.value.title) ? data.title.includes(filter.value.title) : data)
                .filter(data => (filter.value.tag) ? filter.value.tag == data['tag_id'] : data))

            let execLib = computed(() => store.getters['library/getLibraryData']
                .filter(data => (filterLib.value.title) ? data.title.includes(filterLib.value.title) : data)
                .filter(data => (filterLib.value.tag) ? filterLib.value.tag == data['tag_id'] : data))

           const execLibGlobal = computed(() => store.getters['globalLibrary/getLibraryData']
               .filter(data => (filterLibGlobal.value.tag) ? filterLibGlobal.value.tag == data['tag_id'] : data))


            //запрос на удаления

            const getConfirmDelete = () => {

            }


           // Удалить текущий ИОМ
            const deleteIom = async() => {
                await checkPossibilityDeleteIom(store,{
                    token: localStorage.getItem('jwt-token'),
                    param:route.params,
                    tbl:{
                        subTypeTableIom:tblA.value[0][0].subTypeTableIom,
                        report:tblA.value[0][0].report,
                        student:tblA.value[0][0].student,
                    },
                    userId: localStorage.getItem('USERID')
                })
                await router.push(`/iom/${route.params.id}/exercise/`)
            }

            // Задания из текущего ИОМа
            const submit = async function (values)  {
                values['iomId'] = route.params.id
                await store.dispatch('iom/addExercise',{tbl:tblA.value[0][0].subTypeTableIom,values})
                await store.dispatch('iom/getExercisesByIomId',route.params)
                showModal.value = false
                await router.push(`/iom/${route.params.id}/exercise`)
            }
            document.title = "Менеджер индивидуальных образовательных маршрутов"
            return {
                ...useExerciseForm(submit),
                showModal,
                close: () => showModal.value = false,
                showModalLib,
                exeData,
                loading,
                deleteIom,
                filter,
                getLibrary,
                getLibraryGlobal,
                execLib,
                execLibGlobal,
                filterLib,
                filterLibGlobal,
                mentorsData,
                tagsData,
                showModalOption,
                showModalLibGlobal,
                getConfirmDelete,
                showModalDelete,

                editor,
                editorConfig

            }
        },
        components: {ExerciseTbl,
                        AppLoader,
                         RequestFilter,
                            RequestLibraryData,
                                RequestLibraryDataGlobal,
                                    TutorMainMenu,
                                      }
    }
</script>

<style scoped >

    .modal-dialog {
        padding: 0;
        margin: 0;
    }
    .modal-confirm .icon-box {
        width: 80px;
        height: 80px;
        margin: 0 auto;
        z-index: 9;
        text-align: center;
        border: none
    }
    .modal-confirm .icon-box svg {
        color: #f15e5e;
        font-size: 46px;
        display: inline-block;
        margin-top: 13px;
    }
    .modal-confirm .btn, .modal-confirm .btn:active {
        color: #fff;
        border-radius: 4px;
        background: #60c7c1;
        text-decoration: none;
        transition: all 0.4s;
        line-height: normal;
        min-width: 120px;
        border: none;
        min-height: 40px;
        border-radius: 3px;
        margin: 0 5px;
    }
    .modal-confirm .btn-secondary {
        background: #c1c1c1;
    }
    .modal-confirm .btn-secondary:hover, .modal-confirm .btn-secondary:focus {
        background: #a8a8a8;
    }
    .modal-confirm .btn-danger {
        background: #f15e5e;
    }
    .modal-confirm .btn-danger:hover, .modal-confirm .btn-danger:focus {
        background: #ee3535;
    }
    .modal-confirm .close {
        position: absolute;
        top: 15px;
        right: 12px;
    }
    .modal-confirm h4 {
        text-align: center;
        font-size: 26px;
        margin: 30px 0 -10px;
    }



    .title-page {
        color: #4571a3;
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

    .modal-overlay,.modal-overlay2 {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 98;
        background-color: rgba(0,0,0, 0.5);
    }

    .modal-form2{
        position: fixed;
        top: 27%;
        left: 50%;
        transform: translate(-50%,-27%);
        z-index: 99;
        /*max-width:400px;*/
        background-color: #edeef0;
    }

    .btn-outline-primary-send{
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }

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

    .modal-form{
        position: fixed;
        top: 27%;
        left: 50%;
        transform: translate(-50%,-27%);
        z-index: 99;
        width: 60%;
        /*max-width:400px;*/
        background-color: #edeef0;
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