<template>
        <div class="col-12 navbar-col">
            <div class="row justify-content-center">
                <div class="col-9 ">
                    <div id="subnav"  class="navbar navbar-default">
                        <ul class="navbar-default">
                            <li><router-link to="/"  class="router-link" >Личный профиль</router-link></li>
                            <li><router-link to="/my_course"  class="router-link" >Мой индивидуальный образовательный маршрут</router-link></li>
                            <li><router-link to="my_lib"  class="router-link" >Моя копилка</router-link></li>
                            <li><router-link to="/my_conversation"  class="router-link" > Сообщения </router-link></li>
                            <li><router-link to="/my_marks"  class="router-link" > Мои оценки  </router-link></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>


        <div class="col-9" >

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <div class="row align-items-top">
                        <div class="col-lg-4">
                            <div class="resume-base  user-dashboard-info-box p-4">
                                <div class="profile">
                                    <div class="jobster-user-info">
                                        <div class="profile-avatar">
                                            <img class="img-fluid " alt="слушатель" :src="avatar">
                                        </div>
                                        <div class="profile-avatar-info mt-3">
                                            <h5 class="text-white">{{name}} {{surname}}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="about-candidate border-top">
                                    <div class="candidate-info">
                                        <h6 class="text-white">Email:</h6>
                                        <p class="text-white">{{login}}</p>
                                    </div>
                                    <div class="candidate-info">
                                        <h6 class="text-white">Телефон:</h6>
                                        <p class="text-white">{{phone}}</p>
                                    </div>
                                    <div class="candidate-info">
                                        <h6 class="text-white">Возраст:</h6>
                                        <p class="text-white">{{age}}{{declensionAge(age)}}</p>
                                    </div>
                                    <div class="candidate-info">
                                        <h6 class="text-white">Школа:</h6>
                                        <p class="text-white">{{school}}</p>
                                    </div>
                                    <div class="candidate-info">
                                        <h6 class="text-white">Район:</h6>
                                        <p class="text-white">{{area}}</p>
                                    </div>
                                    <hr>
                                    <div class="candidate-info">
                                        <h6 class="text-white">ФИО тьютора:</h6>
                                        <p class="text-white">{{tutorFio}}</p>
                                    </div>

                                </div>
                                <div class="mt-0">
                                    <h5 class="text-white">Ваш прогресс по прохождению ИОМ</h5>
                                    <h6 class="text-white">(индивидуальный образовательный маршрут)</h6>
                                    <br>
                                    <div class="candidate-info">
                                        <p class="text-white">Общее количество мероприятий(заданий):</p>
                                    </div>
                                    <div class="progress bg-dark">
                                        <div class="progress-bar bg-white" role="progressbar" style="width:55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">
                                            <div class="progress-bar-title text-white">Количество выполненных заданий</div>
                                            <span class="progress-bar-number text-white">70</span>
                                        </div>
                                    </div>
                                    <div class="progress bg-dark">
                                        <div class="progress-bar bg-white" role="progressbar" style="width:80%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">
                                            <div class="progress-bar-title text-white">Количество незавершенных заданий</div>
                                            <span class="progress-bar-number text-white">30</span>
                                        </div>
                                    </div>
                                    <div class="progress bg-dark">
                                        <div class="progress-bar bg-white" role="progressbar" style="width:55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">
                                            <div class="progress-bar-title text-white">Количество заданий на проверке</div>
                                            <span class="progress-bar-number text-white">30</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7" >
                            <div class="resume-experience">
                                <h5 class="title-page">Мой индивидуальный образовательный маршрут</h5>

                                <div class="timeline-box" v-if="tagsData" v-for="tag in tagsData" >
                                    <h5 class="resume-experience-title">
                                        {{tag.title_tag}}</h5>
                                    <div class="jobster-candidate-timeline"  @click="openTask(item.id_exercises,item.iom_id)" v-if="exerciseData" v-for="item in exerciseData">
                                        <div class="jobster-timeline-item" v-if="filterData(tag.tag_id,item.tag_id)">
                                            <div class="jobster-timeline-cricle">
                                                <i class="far fa-circle"></i>
                                            </div>
                                            <div class="jobster-timeline-info" >
                                                <div class="dashboard-timeline-info">
                                                    <span class="jobster-timeline-time"> Срок выполнения: {{checkTerm(item['term'], item['term'].split('.').reverse().join('-'))}}</span>
                                                    <h6 class="mb-2"> <span style="color:#646f79">Наименование: </span>{{ item.title}}</h6>
                                                    <span style="font-style: italic"> Автор: {{setAuthor(item.mentor )}}</span>
                                                    <p class="mt-2">Содержание: {{shortContent(clearHTML(item.description))}}</p>
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




</template>

<script>
    import StudentMainMenu from "../../../components/studentMenu/StudentMainMenu";
    import {onMounted, ref} from "vue";
    import {useStore} from "vuex";
    import {useRoute, useRouter} from "vue-router";
    import {declensionAge} from "../../../utils/declensionAge";
    import {checkTerm} from '../../../utils/checkTerm'
    import {shortContent} from "../../../utils/shortContent";
    import {clearHTML} from "../../../utils/clearHTML"
    export default {

        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const name = ref();
            const id = ref()
            const surname = ref();
            const patronymic = ref();
            const phone = ref();
            const issetIom = ref()
            const age = ref();
            const birthday = ref();
            const baseUrl = ref(process.env.VUE_APP_URL)
            const avatar = ref();
            const gender = ref();
            const login = ref();
            const area = ref();
            const school = ref();
            const discipline = ref();
            let tutorId = ref()
            let tutorFio = ref()
            let dependencies = ref()
            let exerciseData = ref()
            let tagsData = ref()
            const loading = ref(true)

            const setAuthor = (mentor) => {
                if(mentor === 0) {
                    return 'Тьютор'
                }else {
                    // TODO получить имя НАСТАВНИКА
                }
            }


            const openTask = (taskId, iomId) => {

                router.push(`/my_course/${iomId}/${taskId}`)
                // await store.dispatch('student/getMyTaskById', {
                //     taskId: taskId,
                //     iomId: iomId,
                //     token: localStorage.getItem('jwt-token'),
                // })
            }

            const load = () => {
                id.value = store.state['user'].userData.user_id;
                name.value = store.state['user'].userData.name;
                surname.value = store.state['user'].userData.surname;
                patronymic.value = store.state['user'].userData.patronymic;
                phone.value = store.state['user'].userData.phone;
                age.value = store.state['user'].userData.age;
                birthday.value = store.state['user'].userData.birthday;
                baseUrl.value = process.env.VUE_APP_URL
                avatar.value = baseUrl.value +'/'+store.state['user'].userData.avatar;
                gender.value = store.state['user'].userData.gender;
                login.value = store.state['user'].userData.login;
                school.value = store.state['user'].userData['school_name'];
                area.value = store.state['user'].userData['title_area'];
                discipline.value = store.state['user'].userData['title_discipline'];

            }

            const filterData = (parentId, childId) => {
                return parentId === childId ? true : false
            }


            onMounted(async()=>{
                loading.value = true
                await store.dispatch('user/getUserData',localStorage.getItem('jwt-token'))
                await load()

                dependencies.value = store.getters['user/getUserLinks']
                if(dependencies.value) {

                    tutorId.value = dependencies.value.user_id
                    tutorFio.value = dependencies.value.surname + ' '+dependencies.value.name+' '+dependencies.value.patronymic

                }
                if(tutorId.value){
                    issetIom.value = await store.dispatch('student/checkIssetMyIom',{
                        tutorId:tutorId.value,
                        studentId: id.value
                    })
                    if(issetIom.value) {
                        await store.dispatch('student/getExercisesFromMyIom',{
                            iomId: issetIom.value[0]['iom_id'],
                            tutorId:tutorId.value,
                        } )
                        exerciseData.value = store.getters['student/getExercisesMyIom']
                        tagsData.value = store.getters['student/getTagsMyIom']

                        console.log( exerciseData.value)
                        console.log( tagsData.value)


                    }
                }
                loading.value = false
            })
            return {
                name,
                surname,
                setAuthor,
                patronymic,
                school,
                area,
                phone,
                discipline,
                gender,
                filterData,
                declensionAge,
                openTask,
                exerciseData,
                checkTerm,
                shortContent,
                avatar,
                birthday,
                age,
                login,
                issetIom,
                tutorId,
                tutorFio,
                tagsData,
                clearHTML

            }
        },
        components:{StudentMainMenu}

    }
</script>

<style scoped>

    .jobster-candidate-timeline:hover {
        background-color:rgba(167, 199, 231, .6);
        cursor: pointer;
    }

    .title-page {
        color: #4571a3;
    }

    hr { display: block; height: 1px;
        border: 0; border-top: 1px solid #ccc;
        margin: 1em 0; padding: 0; }


    .navbar-col {
        padding: 0;
        margin: 0;
        background-color: #f6f6f6;

    }
    .navbar-default li {
        display: inline-block;

    }

    .navbar-default ul li .router-link{
        display: block;
        padding: 10px;
        text-align: center;
        color: #4571a3;
        border-bottom: transparent solid 2px;
    }

    .navbar-default ul li .router-link:hover {
        text-decoration: none;
        border-color: #4571a3;
    }

    .resume-base {
        background-color: #4571a3;
    }


    .navbar-default ul li  .active {
        text-decoration: none;
        font-weight: bold;
    }

    .content-wallpaper, .tutor-left-main-menu {
            margin-top: 1.5rem;
            color: #5d5d5d;
        }

    .profile {
        margin-bottom: 25px;
    }
    .profile .jobster-user-info {
        display: inline-block;
        width: 100%;
    }
    .profile .jobster-user-info .profile-avatar {
        position: relative;
        height: 115px;
        width: 115px;
        border-radius: 10%;
        display: inline-block;
    }
    .profile .jobster-user-info .profile-avatar img {
        border-radius: 10%;
    }
    .profile .jobster-user-info .profile-avatar i {
        font-size: 16px;
        color: tomato;
        position: absolute;
        background: #ffffff;
        border-radius: 100%;
        cursor: pointer;
        height: 30px;
        width: 30px;
        line-height: 30px;
        text-align: center;
        bottom: 20px;
        right: -5px;
    }

    .about-candidate {
        padding: 25px 0px;
    }
    .about-candidate .candidate-info {
        margin-bottom: 20px;
    }

    .resume-experience {
        padding-left: 10px;
        padding-top: 60px;
        padding-bottom: 60px;
        position: relative;
        padding-right: 50px;
        background: #f6f6f6;
    }
    .resume-experience:before {
        position: absolute;
        left: -40%;
        right: 0;
        width: 100%;
        height: 100%;
        background: #f6f6f6;
        content: "";
        z-index: -1;
        top: 0;
    }
    .resume-experience .jobster-candidate-timeline .jobster-timeline-item .jobster-timeline-cricle {
        border-color: #f6f6f6;
    }

    .user-dashboard-info-box .select2-container--default .select2-selection--single .select2-selection__rendered {
        font-weight: bold;
        color: #626262;
    }

    @media (max-width: 1199px) {
        .secondary-menu ul li a {
            padding: 10px 15px;
        }
    }

    @media (max-width: 991px) {
        .resume-experience {
            padding-left: 15px;
            padding-top: 30px;
            padding-bottom: 30px;
            padding-right: 15px;
        }
        .resume-experience:before {
            content: none;
        }
        .secondary-menu ul li {
            display: inline-block;
        }
    }

    @media (max-width: 575px) {
        .secondary-menu ul li a {
            padding: 4px 8px;
        }
    }

    /*****************************
        Progress Bar
    *****************************/
    .progress {
        position: relative;
        overflow: inherit;
        height: 3px;
        margin: 40px 0px 15px;
        width: 100%;
        display: inline-block;
    }
    .progress .progress-bar {
        height: 3px;
        background: tomato;
    }
    .progress .progress-bar-title {
        position: absolute;
        left: 0;
        top: -20px;
        color: #212529;
        font-size: 14px;
        font-weight: 600;
    }
    .progress .progress-bar-number {
        position: absolute;
        right: 0;
        color: #646f79;
        top: -20px;
    }


    /* Jobster Candidate */
    .jobster-candidate-timeline {
        position: relative;
    }
    .jobster-candidate-timeline:before {
        content: "";
        position: absolute;
        left: 20px;
        width: 2px;
        top: 5px;
        bottom: 5px;
        height: calc(100% - 5px);
        background-color: #eeeeee;
    }

    .jobster-candidate-timeline .jobster-timeline-item {
        display: table;
        position: relative;
        margin-bottom: 20px;
        width: 100%;
    }

    .jobster-candidate-timeline .jobster-timeline-item .jobster-timeline-cricle {
        border-radius: 50%;
        border: 12px solid white;
        z-index: 1;
        top: 5px;
        left: 9px;
        position: absolute;
    }
    .jobster-candidate-timeline .jobster-timeline-item .jobster-timeline-cricle:before {
        content: "";
        position: absolute;
        left: 12px;
        width: 20px;
        top: -1px;
        bottom: 5px;
        height: 2px;
        background-color: #eeeeee;
    }
    .jobster-candidate-timeline .jobster-timeline-item .jobster-timeline-cricle > i {
        font-size: 15px;
        top: -8px;
        left: -7px;
        position: absolute;
        color: tomato;
    }

    .jobster-candidate-timeline .jobster-timeline-item .jobster-timeline-info {
        display: table-cell;
        vertical-align: top;
        padding: 5px 0 0 70px;
    }
    .jobster-candidate-timeline .jobster-timeline-item .jobster-timeline-info h6 {
        color: tomato;
        margin: 5px 0 0px;
    }
    .jobster-candidate-timeline .jobster-timeline-item .jobster-timeline-info span {
        color: #212529;
        font-size: 13px;
        font-weight: 500;
    }

    .jobster-candidate-timeline span.jobster-timeline-time {
        color: #646f79 !important;
    }

    .jobster-candidate-timeline .jobster-timeline-icon {
        border: 2px solid #eeeeee;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        line-height: 42px;
        text-align: center;
        background: #ffffff;
        position: relative;
        margin-bottom: 20px;
    }
    .jobster-candidate-timeline .jobster-timeline-icon i {
        font-size: 16px;
        color: #212529;
    }

    .select2-container--default .select2-selection--single .select2-selection__arrow {
        top: 16px;
    }
</style>