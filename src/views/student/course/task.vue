<template>
    <div class="col-7">
        <app-loader v-if="loading"></app-loader>
        <div class="content-loader" v-else>
            <div class="modal-form" v-if="showModal && accepted !==1 ">
                <div class="content-wallpaper pad">
                    <form  id="form" method="POST" enctype="multipart/form-data">
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
                            <ckeditor :editor="editor" v-model="reportMessage" :config="editorConfig"></ckeditor>
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
                                    <input type="file"  @change="onFileSelected" name="answer" id="file" aria-label="File browser example">
                                    <span class="file-custom"></span>
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div v-if="accepted === null">
                                    <button type="button"  class="btn btn-block btn-outline-primary-send" @click="sendMessage()">Отправить отчет</button>
                                </div>
                                <div v-if="accepted === 2">
                                    <input type="hidden" v-model="reportId">
                                    <button type="button"  class="btn btn-block btn-outline-primary-send" @click="updateMessage()">Отправить изменения</button>
                                </div>

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
                        <div v-if="accepted === null">
                            <button type="button" @click="showModal = true" class="btn btn-outline-iom-del btn-block">
                            <span style="padding-right:.4rem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            </span>
                                Добавить отчет о выполнении
                            </button>
                        </div>
                        <div v-if="accepted === 2">
                            <button type="button" @click="showModal = true" class="btn btn-outline-iom-del btn-block">
                            <span style="padding-right:.4rem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            </span>
                                Внести изменения в ответ
                            </button>
                        </div>

                    </div>
                </div>
                <div class="row" v-if="accepted===1">
                    <div class="col-12 ">
                        <div class="success">
                            <h5>Это задание было успешно выполнено</h5>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="carg-body">
                        <div class="bg-comment" v-if="tutorComment">
                            <h6>Комментрий тьютора к ответу:</h6>
                            <p v-html="tutorComment"></p>
                        </div>
                    </div>
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
    <div class="col-5">
        <conversation-task  v-if="chat" :chat="chat" :studentId="studentId" :tutorId="tutorId"></conversation-task>
    </div>

    <transition  name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="showModal = false">
        </div>
    </transition>
    
</template>

<script>
    import {useStore} from "vuex";
    import {useRouter, useRoute} from 'vue-router'
    import {ref,onMounted, watch} from 'vue'
    import AppLoader from "../../../components/ui/AppLoader";
    import StudentMainMenu from "../../../components/studentMenu/StudentMainMenu";
    import ConversationTask from "../../../components/conversation/ConversationTaskStudent";
    import {checkTerm} from '../../../utils/checkTerm'
    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
    import {mysqlEscape} from '../../../utils/mysqlEscape'
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
            const accepted = ref()
            const tutorComment = ref()
            const chat = ref()
            const reportId = ref()
            const reportMessage = ref()
            const router = useRouter()
            const route = useRoute()
            const store = useStore()
            const tutorId = ref(route.params.tutorId)
            const studentId = ref()
            const loading = ref(true)
            const uploadData = ref('')
            const editor =  ClassicEditor
            const editorConfig = {
                toolbar: {
                    items: [
                        'heading', '|',
                        'alignment', '|',
                        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                        'link', '|',
                        'bulletedList', 'numberedList', 'todoList',
                        'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
                        'code', 'codeBlock', '|',
                        'insertTable', '|',
                        'outdent', 'indent', '|',
                        'blockQuote', '|',
                        'undo', 'redo'
                    ],
                    shouldNotGroupWhenFull: true
                }
            }

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
                console.log(event.target.files[0])
            }


            onMounted(async()=>{
                loading.value = true
                taskData.value = await store.dispatch('student/getMyTaskById',{
                    taskId: route.params.taskId,
                    iomId: route.params.iomId,
                    token: localStorage.getItem('jwt-token')
                })
                chat.value = await store.dispatch('student/getCommentsByTask', {
                    taskId: route.params.taskId,
                    iomId: route.params.iomId,
                    tutorId: route.params.tutorId,
                    token: localStorage.getItem('jwt-token')
                })
                studentId.value = taskData.value.studentId



                if(chat.value && chat.value.length) {
                    studentId.value = chat.value[0]['studentId']
                }


                accepted.value = taskData.value.accepted
                tutorComment.value = taskData.value['tutor_comment']
                title.value = taskData.value.title
                description.value = taskData.value.description
                link.value = taskData.value.link
                term.value = taskData.value.term
                category.value = taskData.value['title_tag']
                tag_id.value = taskData.value.tag_id
                iomId.value = taskData.value.iom_id
                taskId.value = taskData.value['id_exercises']
                author.value = taskData.value.mentor
                if(accepted.value === 2){
                    reportMessage.value =taskData.value.content
                    reportLink.value =taskData.value['report_link']
                    reportId.value =taskData.value['report_id']
                }

                loading.value = false
            })


            const sendMessage = async() => {
                loading.value = true
                if(reportLink.value !== '' || reportMessage.value !== '' || uploadData.value !== '' ){
                    if(reportMessage.value && reportMessage.value.length > 2 ) {
                        reportMessage.value = mysqlEscape(reportMessage.value)
                    }
                    if(uploadData.value) {

                        const ff = new FormData()
                        ff.append('answer', uploadData.value, studentId.value)
                        ff.append('link', reportLink.value)
                        ff.append('content', reportMessage.value)
                        ff.append('category', tag_id.value)
                        ff.append('iomId', iomId.value)
                        ff.append('taskId', taskId.value)
                        ff.append('token', localStorage.getItem('jwt-token'))
                        await store.dispatch('student/insertInReportWithFile', ff)
                        loading.value = false
                        await router.push('/my_course')
                    }else {
                        await store.dispatch('student/insertInReportWithoutFile', {
                            link: reportLink.value,
                            content: reportMessage.value,
                            iomId: iomId.value,
                            taskId: taskId.value,
                            category: tag_id.value,
                            token: localStorage.getItem('jwt-token'),
                            files: null
                        })
                        loading.value = true
                        await router.push('/my_course')
                    }

                }

            }

            const updateMessage = async() => {
                if(reportLink.value !== '' || reportMessage.value !== '' || uploadData.value !== '' ){
                    if(reportMessage.value !== '') {
                        reportMessage.value = mysqlEscape(reportMessage.value)
                    }
                    if(uploadData.value) {
                        const ff = new FormData()
                        ff.append('answer', uploadData.value, studentId.value)
                        ff.append('link', reportLink.value)
                        ff.append('content', reportMessage.value)
                        ff.append('category', tag_id.value)
                        ff.append('iomId', iomId.value)
                        ff.append('reportId', reportId.value)
                        ff.append('taskId', taskId.value)
                        ff.append('token', localStorage.getItem('jwt-token'))
                        await store.dispatch('student/updateInReportWithFile',
                            ff)
                        await router.push('/my_course')

                    }else {
                        await store.dispatch('student/updateInReportWithoutFile', {
                            link: reportLink.value,
                            content: reportMessage.value,
                            iomId: iomId.value,
                            taskId: taskId.value,
                            reportId: reportId.value,
                            token: localStorage.getItem('jwt-token')
                        })
                        await router.push('/my_course')
                    }
                }

            }

            return {
                taskData, title,loading,accepted,tutorComment,chat, description,showModal,
                link, term, author, reportMessage, reportLink, category,
                onFileSelected, sendMessage, checkTerm, currentMentor,refund,
                tutorId,studentId, editorConfig,updateMessage,
                editor,reportId
            }
        },
        components:{StudentMainMenu,AppLoader, ConversationTask}
    }
</script>

<style scoped>



    .content-comments {
        padding: 15px 10px;

    }
    .success {
        margin-top: 1em;
        padding: 10px 15px;
        color: white;
        background-color: #63d863;
    }

    .bg-comment {
        margin-top: 15px;
        padding: 25px 15px;
        background-color: #FDFD96;
        margin-bottom: 15px;
        border-bottom: 2px orange solid;
    }

    .container {
        min-height: 50vh;
    }

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