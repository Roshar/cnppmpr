<template>

    <div class="col-3">
        <TutorMainMenu></TutorMainMenu>
    </div>
    <div class="col-9">
        <app-loader v-if="loading"></app-loader>
        <div class="content-loader" v-else>
            <div class="row">
                <div class="col-12">
                    <div class="content-wallpaper">
                        <h5 >Ваш профиль </h5>
                        <div class="main-body">
                            <div class="row gutters-sm">
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex flex-column align-items-center text-center">
                                                <img :src="avatar" alt="Тьютор" id="image" style="border-radius: .4rem" width="250">
                                                <div class="mt-3">
                                                    <h4>{{name}}</h4>
                                                    <p class="text-secondary mb-1">Тьютор</p>
                                                    <p class="text-muted font-size-sm">Возраст: {{age}}{{declensionAge(age)}}</p>
                                                    <button class="btn btn-outline-primary" @click="goToModule('editProfileTutor')">Редактировать профиль</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card mt-3">
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 24 16">
                                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                                                    </svg>Общее количество слушателей:</h6>
                                                <span class="text-secondary">{{students}}</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 24 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                                                    </svg>
                                                    Слушатели с ИОМ</h6>
                                                <span class="text-secondary">{{studentIom}}</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-emoji-frown" viewBox="0 0 24 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                                                    </svg>
                                                   Слушатели без ИОМ:</h6>
                                                <span class="text-secondary">{{withoutIom(students,studentIom )}}</span>
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
                                                    <span> {{surname}} {{name}} {{patronymic}} </span>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Дата рождения</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {{birthday}}
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Email-адрес</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {{login}}
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
                                                    <h6 class="mb-0">Предмет</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {{discipline}}
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
                                        </div>
                                    </div>
                                    <div class="card mb-3">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Общее количество ИОМов</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <span>{{countIom}}</span>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Количество завершивших обучение</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <span>{{finishedIom}}</span>
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
            <div class="row">
                <section class="section services-section" id="services">
                    <div class="container-st">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="section-title">
                                    <h2>Разделы</h2>
                                    <p>Ниже представлены доступные модули </p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <!-- feaure box -->
                            <div class="col-sm-6 col-lg-3">
                                <div class="feature-box-1" @click="goToModule('my_students')">
                                    <div class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                                            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                                        </svg>
                                    </div>
                                    <div class="feature-content">
                                        <h5>Слушатель</h5>
                                        <p>В данном разделе доступна работа со списком ваших слушателей</p>
                                    </div>
                                </div>
                            </div>
                            <!-- / -->
                            <!-- feaure box -->
                            <div class="col-sm-6 col-lg-3">
                                <div class="feature-box-1" @click="goToModule('my_iom')">
                                    <div class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-list-task" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"/>
                                            <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"/>
                                            <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"/>
                                        </svg>
                                    </div>
                                    <div class="feature-content">
                                        <h5>ИОМ</h5>
                                        <p>Раздел для работы с индивидуальными образовательными маршрутами</p>
                                    </div>
                                </div>
                            </div>
                            <!-- / -->
                            <!-- feaure box -->
                            <div class="col-sm-6 col-lg-3" @click="goToModule('library')">
                                <div class="feature-box-1">
                                    <div class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-collection" viewBox="0 0 16 16">
                                            <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
                                        </svg>
                                    </div>
                                    <div class="feature-content">
                                        <h5>Библиотека</h5>
                                        <p>Ваша личная библиотека с заданиями для слушателей</p>
                                    </div>
                                </div>
                            </div>
                            <!-- / -->
                            <!-- feaure box -->
                            <div class="col-sm-6 col-lg-3" @click="goToModule('report')">
                                <div class="feature-box-1">
                                    <div class="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>
                                        </svg>
                                    </div>
                                    <div class="feature-content">
                                        <h5>Отчетность</h5>
                                        <p>В данном разделе находятся отчеты слушателей о выполнении элементов из ИОМ</p>
                                    </div>
                                </div>
                            </div>
                            <!-- / -->
                        </div>
                    </div>
                </section>
            </div>
        </div>

    </div>
</template>
<script>
    import {useStore} from "vuex";

    import {useRouter, useRoute} from 'vue-router'
    import {declensionAge} from "../../utils/declensionAge"
    import {ref,onMounted} from 'vue'
    import AppLoader from "../../components/ui/AppLoader";
    import TutorMainMenu from "../../components/tutorMenu/TutorMainMenu";

    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const name = ref();
            const surname = ref();
            const patronymic = ref();
            const phone = ref();
            const age = ref();
            const birthday = ref();
            const baseUrl = ref(process.env.VUE_APP_URL)
            const avatar = ref();
            const gender = ref();
            const login = ref();
            const discipline = ref();
            let students = ref();
            let token = store.state['auth'].token;
            let statData;
            const loading = ref(true)
            let countIom = ref()
            let studentIom = ref()
            let finishedIom = ref()
            const withoutIom = (countStudent, countStudentIom) => {
                return parseInt(countStudent) - parseInt(countStudentIom)
            }


            const genderVal = (val) => {
                return (val == 'man') ? 'муж': 'жен'
            }

            const goToModule = async(r) => {
                await router.push(`/${r}`)
            }

            const load = () => {
                name.value = store.state['user'].userData.name;
                surname.value = store.state['user'].userData.surname;
                patronymic.value = store.state['user'].userData.patronymic;
                phone.value = store.state['user'].userData.phone;
                age.value = store.state['user'].userData.age;
                birthday.value = store.state['user'].userData.birthday;
                avatar.value = baseUrl.value +'/'+store.state['user'].userData.avatar;
                gender.value = store.state['user'].userData.gender;
                login.value = store.state['user'].userData.login;
                discipline.value = store.state['user'].userData['title_discipline'];
                students.value = (store.state['user'].userLink) ? store.state['user'].userLink['COUNT(*)'] : null
            }

            onMounted(async()=>{
                loading.value = true
                await store.dispatch('tutor/getFromTutorTbls',token)
                statData = await store.state['tutor']
                await load()
                countIom.value = statData.statistics.countIom
                studentIom.value = statData.statistics.studentIom
                finishedIom.value = statData.statistics.finishedIom
                loading.value = false
            })





            return{
                name,
                genderVal,
                surname,
                patronymic,
                phone,
                age,
                birthday,
                avatar,
                gender,
                discipline,
                students,
                countIom,
                studentIom,
                finishedIom,
                loading,
                declensionAge,
                login,
                withoutIom,
                goToModule
            }
        },
        components:{AppLoader,TutorMainMenu}
    }
</script>

<style  scoped>
    ul.ul-style {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    .container-st {
        padding: 14px;
    }
    .feature-box-1 {
        padding: 32px;
        box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
        margin: 15px 0;
        position: relative;
        z-index: 1;
        border-radius: 10px;
        overflow: hidden;
        -moz-transition: ease all 0.35s;
        -o-transition: ease all 0.35s;
        -webkit-transition: ease all 0.35s;
        transition: ease all 0.35s;
        top: 0;
        min-height: 300px;
    }
    .feature-box-1 * {
        -moz-transition: ease all 0.35s;
        -o-transition: ease all 0.35s;
        -webkit-transition: ease all 0.35s;
        transition: ease all 0.35s;
    }
    .feature-box-1 .icon {
        width: 70px;
        height: 70px;
        line-height: 70px;
        background: #fc5356;
        color: #ffffff;
        text-align: center;
        border-radius: 50%;
        margin-bottom: 22px;
        font-size: 27px;
    }
    .feature-box-1 .icon i {
        line-height: 70px;
    }
    .feature-box-1 h5 {
        color: #20247b;
        font-weight: 600;
    }
    .feature-box-1 p {
        margin: 0;
    }
    .feature-box-1 {
        background-color: #ffffffdb;
    }
    .feature-box-1:after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: auto;
        right: 0;
        border-radius: 10px;
        width: 0;
        background: #4571a3;
        z-index: -1;
        -moz-transition: ease all 0.35s;
        -o-transition: ease all 0.35s;
        -webkit-transition: ease all 0.35s;
        transition: ease all 0.35s;
        cursor: pointer;
    }
    .feature-box-1:hover {
        top: -5px;
    }
    .feature-box-1:hover h5 {
        color: #ffffff;
    }
    .feature-box-1:hover p,
    .feature-box-1:hover .ul-style li {
        color: rgba(255, 255, 255, 0.8);
    }
    .feature-box-1:hover:after {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        left: 0;
        right: auto;
    }
    .section {
        padding: 50px 0;
        position: relative;
    }
    .section-title {
        padding-bottom: 45px;
    }
    .section-title h2 {
        font-weight: 700;
        color: #4571a3;
        font-size: 45px;
        margin: 0 0 15px;
        border-left: 5px solid tomato;
        padding-left: 15px;
    }




    .content-wallpaper, .tutor-left-main-menu {
        margin-top: 1.5rem;
        background-color: white;
        color: #5d5d5d;
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

    .card.page_info_wrap {
        border: none;
    }

    .content-wallpaper {
        padding: 25px;
    }

    .outside-block-indent {
        padding:10px 0 10px 0;
    }
    .inside-block-indent {
        margin:10px 0 10px 0;
    }
    ul.counts_module{
        list-style-type: none;
    }
    .counts_module li {
        display: inline-block;
        padding-left: 55px;

    }
    .count {
        text-align: center;
        color: #2a5885;
        font-size: 1.3em;
    }
    .card-flex-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .between-s {
        margin-left: 40px;
    }
    .card-body a {
        color: #ffffff;
    }

</style>