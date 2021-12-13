<template>
    <div class="col-3">
        <admin-profile-menu></admin-profile-menu>
    </div>

    <div class="col-9">
        <app-loader v-if="loading"></app-loader>
        <div class="load-content" v-else>
            <div class="modal-form" v-if="showModal">
                <div class="row">
                    <div class="col-12 ml-auto">
                        <button class="btn-primary-outline" @click="showModal = false"> ОТМЕНА </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="content-wallpaper-without-padding">
                            <label > Пол </label>
                            <select class="form-control" name="gender" v-model="gender_value">
                                <option value="0">Выбрать пол</option>
                                <option value="man">Муж</option>
                                <option value="woman">Жен</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="content-wallpaper-without-padding">
                            <label > Район</label>
                            <select class="form-control" name="area" v-model="area_value">
                                <option value="0">Выбрать район</option>
                                <option v-for="(item, index) in areas" :value="item.id_area">{{item.title_area}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="content-wallpaper-without-padding">
                            <div class="lists_list"> <!-- <div class="blue-line"></div>    -->
                                <h5 class="subtitle-page"> Доступные для записи</h5>
                                <section class="list_section">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">№</th>
                                            <th scope="col">ФИО</th>
                                            <th scope="col">Школа</th>
                                            <th scope="col">Район</th>
                                            <th scope="col">Добавить в группу</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(item, index) in studentsFree" :key="item.user_id">
                                            <th scope="row">{{index+1}}</th>
                                            <td>{{item.surname}} {{item.name}} {{item.patronymic}} </td>
                                            <td>{{item.school_name}}</td>
                                            <td>{{item.title_area}}</td>
                                            <td> <button class="btn-primary-outline" type="button" @click="addInGroup(item.user_id)"> Добавить </button></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-5" >
                    <div class="content-wallpaper">
                        <div class="card">
                            <div class="card-body">
                                <div style="color: rgb(211, 211, 211); padding-bottom:10px"> Дата создания: {{created}} </div>
                                <h5 class="card-title">{{title}}</h5>
                                <h6 class="card-subtitle mb-2 text-muted" style="padding-bottom:5px">Тьютор: {{name}}</h6>
                                <h6 class="card-subtitle mb-2 text-muted" >Предмет: {{disciplineTitle}} </h6>
                                <p class="card-text">{{description}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="content-wallpaper">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Количество участников</h5>
                                <h3 class="card-subtitle mb-2 text-muted" style="padding-bottom:5px">Всего: {{studentsInGroup.length}} </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="content-wallpaper">
                        <div class="create_iom">
                            <div class="create_iom_block">
                                <div class="create_iom_block_icon_create" @click="showModal = true">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="content-wallpaper">
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">ФИО</th>
                                <th scope="col">Школа</th>
                                <th scope="col">Район</th>
                                <th scope="col">Наличие ИОМа</th>
                                <th scope="col">Завершившие обучение</th>
                                <th scope="col">Удалить из группы</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in studentsInGroup" :key="item['user_id']">
                                <th scope="row">{{index+1}}</th>
                                <td> <router-link :to="{path:`/student/profile/${item['user_id']}`}">{{item.surname}} {{item.name}} {{item.patronymic}} </router-link></td>
                                <td>{{item['school_name']}}</td>
                                <td>{{item['title_area']}}</td>
                                <td v-if="item['iom_id']"> <router-link :to="{path:`/iom/${item['iom_id']}/${item['t_user_id']}`}">назначен</router-link> </td>
                                <td v-else> не назначен</td>
                                <td v-if="item['status']">завершено</td>
                                <td v-else>в процессе</td>
                                <td><button class="btn" @click="deleteInGroup(item['user_id'])">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="currentColor" class="bi bi-person-x" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                        <path fill-rule="evenodd" d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </button></td>
                            </tr>
                            </tbody>
                        </table>
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

    import {ref, onMounted, computed, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import {useRoute} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import AdminProfileMenu from "../../../components/adminMenu/AdminProfileMenu";

    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const loading = ref(true)
            const showModal = ref(false)
            const tutorsData = ref()
            const studentsFree = ref([])
            const studentsInGroup = ref([])
            const groupData = ref()
            const title = ref()
            const description = ref()
            const tutorId = ref()
            const currentGroup = ref()
            const created = ref()
            const disciplineTitle = ref()
            //FILTER
            const areas = ref()
            const gender_value = ref("0")
            const area_value = ref("0")
            const flagIom = ref(false)

            const name = ref()


            const deleteInGroup = async (id) => {
                await store.dispatch('admin/deleteInGroup',{
                    user: id,
                    groupId:route.params.id
                })
                groupData.value = await store.dispatch('admin/getGroupById',{groupId: route.params.id})
                studentsInGroup.value = await store.dispatch('admin/getAppointedStudentsCurrentGroup',
                    {tutorId:groupData.value['tutor_id'],
                        groupId:groupData.value['id']})
                studentsFree.value = await store.dispatch('admin/getFreeStudentsByDisciplineId',{disId: groupData.value['id_dis']})
                await router.push('/group/'+route.params.id)
            }

            const load = async() => {
                areas.value = await store.dispatch('area/getAreas')
                // TUTORS DATA
                tutorsData.value = await store.dispatch('admin/getTutorAndCheckAtFree')
                groupData.value = await store.dispatch('admin/getGroupById',{groupId: route.params.id})
                tutorId.value = groupData.value['tutor_id']
                currentGroup.value = groupData.value['id']

                studentsFree.value = await store.dispatch('admin/getFreeStudentsByDisciplineId',{disId: groupData.value['id_dis']})
                studentsInGroup.value = await store.dispatch('admin/getAppointedStudentsCurrentGroup',
                    {tutorId:groupData.value['tutor_id'],
                        groupId:groupData.value['id']})

                title.value = groupData.value.title
                description.value = groupData.value.description
                created.value = groupData.value['created_at']
                disciplineTitle.value = groupData.value['title_discipline']
                name.value = groupData.value.surname +' '+ groupData.value.name +' '+ groupData.value.patronymic
            }

            onMounted(async()=>{
                loading.value = true
                await load()
                loading.value = false
            })

            watch([area_value,gender_value], async (values) => {

                if(values[0] !== '0' || values[1] !== '0') {
                    studentsFree.value =  await store.dispatch('admin/getFreeStudentsByDisciplineId',
                        {disId: groupData.value['id_dis'],
                                areaId:area_value.value,
                                gender: gender_value.value})
                }else {
                    studentsFree.value = await store.dispatch('admin/getFreeStudentsByDisciplineId',{disId: groupData.value['id_dis']})
                }
            })

            const addInGroup = async(user) => {
                const group = currentGroup.value
                const tutor = tutorId.value
                const student = user
                await store.dispatch('admin/addUserInGroupAndTutor',{
                    group,
                    tutor,
                    student
                })
                studentsFree.value = await store.dispatch('admin/getFreeStudentsByDisciplineId',{disId: groupData.value['id_dis']})
                await store.dispatch('admin/getAppointedStudentsCurrentGroup',
                    {tutorId:groupData.value['tutor_id'],
                        groupId:groupData.value['id']})
                studentsInGroup.value = store.getters['admin/getAppointedStudentsCurrentGroup']
                showModal.value = false
                await router.push(`/group/${route.params.id}`)
            }


            return {
                loading,
                showModal,
                flagIom,
                tutorsData,
                groupData,
                title,
                description,
                created,
                disciplineTitle,
                name,
                studentsFree,
                studentsInGroup,
                gender_value,
                area_value,
                areas,
                addInGroup,
                deleteInGroup
            }
        },
        components: {AppLoader, AdminProfileMenu}
    }
</script>

<style scoped>
    .modal-overlay,.modal-overlay2 {
        position: fixed;
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
        width: 80%;
        /*max-width:400px;*/
        background-color: #edeef0;
        padding: 60px 60px;
    }

    .card {
        border:none
    }

    .subtitle-page {
        color: #4571a3;
        text-align: center;
    }
    .content-wallpaper, .student-menu {
        margin-top: 1.5rem;
        background-color: white;
        color: #5d5d5d;
    }
    .content-wallpaper {
        padding: 25px;
    }
    .content-wallpaper-without-padding {
        margin-top: 1.5rem;
    }
    .cancel {
        width:200px;
        margin-left: auto;
        margin-right: auto;

    }
    .title-page {
        color: #4571a3;
    }
    .create_iom {
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .create_iom_block {
        display: flex;
        border:5px dotted #4571a3;
        width: 150px;
        align-items: center;
        justify-content: center;
    }
    .create_iom_block_icon_create {
        font-size: 74px;
        color: grey;
    }
    .btn-primary-outline {
        background-color: transparent;
        border:1px solid rgba(69, 113, 163, 0.4) ;
        padding:8px 25px;
        color: #4571a3;
        box-sizing: border-box;

    }
    .btn-primary-outline:hover {
        border-color:#4571a3;
        text-decoration: none;

    }
    .bi-person-x {
        color: tomato;
    }
    .bi-person-x:hover {
        color: #F35B40;
    }
    .btn-danger-outline {
        background-color: transparent;
        border:1px solid rgba(255, 99, 71, 0.4);
        padding: 5px 25px;
        color: tomato;
        margin-left: 1em;
    }
    .btn-danger-outline:hover {
        border-color:tomato
    }

    .bi-person-plus {
        color: #4571a3;
    }
    .center-content {
        width: 50%;
        margin: 0 auto;
    }
    .inside-block-indent {
        margin:10px 0 10px 0;
    }

    .colorlib-main-menu {
        background-color: white;
        width: 100%;
    }
    .colorlib-main-menu ul {
        list-style-type: none;
        width: 100%;
        padding: 0;
    }

    .colorlib-main-menu ul li .router-link {
        display: block;
        padding: 20px;
        text-align: center;
        color: #4571a3;

    }
    .colorlib-main-menu ul li .router-link:hover {
        text-decoration: none;
        background-color:rgba(192,192,192,0.1);
        border-right: rgba(192,192,192,0.3) solid 5px;
    }

    .colorlib-main-menu ul li .active {
        text-decoration: none;
        background-color:rgba(192,192,192,0.1);
        border-right: rgba(192,192,192,0.3) solid 5px;
        color: #4571a3;
        font-weight: 500;
    }

</style>