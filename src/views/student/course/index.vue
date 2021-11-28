<template>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
        <div class="col-12 navbar-col">
            <div class="row justify-content-center">
                <div class="col-9 ">
                    <div id="subnav"  class="navbar navbar-default">
                        <ul class="navbar-default">
                            <li><router-link to="/"  class="router-link" >Личный профиль</router-link></li>
                            <li><router-link to="/my_course"  class="router-link" >Мой индивидуальный образовательный маршрут</router-link></li>
                            <li><router-link to="/my_box"  class="router-link" >Моя копилка</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-9">
            <app-loader v-if="loading"></app-loader>
            <div class="content-loader" v-else>
                <div class="modal-form2" v-if="showModalNotice">
                    <div class="modal-dialog modal-confirm">
                        <div class="modal-content">
                            <div class="modal-header flex-column">
                                <div class="icon-box">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="modal-body">
                                <p> Для завершения обучения необходимо выполнить все задания </p>
                            </div>
                            <div class="modal-footer justify-content-center">
                                <button type="button" class="btn btn-secondary"  @click="showModalNotice = false" data-dismiss="modal">Понятно</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-form" v-if="showModalSuccess">
                    <form  id="form">
                        <div class="row">
                            <div class="col-12">
                                <span style="float:right" @click="showModalSuccess=false"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                      <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                      </svg>
                                </span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label style="font-style: italic"> Оцените обучение по 5 бальной шкале (где 5- высшая оценка, 1-низшая)</label>
                            <select class="form-control" name="mark"  v-model="mark"  required  >
                                <option value="5">5 </option>
                                <option value="4">4 </option>
                                <option value="3">3 </option>
                                <option value="2">2 </option>
                                <option value="1">1  </option>
                            </select>
                            <small style="color:tomato" v-if="markError">Необходимо оценить обучение</small>
                        </div>

                        <div class="form-group">
                            <span>Мы будем признательны Вам за комментарий и замечание и обязательно учтем Ваши пожелания в дальнейшей работе.</span>
                            <label class="message_element">Ваш комментарий:</label>
                            <textarea class="form-control" cols="70" rows="6" id="description" v-model="messageBody"  name="message" placeholder="Ваш комментарий"></textarea>
                        </div>
                        <button type="button" class="btn btn-block btn-outline-primary-send" @click="finishEdu">Отправить оценку и заврешить обучение</button>
                    </form>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <div class="row align-items-top">
                            <div class="col-lg-4" >
                                <div class="resume-base  user-dashboard-info-box p-4">
                                    <div class="profile">
                                        <div class="jobster-user-info">
                                            <div class="profile-avatar">
                                                <img class="img-fluid " alt="слушатель"  style="max-height: 120px" :src="avatar">
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
                                    <div class="mt-0" v-if="!statusInCurrentIomFinished">
                                        <div v-if="issetIom">
                                            <h5 class="text-white">Ваш прогресс по прохождению ИОМ</h5>
                                            <h6 class="text-white">(индивидуальный образовательный маршрут)</h6>
                                            <br>
                                            <div class="candidate-info">
                                                <p class="text-white">Общее количество мероприятий(заданий): {{common_exe}}</p>
                                            </div>
                                            <div class="progress bg-dark">
                                                <div class="progress-bar bg-white" role="progressbar" :style="createGraphics(finished_exe,common_exe)" aria-valuenow="{{finished_exe}}" aria-valuemin="0" aria-valuemax="{{common_exe}}">
                                                    <div class="progress-bar-title text-white">Количество выполненных заданий</div>
                                                    <span class="progress-bar-number text-white">{{finished_exe}}</span>
                                                </div>
                                            </div>
                                            <div class="progress bg-dark">
                                                <div class="progress-bar bg-white" role="progressbar" :style="createGraphics(edit_exe,common_exe)" aria-valuenow="{{edit_exe}}" aria-valuemin="0" aria-valuemax="{{common_exe}}">
                                                    <div class="progress-bar-title text-white">Количество заданий требующих доработку</div>
                                                    <span class="progress-bar-number text-white">{{edit_exe}}</span>
                                                </div>
                                            </div>
                                            <div class="progress bg-dark">
                                                <div class="progress-bar bg-white" role="progressbar" :style="createGraphics(check_exe,common_exe)" aria-valuenow="{{check_exe}}" aria-valuemin="0" aria-valuemax="{{common_exe}}">
                                                    <div class="progress-bar-title text-white">Количество заданий на проверке</div>
                                                    <span class="progress-bar-number text-white">{{check_exe}}</span>
                                                </div>
                                            </div>
                                            <div class="progress bg-dark">
                                                <div class="progress-bar bg-white" role="progressbar" :style="createGraphics(active_exe,common_exe)" aria-valuenow="{{active_exe}}" aria-valuemin="0" aria-valuemax="{{check_exe}}">
                                                    <div class="progress-bar-title text-white">Количество незавершенных заданий</div>
                                                    <span class="progress-bar-number text-white">{{active_exe}}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div v-else>
                                            <h5 class="text-white">Ваш прогресс будет доступен после назначения ИОМ</h5>
                                        </div>

                                    </div>
                                    <div class="mt-0" v-if="statusInCurrentIomFinished">
                                        <h5 class="text-white">Текущий индивидуальный маршрут успешно пройден!</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-7" v-if="!statusInCurrentIomFinished">
                                <div v-if="issetIom">
                                    <button type="button" v-if="readyFinishedStatus" @click="showModalSuccess = true" class="btn btn-block btn-outline-primary">Завершить обучение</button>
                                    <button type="button" v-else class="btn btn-block btn-outline-primary" @click="showModalNotice = true" >Завершить обучение</button>
                                    <div class="resume-experience">
                                        <div v-if="readyFinishedStatus"> Вы выполнили все задания в своем индивидуальном образовательном маршруте и теперь можеть завершить обучение.</div>
                                        <hr>
                                        <h5 class="title-page">Мой индивидуальный образовательный маршрут</h5>
                                        <div class="timeline-box" v-if="tagsData" v-for="tag in tagsData" >
                                            <h5 class="resume-experience-title">
                                                {{tag.title_tag}}</h5>
                                            <div v-if="exerciseData" v-for="item in exerciseData">
                                                <div class="jobster-candidate-timeline active_block"   v-if="item.accepted === null && (item['on_check'] === 0 || item['on_check'] === null)"  @click="openTask(item.id_exercises,item.iom_id)">
                                                    <div class="jobster-timeline-item " v-if="filterData(tag.tag_id,item.tag_id)">
                                                        <div class="jobster-timeline-cricle">
                                                            <i class="active far fa-circle"></i>
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
                                                <div class="jobster-candidate-timeline done"   v-if="item.accepted === 1 && item['on_check'] === 0 " @click="openTask(item.id_exercises,item.iom_id)" >
                                                    <div class="jobster-timeline-item" v-if="filterData(tag.tag_id,item.tag_id)">
                                                        <div class="jobster-timeline-info" >
                                                            <div class="dashboard-timeline-info ">
                                                                <span class="jobster-timeline-time"> Срок выполнения: {{checkTerm(item['term'], item['term'].split('.').reverse().join('-'))}}</span>
                                                                <h6 class="mb-2" style="color: green"> <span style="color:#646f79">Наименование: </span>{{ item.title}}</h6>
                                                                <span style="font-style: italic; background-color: green; color:white;padding: 4px"> Статус: Ответ принят</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="jobster-candidate-timeline pendding pendding_block"   v-if="item.accepted === 2 && item['on_check'] === 0"  @click="openTask(item.id_exercises,item.iom_id)">
                                                    <div class="jobster-timeline-item" v-if="filterData(tag.tag_id,item.tag_id)">
                                                        <div class="jobster-timeline-info" >
                                                            <div class="dashboard-timeline-info">
                                                                <span class="jobster-timeline-time"> Срок выполнения: {{checkTerm(item['term'], item['term'].split('.').reverse().join('-'))}}</span>
                                                                <h6 class="mb-2" style="color: orange"> <span style="color:#646f79">Наименование: </span>{{ item.title}}</h6>
                                                                <span style="font-style: italic; background-color: orange; color:white;padding: 4px"> Статус: Необходимо внести корректировки в ответ</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="jobster-candidate-timeline on_check_block"   v-if="item['on_check'] === 1" >
                                                    <div class="jobster-timeline-item" v-if="filterData(tag.tag_id,item.tag_id)">
                                                        <div class="jobster-timeline-info" >
                                                            <div class="dashboard-timeline-info">
                                                                <span class="jobster-timeline-time"> Срок выполнения: {{checkTerm(item['term'], item['term'].split('.').reverse().join('-'))}}</span>
                                                                <h6 class="mb-2" style="color: blueviolet"> <span style="color:#646f79">Наименование: </span>{{ item.title}}</h6>
                                                                <span style="font-style: italic; background-color: blueviolet; color:white;padding: 4px"> Статус: На проверке</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <h5 class="title-page">Вам еще не назначен индивидуальный образовательный маршрут</h5>
                                </div>
                            </div>
                            <div class="col-lg-7" v-if="statusInCurrentIomFinished">
                                <h5 class="title-page">Текущий индивидуальный маршрут успешно пройден!</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <transition  name="fade" appear>
            <div class="modal-overlay" v-if="showModalNotice || showModalSuccess" @click="clearOverlay">
            </div>
        </transition>
</template>

<script>
    import StudentMainMenu from "../../../components/studentMenu/StudentMainMenu";
    import {onMounted, ref} from "vue";
    import {useStore} from "vuex";
    import AppLoader from "../../../components/ui/AppLoader";
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
            const markError = ref(false)
            const mark = ref("5")
            const readyFinishedStatus = ref(false)
            const showModalNotice = ref(false)
            const showModalSuccess = ref(false)
            const common_exe = ref(0)
            const finished_exe = ref(0)
            const edit_exe = ref(0)
            const check_exe = ref(0)
            const active_exe = ref(0)
            const age = ref();
            const messageBody = ref();
            const birthday = ref();
            const baseUrl = ref(process.env.VUE_APP_URL)
            const avatar = ref();
            const gender = ref();
            const login = ref();
            const area = ref();
            const school = ref();
            const discipline = ref();
            const statusInCurrentIomFinished = ref(false)
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

            const clearOverlay = () => {
                showModalSuccess.value = false
                showModalNotice.value = false
            }

            const filterData = (parentId, childId) => {
                return parentId === childId ? true : false
            }

            const finishEdu = async() => {
                if(mark.value) {
                    await store.dispatch('finished/studentEducation', {
                        iomId: issetIom.value[0]['iom_id'],
                        tutorId: tutorId.value,
                        token: localStorage.getItem('jwt-token'),
                        recall: messageBody.value || 'Отсутствует',
                        mark: mark.value
                    })
                    await checkStatusCurrentIom()
                    showModalSuccess.value = false

                }else {
                    markError.value = true
                }
            }

            const readyFinishFunc = (countTask, readyTask) => {
                return (countTask === readyTask) ? readyFinishedStatus.value = true : readyFinishedStatus.value = false
            }

            const createGraphics = (currentValue, maxValue) => {
                if(currentValue === 0 || maxValue === 0) {
                    return 'width: 0%'
                }else {
                    let res = currentValue/maxValue * 100
                    return 'width:' + String(res) + '%'
                }
            }

            const checkStatusCurrentIom = async() => {
                await store.dispatch('finished/checkStudentIOM',{
                    iomId: issetIom.value[0]['iom_id'],
                    tutorId:tutorId.value,
                    token: localStorage.getItem('jwt-token')
                })
                statusInCurrentIomFinished.value = store.getters['finished/getStatusByIOM'].length
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

                        await checkStatusCurrentIom()

                        await store.dispatch('student/getExercisesFromMyIom',{
                            iomId: issetIom.value[0]['iom_id'],
                            tutorId:tutorId.value,
                            token: localStorage.getItem('jwt-token')
                        } )

                        exerciseData.value = store.getters['student/getExercisesMyIom']

                        common_exe.value = exerciseData.value.length
                        if(common_exe.value) {
                           const statisticsIOM = await store.dispatch('student/getStatisticByIOM', {
                                iomId:  exerciseData.value[0]['iom_id'],
                                userId: id.value,
                                tutorId: tutorId.value
                            })
                            // завершено
                            finished_exe.value = statisticsIOM[0][0]['id']
                            // требует доробтку
                            edit_exe.value = statisticsIOM[1][0]['id']
                            // на проверке
                            check_exe.value = statisticsIOM[2][0]['id']
                            // не завершено
                            active_exe.value = common_exe.value - statisticsIOM[0][0]['id']
                        }
                        tagsData.value = store.getters['student/getTagsMyIom']

                        readyFinishFunc(common_exe.value,finished_exe.value)

                    }
                }
                loading.value = false
            })

            const openTask = (taskId, iomId) => {
                router.push(`/my_course/${iomId}/${taskId}/${tutorId.value}`)
            }

            return {
                name,
                showModalSuccess,
                surname,
                setAuthor,
                patronymic,
                readyFinishedStatus,
                school,
                statusInCurrentIomFinished,
                clearOverlay,
                area,
                loading,
                phone,
                discipline,
                createGraphics,
                showModalNotice,
                gender,
                edit_exe,
                check_exe,
                finished_exe,
                filterData,
                declensionAge,
                openTask,
                messageBody,
                exerciseData,
                checkTerm,
                active_exe,
                shortContent,
                common_exe,
                avatar,
                mark,
                markError,
                birthday,
                finishEdu,
                age,
                login,
                issetIom,
                tutorId,
                tutorFio,
                tagsData,
                clearHTML

            }
        },
        components:{StudentMainMenu,AppLoader}

    }
</script>

<style scoped>

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

    .modal-form2{
        position: fixed;
        top: 27%;
        left: 50%;
        transform: translate(-50%,-27%);
        z-index: 99;
        /*max-width:400px;*/
        background-color: #edeef0;
    }

    .btn-outline-primary {
        color: #4571a3;
        border-color: #4571a3;
    }
    .btn-outline-primary:hover {
        color: #fff;
        background-color: #4571a3;
        border-color: #4571a3;
    }

    /*.jobster-candidate-timeline:hover {*/
    /*    background-color:rgba(167, 199, 231, .6);*/
    /*    cursor: pointer;*/
    /*}*/

    .active_block:hover {
        background-color:rgba(167, 199, 231, .6);
        cursor: pointer;
    }

    .done:hover {
        background-color:#b4ecb4;
        cursor: pointer;
    }

    .pendding_block, .done {
        padding: 15px 0px;
    }

    .pendding_block:hover {
        background-color:#ffc87a;
        cursor: pointer;
    }

    .modal-overlay,.modal-overlay2 {
        position: absolute;
        height: 100vh;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 98;
        background-color: rgba(0,0,0, 0.5);
    }



    /*.done_block:hover {*/
    /*    background-color:rgba(167, 199, 231, .6);*/
    /*    cursor: pointer;*/
    /*}*/

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
    .jobster-candidate-timeline.done:before {
        content: "";
        position: absolute;
        left: 20px;
        width: 2px;
        top: 5px;
        bottom: 5px;
        height: calc(100% - 5px);
        background-color: green;
    }

    .jobster-candidate-timeline.pendding:before {
        content: "";
        position: absolute;
        left: 20px;
        width: 2px;
        top: 5px;
        bottom: 5px;
        height: calc(100% - 5px);
        background-color: orange;
    }

    .jobster-candidate-timeline.on_check_block:before {
        content: "";
        position: absolute;
        left: 20px;
        width: 2px;
        top: 5px;
        bottom: 5px;
        height: calc(100% - 5px);
        background-color: blueviolet;
    }




    .jobster-candidate-timeline .jobster-timeline-item {
        display: table;
        position: relative;
        margin-bottom: 20px;
        width: 100%;
    }

    .jobster-candidate-timeline .jobster-timeline-item .jobster-timeline-cricle {
        border-radius: 50%;
        border: 13px solid white;
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
    .done .jobster-timeline-item .jobster-timeline-cricle:before {
        content: "";
        position: absolute;
        left: 12px;
        width: 20px;
        top: -1px;
        bottom: 5px;
        height: 2px;
        background-color: green;
    }

    .jobster-candidate-timeline .jobster-timeline-item .jobster-timeline-cricle > i.active {
        font-size: 15px;
        top: -8px;
        left: -7px;
        position: absolute;
        color: tomato;
    }
    .jobster-candidate-timeline .jobster-timeline-item .jobster-timeline-cricle > i.done {
        color: green;
    }

    .jobster-candidate-timeline .jobster-timeline-item .jobster-timeline-cricle > i.pendding {
        color: orange;
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