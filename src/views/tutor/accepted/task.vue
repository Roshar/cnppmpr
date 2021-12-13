<template>
    <link rel="stylesheet" href="//cdn.materialdesignicons.com/3.7.95/css/materialdesignicons.min.css">
    <div class="col-3">
        <TutorMainMenu></TutorMainMenu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <div class="row">
                <div class="col-8">
                    <h4 class="title-page">Просмотр ответа</h4>
                    <h6>Наименование задания: {{exTitle}}</h6>
                    <h6>Объект оценки (слушатель): {{studentFIO}} </h6>
                    <h6>Наименование ИОМа: {{iomTitle}} </h6>
                    <h6>Дата ответа: {{created}}</h6>
                    <hr>
                </div>
                <div class="col-4">
                    <span v-if="accepted === 1" style="color: #4571a3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-shield-check" viewBox="0 0 16 16">
                          <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                          <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        Ответ принят
                    </span>
                    <div class="load-content" v-if="accepted === 0">
                        <div class="row">
                            <div class="col-12">
                                <button class="btn btn-block btn-outline-primary-send" @click="successAction" > Одобрить ответ</button>
                            </div>
                            <div class="col-12" style="margin-top:5px">
                                <button class="btn btn-block btn-outline-iom-del" @click="showModal=true" > Оставить комментарий и отправить на доработку</button>
                            </div>
                        </div>
                        <div class="modal-form" v-if="showModal">
                            <form  id="form">
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
                                    <label class="message_element">Оставить комментарий: (если не удовлетворены ответом)</label>
                                    <textarea class="form-control"   cols="70" rows="6" id="description" v-model="messageBody"  name="message" placeholder="Ваш текст"></textarea>
                                    <span  v-if="messageBodyError" style="color: tomato"> Вы должны оставить комментарий для слушателя</span>
                                </div>
                                <div class="row">
                                    <div class="col-6"><button type="button"  class="btn  btn-block btn-outline-primary-send" @click="sendCorrection">Отправить на доработку</button></div>
                                    <div class="col-6"> <button type="button"  class="btn btn-block btn-outline-secondary" @click="showModal = false">Отмена</button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <span v-if="accepted === 2" style="color: #D7D704; font-weight: bold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-shield-exclamation" viewBox="0 0 16 16">
                          <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                          <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>
                        </svg>

                        На доработке
                    </span>

                </div>
            </div>
            <div class="row" v-if="accepted===2">
                <div class="col-12 bg-comment" v-if="tutorComment">
                    <h6>Ваш комментрий к ответу:</h6>
                    <p v-html="tutorComment"></p>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-12 ">
                        <div class="row">
                            <div class="col-12 grid-margin">
                                <div class="card">
                                <div id="accordion-1" class="accordion">
                                    <div class="card">
                                        <div class="card-header" id="headingOne">
                                            <h5 class="mb-0">
                                                <a data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                   Ответ слушателя
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion-1">
                                            <div class="card-body">
                                                <h6>Текстовое содержание:</h6>
                                                <p class="mb-0" v-if="aContent" v-html="aContent">
                                                </p>
                                                <p class="mb-0" v-else>Пусто</p>

                                                <hr>
                                                <h6>Ссылка:</h6>
<!--                                                <p class="mb-0" v-if="aLink" v-html="aLink"></p>-->
                                                  <a :href="aLink" v-if="aLink" target="_blank">{{aLink}}</a>
                                                <p class="mb-0" v-else>Пусто</p>
                                                <hr>
                                                <h6>Файл:</h6>

                                                <a type="button" class="btn btn-outline-secondary" target="_blank" v-if="issetFile" :href="aFilePath"> Скачать</a>
                                                <p class="mb-0" v-else>Пусто</p>
                                                <hr>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingThree">
                                            <h5 class="mb-0">
                                                <a data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Содержание задания
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion-1">
                                            <div class="card-body">
                                                <h6>Текстовое содержание:</h6>
                                                <p class="mb-0" v-if="exDescription" v-html="exDescription">
                                                </p>
                                                <p class="mb-0" v-else>Пусто</p>

                                                <hr>
                                                <h6>Ссылка:</h6>
                                                    <p class="mb-0" v-if="ex_link" v-html="ex_link"></p>
                                                <p class="mb-0" v-else>Пусто</p>
                                                <hr>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingThree2">
                                            <h5 class="mb-0">
                                                <a data-toggle="collapse" data-target="#collapseThree2" aria-expanded="false" aria-controls="collapseThree">
                                                    Обсуждение к заданию
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="collapseThree2" class="collapse" aria-labelledby="headingThree" data-parent="#accordion-1">
                                            <div class="card-body">
<!--                                                <conversation-task  v-if="chat" :chat="chat" :studentId="studentId" :tutorId="tutorId"></conversation-task>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <transition  name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="showModal = false">
        </div>
    </transition>

</template>

<script>
    import {ref,computed,onMounted,watch} from 'vue'
    import {useStore} from 'vuex'
    import ConversationTask from "../../../components/conversation/ConversationTask";
    import {useRouter} from "vue-router";
    import {useRoute} from 'vue-router'
    import TutorMainMenu from "../../../components/tutorMenu/TutorMainMenu";

    export default {
        setup() {
            const store = useStore()
            const route = useRoute()
            const router = useRouter()
            const token = localStorage.getItem('jwt-token')
            const baseUrl = ref(process.env.VUE_APP_URL)
            const loading = ref(true)
            const showModal = ref(false)
            const accepted = ref()
            const studentFIO = ref()
            const studentId = ref(route.params.studentId)
            const iomTitle = ref()
            const exTitle = ref()
            const ex_link = ref()
            const exDescription = ref()
            const issetFile = ref(false)
            const created = ref()
            const chat = ref()
            const term = ref()
            const aContent = ref()
            const aFilePath = ref()
            const aLink = ref()
            const tutorComment = ref()
            const messageBody = ref()
            const messageBodyError = ref(false)


            const sendCorrection = async() => {
                if(!messageBody.value || messageBody.value.length < 3) {
                    messageBodyError.value = true
                }else {
                    await store.dispatch('iom/correctionTask',{
                        token,
                        iomId: route.params.iom,
                        exId: route.params.exId,
                        studentId: route.params.studentId,
                        comment: messageBody.value
                    })
                window.location.href = `/show_exercises_accepted`
                }
            }

            const successAction = async() => {
                await store.dispatch('iom/successTask',{
                    token,
                    iomId: route.params.iom,
                    exId: route.params.exId,
                    studentId: route.params.studentId
                })
                window.location.href = `/show_exercises_accepted`
            }


            onMounted(async()=>{
                loading.value = true
                const answer = await store.dispatch('iom/getStudentAnswer', {
                    token,
                    iomId: route.params.iom,
                    exId: route.params.exId,
                    studentId: route.params.studentId
                })

                chat.value = await store.dispatch('student/getCommentsByTask', {
                    taskId: route.params.taskId,
                    iomId: route.params.iomId,
                    tutorId: route.params.tutorId,
                    token: localStorage.getItem('jwt-token')
                })

                accepted.value  = answer.accepted
                studentFIO.value  = answer.surname + ' '+answer.name + ' '+ answer.patronymic
                iomTitle.value  = answer['iom_title']
                exTitle.value  = answer['ex_title']
                tutorComment.value  = answer['tutor_comment']
                exDescription.value  = answer['ex_description']
                ex_link.value  = answer['ex_link']
                created.value  = answer['answer_created']
                issetFile.value = answer['file_path'] ? true : false
                aFilePath.value  = baseUrl.value +'/'+ studentId.value +'/'+ answer['file_path']
                // aFilePath.value  = answer['file_path']
                term.value  = answer['ex_term']
                aContent.value  = answer['answer_content']
                aLink.value  = answer['answer_link']
                loading.value = false
            })


            document.title = "Раздел: Задание"
            return {
                loading,
                messageBodyError,
                tutorComment,
                exTitle,accepted,issetFile, studentFIO,aFilePath,iomTitle,created,term,aContent,aLink,messageBody,ex_link,sendCorrection,successAction,exDescription,
                showModal
            }
        },
        components: {
            TutorMainMenu,
            ConversationTask
        }
    }
</script>

<style scoped >

    .bg-comment {
        padding: 25px 15px;
        background-color: #FDFD96;
        margin-bottom: 15px;
    }
    .bi-shield-exclamation {
        color: #D7D704;
    }
    .card {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 1px solid #e7eaed;
        border-radius: 0;
    }

    .bi-shield-check {
        color: #4571a3;
    }

    .accordion .card {
        margin-bottom: .75rem;
        box-shadow: 0px 1px 15px 1px rgba(230, 234, 236, 0.35);
        border-radius: .25rem;

    }
    .accordion .card .card-header {
        background-color: transparent;
        border: none;
        padding: 2rem;
        color: #4571a3;
    }
    .grid-margin {
        margin-bottom: 0.625rem;
    }
    .accordion .card .card-header a[aria-expanded="true"]:before {
        content: "\F374";
        font-size: 1.5em;
        color: #4571a3;
    }
    .accordion .card .card-header a:before {
        font-family: "Material Design Icons";
        position: absolute;
        right: 7px;
        top: 0;
        font-size: 18px;
        display: block;
        color: #4571a3;
    }
    .accordion .card .card-header a[aria-expanded="false"]:before {
        content: "\F415";
        font-size: 1.5em;
        color: #4571a3;
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
        width: 100%;
        max-width:750px;
        background-color: #fafbfc;
        padding: 1.5em 1.5em;
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