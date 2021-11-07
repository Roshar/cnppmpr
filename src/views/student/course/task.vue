<template>
    <div class="col-8">
        <app-loader v-if="loading"></app-loader>
        <div class="content-loader" v-else>
            <div class="modal-form" v-if="showModal">
                <div class="content-wallpaper pad">
                    <form  id="form" enctype="multipart/form-data">
                        <div class="row">
                            <div class="col-12">
                        <span style="float:right" @click="showModal=false"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                              <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                              </svg>
                        </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="message_element">Отчет в текстовом формате</label>
                            <textarea class="form-control"   cols="100" rows="14" id="description" v-model="reportMessage"  name="message" placeholder="Добавьте текст"></textarea>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label class="message_element">Отчет в виде ссылки </label>
                                    <input type="text" class="form-control" name="link" v-model="reportLink" placeholder="Вставьте сюда ссылку">
                                </div>
                            </div>
                            <div class="col-6">
                                <label class="message_element">Отчет в формате документа </label>
                                <label class="file">
                                    <input type="file"  @change="onFileSelected" id="file" aria-label="File browser example">
                                    <span class="file-custom"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <button type="button"  class="btn btn-block btn-outline-primary-send" @click="sendMessage()">Отправить отчет</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-outline-secondary btn-block" @click="showModal=false"> Вернуться к заданию</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="content-wallpaper" v-else>
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
                        <button type="button" @click="showModal = true" class="btn btn-outline-iom-del btn-block" >
                            <span style="padding-right:.4rem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            </span>
                            Добавить отчет о выполнении
                        </button>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <span style="font-style: italic;">Наименование: </span><h5 class="card-title">{{title}}</h5>
                        <span style="font-style: italic;">Описание: </span> <div v-html="description"></div>
                        <br>
                        <span style="font-style: italic;">Автор:  </span><p class="card-text">{{currentMentor(author)}}</p>
                        <span style="font-style: italic;">Ссылка: </span><p class="card-text">{{link}}</p>
                        <span style="font-style: italic;">Категория: </span><p class="card-text">{{category}}</p>
                        <span style="font-style: italic;">Срок выполнения: </span><p class="card-text">{{checkTerm(term, term)}}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="col-4">
        <conversation-task></conversation-task>
    </div>
    <transition  name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="showModal = false">
        </div>
    </transition>


</template>

<script>
    import {useStore} from "vuex";
    import {useRouter, useRoute} from 'vue-router'
    import {ref,onMounted} from 'vue'
    import AppLoader from "../../../components/ui/AppLoader";
    import StudentMainMenu from "../../../components/studentMenu/StudentMainMenu";
    import ConversationTask from "../../../components/conversation/ConversationTask";
    import {checkTerm} from '../../../utils/checkTerm'
    import uniqid from "uniqid";
    export default {

        setup() {
            const taskData = ref()
            const title = ref()
            const description = ref()
            const link = ref()
            const category = ref()
            const showModal = ref(false)
            const author = ref()
            const term = ref()
            const tag_id = ref()
            const iomId = ref()
            const taskId = ref()
            const reportLink = ref()
            const reportMessage = ref()
            const router = useRouter()
            const route = useRoute()
            const store = useStore()
            const loading = ref(true)
            const uploadData = ref('')

            const currentMentor = (author) => {
                if(author === 0) {
                    return 'Тьютор'
                }else {
                    // TODO получить имя НАСТАВНИКА
                }
            }

            const refund = () => {
                router.push('/my_course')
            }
            const onFileSelected = (event) => {
                uploadData.value = event.target.files[0]
            }
            const sendMessage = async() => {
                if(reportLink.value !== '' || reportMessage.value !== '' || uploadData.value !== '' ){
                    if(!uploadData.value) {
                        await store.dispatch('student/insertInReportWithoutFile', {
                            link: reportLink.value,
                            content: reportMessage.value,
                            iomId: iomId.value,
                            taskId: taskId.value,
                            category: tag_id.value,
                            token: localStorage.getItem('jwt-token')
                        })
                    }else {
                        // const ff = new FormData()
                        // const uniqName = uniqid()
                        // ff.append('file', uploadData.value, uniqName)
                        // ff.append('user', localStorage.getItem('jwt-token') )
                    }


                    // await store.dispatch('user/changeAvatar',ff)
                    // await load()
                    // await router.push('/')
                    // showModal.value = false
                }

            }

            onMounted(async()=>{
                loading.value = true
                taskData.value = await store.dispatch('student/getMyTaskById',{
                    taskId: route.params.taskId,
                    iomId: route.params.iomId,
                    token: localStorage.getItem('jwt-token')
                })
                title.value = taskData.value.title
                description.value = taskData.value.description
                link.value = taskData.value.link
                term.value = taskData.value.term
                category.value = taskData.value.title_tag
                tag_id.value = taskData.value.tag_id
                iomId.value = taskData.value.iom_id
                taskId.value = taskData.value.id_exercises
                author.value = taskData.value.mentor
                loading.value = false
            })

            return {
                taskData, title,loading, description,showModal, link, term, author, reportMessage, reportLink, category, onFileSelected, sendMessage, checkTerm, currentMentor,refund
            }
        },
        components:{StudentMainMenu,AppLoader, ConversationTask}
    }
</script>

<style scoped>


    .pad {
        padding: 20px 40px;
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

    .btn-outline-primary-send{
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }
    .btn-outline-primary:hover {
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }
    .btn-outline-iom-del:hover {
        color: #fff;
        background-color: tomato;
        border-color: tomato;
    }
    .content-wallpaper, .tutor-left-main-menu {
        margin-top: 1.5rem;
        background-color: white;
        color: #5d5d5d;
    }
</style>