<template>
    <div class="col-3">
        <AdminStudentMenu></AdminStudentMenu>
    </div>
    <div class="col-9">
        <div class="row">
            <div class="col-12">
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
                                <button type="button" class="close"  @click="cancelDelete" data-dismiss="modal" aria-hidden="true">&times;</button>
                            </div>
                            <div class="modal-body">
                                <p> <span style="color: tomato"> <strong>Важно!</strong></span>  Данная операция прервет всю работу слушателя, также будут удалены все данные связанные с ним (отчет о выполненных работах, сообщения и т.д). </p>
                                <input type="text" class="form-control" placeholder="Введите секретный код" v-model="code">
                            </div>
                            <div class="modal-footer justify-content-center">
                                <button type="button" class="btn btn-secondary"  @click="cancelDelete" data-dismiss="modal">Одуматься</button>
                                <button type="button" @click="deleteStudent" v-if="delBtn" class="btn btn-danger">Удалить</button>
                            </div>
                        </div>
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
                            <label class="message_element">Новое сообщение</label>
                            <textarea class="form-control"   cols="70" rows="6" id="description" v-model="messageBody"  name="message" placeholder="Добавьте сообщение"></textarea>
                        </div>
                        <button type="button"  class="btn btn-outline-primary-send" @click="sendMessage()">Отправить</button>
                        <router-link to="/admin_conversations" class="message_element_active" style="float:right;  text-decoration: underline;"> Перейти к диалогу</router-link>
                    </form>
                </div>
                <app-loader v-if="loading"></app-loader>
                <div class="content-wallpaper" v-else>
                    <h5 >Личный профиль пользователя </h5>
                        <div class="main-body">
                            <div class="row gutters-sm">
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex flex-column align-items-center text-center">
                                                <img :src="avatar" alt="слушатель" style="border-radius: .4rem" width="250">
                                                <div class="mt-3">
                                                    <h4>{{name}}</h4>
                                                    <p class="text-secondary mb-1">Слушатель</p>
                                                    <p class="text-muted font-size-sm">Возраст: {{ age}}{{declensionAge(age)}}</p>
                                                    <p :class="onlineClass"> {{onlineStatus}}</p>
                                                    <button class="btn btn-outline-primary" @click="showModal=true">Отправить сообщение</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card mt-3">
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-person-bounding-box" viewBox="0 0 26 16">
                                                    <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                </svg>Тьютор</h6>
                                                <span class="text-secondary">{{tutorFio}}</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-receipt" viewBox="0 0 24 16">
                                                    <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                                                    <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                                                </svg>Предмет</h6>
                                                <span class="text-secondary">{{discipline}}</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-book-half" viewBox="0 0 24 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                                </svg>
                                                    ИОМ</h6>
                                                <span class="text-secondary" v-if="issetIom.length > 0"> {{issetIom[0].title}}</span>
                                                <span class="text-secondary" v-else>не назначен</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap delete_user" @click="getIdForDelete">
                                                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 24 16">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                                </svg>
                                                    Удалить пользователя</h6>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="card mb-3">

                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">ФИО</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                   <span v-if="!editProfile">{{name}} {{surname}} {{patronymic}}</span>

                                                </div>
                                            </div>
                                            <hr>

                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Email-адрес</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {{email}}
                                                </div>
                                            </div>
                                            <hr>

                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Телефон</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {{phone}}
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Пол</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {{genderVal(gender)}}
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Школа</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {{school}}
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Район</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {{area}}
                                                </div>
                                            </div>
                                            <hr>
                                        </div>
                                    </div>
                                    <div v-if="iom">
                                        <div class="row gutters-sm">
                                            <div class="col-sm-12 mb-6">
                                                <div class="card h-100">
                                                    <div class="card-body">
                                                        <h5 style="text-align: center">Аналитика по прохождению ИОМа </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row gutters-sm">
                                            <div class="col-sm-12 mb-3">
                                                <div class="card h-100">
                                                    <div class="card-body">
                                                        <h6 class="d-flex align-items-center mb-3">Количество заданий в ИОМ: {{iomInfo.length}}</h6>
                                                        <small>выполнено: {{finishedExercises.length || 0}}</small>
                                                        <div class="progress mb-3" style="height: 5px">
                                                            <div class="progress-bar bg-primary" role="progressbar" :style="createGraphics(finishedExercises.length,iomInfo.length)"></div>
                                                        </div>
                                                        <small>в ожидании проверки: {{pendingExercises.length || 0}}</small>
                                                        <div class="progress mb-3" style="height: 5px">
                                                            <div class="progress-bar bg-primary" role="progressbar" :style="createGraphics(pendingExercises.length,iomInfo.length)" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div v-else>
                                        <div class="col-sm-12 mb-3" >
                                            <div class="card h-100">
                                                <div class="card-body">
                                                    <h5>
                                                        Аналитика по индивидуальному образовательному маршруту недоступна
                                                    </h5>
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
        <div class="modal-overlay" v-if="showModal || showModalDelete" @click="clearFade">
        </div>
    </transition>
</template>

<script>
    import {getDateCurrent} from '../../../utils/getDateCurrent'
    import {ref, onMounted, computed, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import {useRoute} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import AdminStudentMenu from "../../../components/adminMenu/AdminStudentMenu";
    import {declensionAge} from "../../../utils/declensionAge"
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const baseUrl = ref(process.env.VUE_APP_URL)
            const loading = ref(true)
            const showModal = ref(false)
            const showModalDelete = ref(false)
            const code = ref(null)
            // STUDENTS DATA
            const currentTime = ref()
            const areas = ref()
            const disciplines = ref()
            const students = ref()
            const dependencies = ref()
            const profile = ref()
            const currentUser  = ref()
            const name = ref()
            const surname = ref()
            const patronymic = ref()
            const phone = ref()
            const email = ref()
            const gender = ref()
            const school = ref()
            const area = ref()
            const description = ref()
            const discipline = ref()
            const groupName = ref()
            const tutorFio = ref('нет')
            const tutorId = ref()
            const groupId = ref()
            const issetIom = ref([])
            const birthday = ref()
            const age = ref()
            const activeTime = ref()
            const onlineClass = ref()
            const onlineStatus = ref()
            const messageBody = ref()
            const idStudent = ref()
            const iom = ref()
            const iomInfo = ref()
            const finishedExercises = ref()
            const pendingExercises = ref()
            const delBtn = ref(false)


            //EDIT FLAG
            const editProfile = ref(false)
            const avatar = ref('')

            const sendMessage = async() => {
                if(messageBody.value.length > 1) {
                    await store.dispatch('conversation/sendMessage',
                        {sendBody:messageBody.value,
                                token: localStorage.getItem('jwt-token'),
                                targetUserId: currentUser.value,
                                link: ''})
                    showModal.value = false
                }
            }

            const activation = async (user) => {
                await store.dispatch('admin/activationById',{userId: user})
                profile.value = await store.dispatch('admin/getUsersWithBanStatus',{tbl:'students'})
                await router.push('/ban')
            }

            const genderVal = (val) => {
                return (val == 'man') ? 'муж': 'жен'
            }

            const createGraphics = (currentValue, maxValue) => {
                if(currentValue === 0 || maxValue === 0) {
                    return 'width: 0%'
                }else {
                    let res = currentValue/maxValue * 100
                    return 'width:' + String(res) + '%'
                }
            }

            const cancelDelete = () => {
                showModalDelete.value = false
                delBtn.value = false
                code.value = ''
            }
            const getIdForDelete = async() => {
                showModalDelete.value = true
            }

            const deleteStudent = async() => {
                await store.dispatch('user/deleteStudent', {
                    code: code.value,
                    token: localStorage.getItem('jwt-token'),
                    idStudent: idStudent.value
                })
                await router.push('/students')
            }
            watch([code], ()=> {
                if(code.value === '5808'){
                    delBtn.value = true
                }else {
                    delBtn.value = false
                }
            })

            const clearFade = () => {
                delBtn.value = false
                showModal.value = false
                showModalDelete.value = false
            }

            const checkOnline = (val,limit) => {
                let currentDate = new Date();
                let currentTIme = new Date(currentDate.getTime());
                let fromSqlTime = new Date(val);
                let compare = Math.floor((currentTIme - fromSqlTime.getTime()) / 1000 / 60)

                if(compare > limit){
                    onlineClass.value = 'text-muted font-size-sm environment-out'
                    onlineStatus.value = 'не в сети'
                }else {
                    onlineClass.value = 'text-muted font-size-sm environment-in'
                    onlineStatus.value = 'в сети'
                }
            }

            onMounted(async()=>{
                loading.value = true
                const userId = route.params.userId
                idStudent.value = route.params.userId
                profile.value = await store.dispatch('admin/getProfile',{tbl:'students', userId:userId})
                if(profile.value) {
                    dependencies.value = await store.dispatch('admin/getDependenciesStudent',{ userId:userId})
                    //DEPENDENCIES INFO
                    if(dependencies.value.length) {
                        groupName.value  = dependencies.value[0]['title']
                        tutorFio.value = dependencies.value[0]['surname'] + ' '+ dependencies.value[0]['name'][0]+'.'+dependencies.value[0]['patronymic'][0]+'.'
                        tutorId.value = dependencies.value[0]['t_user_id']
                        groupId.value = dependencies.value[0]['group_id']
                        iom.value = await store.dispatch('admin/getIomByStudentAndTutor',
                            { student:userId,
                                tutor:tutorId.value})
                        issetIom.value = iom.value.length ? iom.value : []


                        if(iom.value.length) {
                            //get exercises from IOM
                            iomInfo.value = await store.dispatch('admin/getExercisesByIomId',
                                {tutorId:tutorId.value,
                                    iomId:iom.value[0].iom_id})

                            finishedExercises.value = await store.dispatch('admin/getStatusFinished',{tutorId: tutorId.value, studentId:userId,iomId:iom.value[0].iom_id})
                            pendingExercises.value = await store.dispatch('admin/getStatusToPendingFinish',{tutorId: tutorId.value, studentId:userId,iomId:iom.value[0].iom_id})

                        }
                    }
                }


                //USER INFO
                surname.value = profile.value[0].surname

                currentUser.value = profile.value[0]['user_id']
                patronymic.value = profile.value[0].patronymic
                name.value = profile.value[0].name
                age.value = profile.value[0].age
                phone.value = profile.value[0].phone
                email.value = profile.value[0].login
                gender.value = profile.value[0].gender
                school.value = profile.value[0]['school_name']
                area.value = profile.value[0]['title_area']
                activeTime.value = profile.value[0]['auth_update']
                description.value = profile.value[0]['title_description']
                discipline.value = profile.value[0]['title_discipline']
                birthday.value = profile.value[0]['birthday']
                avatar.value = baseUrl.value +'/'+profile.value[0]['avatar'];
                checkOnline(activeTime.value,15)
                loading.value = false

            })


            currentTime.value = getDateCurrent()
            return {
                currentTime,
                loading,
                idStudent,
                showModal,
                editProfile,
                areas,
                createGraphics,
                currentUser,
                disciplines,
                students,
                profile,
                activation,
                clearFade,
                deleteStudent,
                surname,
                patronymic,
                name,
                phone,
                email,
                gender,
                school,
                area,
                description,
                birthday,
                genderVal,
                tutorFio,
                discipline,
                groupId,
                groupName,
                tutorId,
                issetIom,
                age,
                activeTime,
                declensionAge,
                onlineStatus,
                onlineClass,
                avatar,
                sendMessage,
                messageBody,
                iom,
                iomInfo,
                finishedExercises,
                pendingExercises,
                getIdForDelete,
                cancelDelete,
                delBtn,
                showModalDelete,
                code
            }
        },
        components: {AppLoader, AdminStudentMenu}
    }
</script>

<style scoped>

    .modal-dialog.modal-confirm {
        padding: 0;
        margin: 0;
    }

    .modal-header.flex-column {
        padding: 10px;
    }

    .btn-outline-primary-send{
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
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

    .modal-form2{
        position: fixed;
        top: 27%;
        left: 50%;
        transform: translate(-50%,-27%);
        z-index: 99;
        /*max-width:400px;*/
        background-color: #edeef0;
    }

    .bi-x-circle-fill {
        color: tomato;
    }

    .delete_user:hover {
        background-color: tomato;
        cursor: pointer;
    }
    .delete_user:hover .bi-x-circle-fill {
        color: white;
    }
    .delete_user:hover h6 {
        color: white;
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

    .modal-form{
        position: fixed;
        top: 27%;
        left: 50%;
        transform: translate(-50%,-27%);
        z-index: 99;
        width: 100%;
        max-width:550px;
        background-color: #fafbfc;
        padding: 1.5em 1.5em;
    }

    .message_element,.message_element_active {
        color:#5d5d5d;
    }
    .message_element_active:hover {
        color:#3c4142;
    }


    .bi-x-lg:hover{
        color: #3c4142;
    }
    .content-wallpaper, .student-menu {
        margin-top: 1.5rem;
        background-color: white;
        color: #5d5d5d;
    }
    .environment-out {
        color: tomato !important;
    }
    .environment-in {
        color: #528c83 !important;
    }
    .content-wallpaper {
        padding: 25px;
    }
    .title-page {
        color: #4571a3;
    }
    .bi-person-x-fill {
        color: tomato;
    }
    .bi-person-x-fill:hover{
        color: #ff3814;
        cursor: pointer;
    }
    .center-content {
        width: 50%;
        margin: 0 auto;
    }
    .inside-block-indent {
        margin:10px 0 10px 0;
    }
    .btn-outline-primary {
        color: #4571a3;
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
    .btn-primary-outline {
        background-color: transparent;
        border:1px solid rgba(69, 113, 163, 0.4) ;
        padding:8px 25px;
        color: #4571a3;
        box-sizing: border-box;
        width:100%;

    }
    .btn-primary-outline:hover {
        border-color:#4571a3;
        text-decoration: none;

    }
    .btn-danger-outline {
        background-color: transparent;
        border:1px solid rgba(255, 99, 71, 0.4);
        padding:8px 25px;
        color: tomato;
        box-sizing: border-box;
        width:100%;
    }

    .btn-danger-outline:hover {
        border-color:tomato
    }








</style>