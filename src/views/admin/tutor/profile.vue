<template>
    <div class="col-3">
        <AdminStudentMenu></AdminStudentMenu>
    </div>
    <div class="col-9">
        <div class="row">
            <div class="col-12">
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
                        <router-link to="/conversations" class="message_element_active" style="float:right;  text-decoration: underline;"> Перейти к диалогу</router-link>
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
                                            <img :src="avatar" alt="Слушатель" class="rounded-circle" width="150">
                                            <div class="mt-3">
                                                <h4>{{name}}</h4>
                                                <p class="text-secondary mb-1">Тьютор</p>
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
                                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-receipt" viewBox="0 0 24 16">
                                                <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                                                <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                                            </svg>Предмет</h6>
                                            <span class="text-secondary">{{discipline}}</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 24 16">
                                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                                <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                                            </svg>
                                                Группа</h6>
                                            <span v-if="groupData" class="text-secondary"><router-link :to="{path:`/group/${groupId}`}"> {{groupName}}</router-link></span>
                                            <span v-else class="text-secondary"> не назначено</span>
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
                                    </div>
                                </div>
                                <div class="row gutters-sm">
                                    <div class="col-sm-12 mb-6">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <h5 style="text-align: center">Общая статистика</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row gutters-sm">
                                    <div class="col-sm-6 mb-3">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <h6 class="d-flex align-items-center mb-3">Слушатели</h6>
                                                <small>Укомплектованность группы</small>
                                                <div class="progress mb-3" style="height: 5px">
                                                    <div class="progress-bar bg-primary" role="progressbar" :style="createGraphics(studentsCount,100)"></div>
                                                </div>
                                                <small>Завершивших обучение</small>
                                                <div class="progress mb-3" style="height: 5px">
                                                    <div class="progress-bar bg-primary" role="progressbar" :style="createGraphics(reportsCount,studentsCount)" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>

                                                <div style="padding: 10px 0">Гендерная принадлежность</div>

                                                <small>Муж</small>
                                                <div class="progress mb-3" style="height: 5px">
                                                    <div class="progress-bar bg-primary" role="progressbar" style="width: 89%" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <small>Жен</small>
                                                <div class="progress mb-3" style="height: 5px">
                                                    <div class="progress-bar bg-primary" role="progressbar" style="width: 55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6 mb-3">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <h6 class="d-flex align-items-center mb-3">ИОМы</h6>
                                                <div style="padding: 10px 0">
                                                    <small>Количество ИОМов: {{iomCount}} </small>
                                                </div>
                                                <div style="padding: 10px 0">
                                                    <small>Время последнего визита: {{lastActive}} </small>
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
            const loading = ref(true)
            const showModal = ref(false)
            // STUDENTS DATA
            const currentTime = ref()
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
            const description = ref()
            const discipline = ref()
            const groupData = ref(false)
            const groupName = ref()
            const groupId = ref()
            const issetIom = ref('не назначено')
            const birthday = ref()
            const age = ref()
            const activeTime = ref()
            const onlineClass = ref()
            const onlineStatus = ref()
            const messageBody = ref()
            const studentsCount = ref()
            const reportsCount = ref()
            const iomCount = ref()
            const lastActive = ref()
            const man = ref()

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

            const createGraphics = (currentValue, maxValue) => {
                if(currentValue === 0 || maxValue === 0) {
                    return 'width: 0%'
                }else {
                    let res = currentValue/maxValue * 100
                    return 'width:' + String(res) + '%'
                }
            }

            console.log(createGraphics(1, 200))

            onMounted(async()=>{
                loading.value = true
                const userId = route.params.userId
                profile.value = await store.dispatch('admin/getProfile',{tbl:'tutors', userId:userId})
                dependencies.value = await store.dispatch('admin/getDependenciesTutor',{ userId:userId})
                console.log(dependencies.value['groupData'])
                if(dependencies.value['groupData'].length) {
                    groupData.value = true
                    groupName.value = dependencies.value['groupData'][0]['title']
                    groupId.value = dependencies.value['groupData'][0]['group_id']
                }
                if(dependencies.value['countStudents'][0]['students']){
                    man.value = dependencies.value['gender'][0]['id']
                }
                studentsCount.value = dependencies.value['countStudents'][0]['students']
                reportsCount.value = dependencies.value['countReports'][0]['reports']
                iomCount.value = dependencies.value['iomData'][0]['ioms']


                //USER INFO
                surname.value = profile.value[0].surname
                currentUser.value = profile.value[0]['user_id']
                patronymic.value = profile.value[0].patronymic
                name.value = profile.value[0].name
                age.value = profile.value[0].age
                phone.value = profile.value[0].phone
                email.value = profile.value[0].login
                gender.value = profile.value[0].gender
                activeTime.value = profile.value[0]['auth_update']
                lastActive.value = profile.value[0]['last_active']
                description.value = profile.value[0]['title_description']
                discipline.value = profile.value[0]['title_discipline']
                birthday.value = profile.value[0]['birthday']
                avatar.value = profile.value[0]['avatar']
                checkOnline(activeTime.value,15)
                loading.value = false

            })

            currentTime.value = getDateCurrent()
            return {
                currentTime,
                loading,
                showModal,
                editProfile,
                iomCount,
                groupData,
                groupId,
                man,
                groupName,
                lastActive,
                reportsCount,
                currentUser,
                disciplines,
                students,
                studentsCount,
                profile,
                activation,
                createGraphics,
                surname,
                patronymic,
                name,
                phone,
                email,
                gender,
                description,
                birthday,
                genderVal,
                discipline,
                issetIom,
                age,
                activeTime,
                declensionAge,
                onlineStatus,
                onlineClass,
                avatar,
                sendMessage,
                messageBody
            }
        },
        components: {AppLoader, AdminStudentMenu}
    }
</script>

<style scoped>

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