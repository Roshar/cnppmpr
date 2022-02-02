<template>
    <div class="col-3">
        <tutor-education-menu :iom-id="iomId" :current-iom="currentIomTitle"></tutor-education-menu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <h4 class="title-page">Выполненные задания</h4>
            <hr>
            <h5 class="subtitle-page">Фильтр</h5>
            <div class="row">
                <div class="col-6">
                    <select class="form-control" name="tutorId" v-model="status">
                        <option value="0">В ожидании проверки</option>
                        <option value="1">Завершенные</option>
                        <option value="2">На доработке</option>
                    </select>
                </div>
                <div class="col-6">
                    <select class="form-control" name="studentId" v-model="studentId">
                        <option value="">Все</option>
                        <option v-for="item in students" :value="item['student_id']"> {{item.surname}} {{item.name}}</option>
                    </select>
                </div>
            </div>
            <hr>
            <div class="search-students" v-if="exercises">
                <h5 >Результат поиска </h5>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">ИОМ</th>
                        <th scope="col">Задание</th>
                        <th scope="col">Автор</th>
                        <th scope="col">Слушатель</th>
                        <th scope="col">Открыть</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in exercises">
                        <td scope="row">{{index+1}}</td>
                        <td scope="row">{{item['iom_title']}}</td>
                        <td scope="row">{{item['title']}}</td>
                        <td scope="row">{{author(item.mentor)}}</td>
                        <td scope="row">{{item.surname}} {{item.name}} {{item.patronymic}}</td>
                        <td scope="row">
                            <router-link :to="{path:`/show_exercises_accepted/${item['iom_id']}/${item['id_exercises']}/${item['user_id']}`}" class="btn btn-outline-secondary">
                                <span v-if="item.accepted === 0"> В ожидании </span>
                                <span v-if="item.accepted === 1 ||item.accepted === 2 "> Открыть ответ </span>
                            </router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<script>
    import {ref,computed,onMounted,watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter} from "vue-router";
    import {useRoute} from 'vue-router'
    import TutorEducationMenu from "../../../components/tutorMenu/TutorEducationMenu";

    export default {
        setup() {
            const store = useStore()
            const route = useRoute()
            const router = useRouter()
            const token = localStorage.getItem('jwt-token')
            const exercises = ref()
            const currentIomTitle = ref()
            const iomId = ref(route.params.iom)
            const iomData = ref()
            const students = ref('')
            const studentId = ref()
            const status = ref('0')
            const loading = ref(true)

            const author = (val) => {
                if(val === 0) {
                    return 'Тьютор'
                }else {
                    return 'Наставник'
                }
            }

            watch([status, studentId], async() => {
                if(status.value !== '' || studentId.value !== '') {
                    //Завершенные
                    const code = parseInt(status.value)
                    const student = (studentId.value !== '') ? studentId.value : null
                    await loadExercises(code,student)
                }else {
                    // В ожидании
                    const code = parseInt(status.value)
                    await loadExercises(code)
                }
            })

            const loadExercises = async(code,studentId) => {
                await store.dispatch('iom/getPendingDataOrFinishedByIomId',
                    {token,status:code, iomId:iomId.value, student: studentId})
                exercises.value = store.getters['iom/getPendingDataOrFinishedByIomId']
                await store.dispatch('student/getUsersFromIomEducation',{filter: false, iomId:iomId.value})
                students.value = store.getters['student/getUsersFromIomEducation']

                await store.dispatch('iom/getDataById', {
                    token: localStorage.getItem('jwt-token'),
                    id: iomId.value
                })
                const iomData = store.getters['iom/getCurrentIomData']
                currentIomTitle.value = iomData.title
            }

            onMounted(async()=>{
                loading.value = true
                await loadExercises(0)
                await store.dispatch('iom/getData',token)
                iomData.value = store.getters['iom/getData']
                loading.value = false
            })

            const request = async() => {

            }

            document.title = "Раздел: Задания"
            return {
                iomData,
                exercises,
                request,
                status,
                loading,
                author,
                students,
                studentId,
                iomId,
                currentIomTitle

            }
        },
        components: {
            TutorEducationMenu
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