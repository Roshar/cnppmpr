<template>
    <div class="col-3">
        <tutor-education-menu :iom-id="iomId" :current-iom="currentIomTitle"></tutor-education-menu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <h4 class="title-page">Участники ИОМа "{{currentIomTitle}}" </h4>
            <hr>
            <div class="row">
                <div class="col-8">
                    <h5 class="subtitle-page">Поисковик </h5>
                    <label> Найти слушателя по ФИО</label>
                    <input type="text" class="form-control" v-model="searchValue"  placeholder="Введите имя или фамилию">
                </div>
                <div class="col-4">
                    <div  style="display: flex">
                        <button class="btn btn-outline-primary-send text-example" @click="showModal = true"  >
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                            </svg>
                            <span style="margin-left:1em"> Добавить слушателя в ИОМ</span>
                        </button>
                    </div>
                </div>
            </div>
            <hr>
        </div>

        <div class="modal-form" v-if="showModal">
            <form id="form">
                <h4 class="title-page">Доступные для записи: {{freeStudents.length}}</h4>
                <div class="form-group">
                        <label for="title">Поисковик</label>
                        <input type="text" class="form-control" v-model="title"  id="title"  placeholder="Введите имя или фамилию человека">
                        <hr>

                        <table class="table">
                        <thead>
                        <tr>
                            <th scope="col" style="width: 5%" >№</th>
                            <th scope="col" style="width: 25%">Имя и Фамилия</th>
                            <th scope="col" style="width: 50%">Школа</th>
                            <th scope="col" style="width: 20%">Добавить</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in freeStudents" :key="item.user_id">
                            <th scope="row">{{index+1}}</th>
                            <td>  {{item.name}} {{item.surname}}</td>
                            <td>{{item.school_name}}</td>
                            <td>
                                <span style="margin-left: 1em">
                                    <button type="button" class="btn" @click="addInIom(item.user_id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                                         <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                         <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                        </svg>
                                    </button>
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button type="button"  class="btn btn-block btn-outline-secondary" @click="goBack">Вернуться в ИОМ</button>
                        </div>
                    </div>
            </form>
        </div>


        <div class="row">
            <div class="col-12">
                <app-loader v-if="loading"></app-loader>
                <div class="content-wallpaper" v-else>
                    <div class="row">
                        <div class="col-4"> <h5 >Список обучающихся(активированные)</h5></div>
                        <div class="col-4"> <span>Общее количество: {{countNum}}</span></div>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col" style="width: 5%" >№</th>
                            <th scope="col" style="width: 20%">ФИО</th>
                            <th scope="col" style="width: 30%">Школа</th>
                            <th scope="col" style="width: 25%">Район</th>
                            <th scope="col" style="width: 10%">Статус учебного процесса</th>
                            <th scope="col" style="width: 10%">Удалить из ИОМ</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in students" :key="item.student_id">
                            <th scope="row">{{index+1}}</th>
                            <td ><router-link :to="{path:`/my_student/profile/${item.student_id}`}" class="name_student_link"> {{item.name}} {{item.surname}}</router-link></td>
                            <td>{{item.school_name}}</td>
                            <td>{{item.title_area}}</td>
                            <td>{{checkFinishedEducation(item.status)}}</td>
                            <td>
                                <button class="btn" style="color: tomato" @click="deleteFromIom(item.student_id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person-dash" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                        <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <transition  name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="goBack">
        </div>
    </transition>
</template>

<script>
    import {getDateCurrent} from '../../../utils/getDateCurrent'
    import {ref, onMounted, computed, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter, useRoute} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import TutorEducationMenu from "../../../components/tutorMenu/TutorEducationMenu";
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const title = ref()
            const iomId = route.params.id
            const loading = ref(true)
            const search = ref(false)
            const search2 = ref(false)
            const showModal = ref(false)
            const discipline_value = ref("0")
            const area_value = ref("0")
            const gender_value = ref("0")
            const iom = ref("")
            const currentIomTitle = ref()
            // STUDENTS DATA
            const currentTime = ref()
            const areas = ref()
            const students = ref()
            const countNum = ref(0)
            const searchValue = ref('')
            const freeStudents = ref()

            const checkFinishedEducation = (val) =>{
                return (val === 0) ? 'в процессе' : 'завершил'
            }

            const deleteFromIom = async(id)=> {
                await store.dispatch('student/deleteStudentFromIomEducation',{ studentId: id, iomId:route.params.id})
                await store.dispatch('student/getUsersFromIomEducation',{filter: false, iomId:route.params.id})
                await store.dispatch('student/getUsersFromIomFreeForEducation',{filter: false, iomId:route.params.id})
                students.value = store.getters['student/getUsersFromIomEducation']
                freeStudents.value = store.getters['student/getFreeStudents']
                showModal.value =false
            }

            const goBack = async () => {
                await store.dispatch('student/getUsersFromIomEducation',{filter: false, iomId:route.params.id})
                students.value = store.getters['student/getUsersFromIomEducation']
                showModal.value =false
            }

            const addInIom = async(id) => {
                await store.dispatch('student/addStudentInCurrentIom', {studentId:id,iomId:route.params.id})
                await store.dispatch('student/getUsersFromIomFreeForEducation',{filter: false, iomId:route.params.id})
                freeStudents.value = store.getters['student/getFreeStudents']
            }


            watch([title], async (values) => {
                search2.value = true
                if(values[0] !== '') {
                    await store.dispatch('student/getUsersFromIomFreeForEducation',{filter: true, iomId:route.params.id, param:values[0]})
                    freeStudents.value = store.getters['student/getFreeStudents']
                }else {
                    await store.dispatch('student/getUsersFromIomFreeForEducation',{filter: false, iomId:route.params.id})
                    freeStudents.value = store.getters['student/getFreeStudents']
                }

            })
            watch([searchValue], async (values) => {
                search.value = true
                if(values[0] !== '') {
                    await store.dispatch('student/getUsersFromIomEducation',
                        {filter: true,
                                iomId:route.params.id,
                                param: values[0]})
                    students.value = store.getters['student/getStudentsForTutor']
                    countNum.value = students.value.length ? students.value.length : 0
                }else {
                    await store.dispatch('student/getStudentsForTutor',{filter: false})
                    students.value = store.getters['student/getStudentsForTutor']
                    countNum.value = students.value.length ? students.value.length : 0
                }
            })


            onMounted(async()=>{
                loading.value = true
                areas.value = await store.dispatch('area/getAreas')
                await store.dispatch('student/getUsersFromIomEducation',{filter: false, iomId:route.params.id})
                await store.dispatch('student/getUsersFromIomFreeForEducation',{filter: false, iomId:route.params.id})
                await store.dispatch('iom/getDataById', {
                    token: localStorage.getItem('jwt-token'),
                    id: route.params.id
                })

                freeStudents.value = store.getters['student/getFreeStudents']
                const iomData = store.getters['iom/getCurrentIomData']
                currentIomTitle.value = iomData.title
                students.value = store.getters['student/getUsersFromIomEducation']
                countNum.value = students.value.length ? students.value.length : 0
                loading.value = false
            })


            currentTime.value = getDateCurrent()
            return {
                currentTime,
                iom,
                searchValue,
                loading,
                search,
                areas,
                discipline_value,
                area_value,
                students,
                gender_value,
                countNum,
                iomId,
                currentIomTitle,
                addInIom,
                search2,
                showModal,
                title,
                freeStudents,
                goBack,
                deleteFromIom,
                checkFinishedEducation
            }
        },
        components: {AppLoader,TutorEducationMenu}
    }
</script>

<style scoped>

    .text-example {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        text-align: center;
        margin: 10% 0;
        /*min-height: 200px;*/
        background-color: rgba(33, 33, 33, .3);
        align-items: center;
    }

    .content-wallpaper, .tutor-left-main-menu {
        margin-top: 1.5rem;
        background-color: white;
        color: #5d5d5d;
    }
    .content-wallpaper {
        padding: 25px;
    }
    .name_student_link {
        color: #2a5885;
    }
    .name_student_link:hover {
        color: #2a5885;
        font-weight: bold;
        text-decoration: none;
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
        overflow: scroll;
        height: 100%;
        top: 4%;
        left: 50%;
        transform: translate(-50%,-4%);
        z-index: 99;
        width: 90%;
        /*max-width:400px;*/
        background-color: #fff;
        padding: 60px 60px;
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

    .btn-outline-primary-send{
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }

    .btn-danger-outline:hover {
        border-color:tomato
    }



</style>