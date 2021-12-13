<template>
    <div class="col-3">
        <StudentMainMenu></StudentMainMenu>
    </div>
    <div class="col-9">
        <app-loader v-if="loading"></app-loader>
        <div class="content-loader" v-else>
            <div class="row">
                <div class="col-12">
                    <div class="content-wallpaper">
                        <h5 >Мой профиль </h5>
                        <div class="main-body">
                            <div class="row gutters-sm">
                                <div class="col-md-4 mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex flex-column align-items-center text-center">
                                                <img :src="avatar" alt="Слушатель" style="border-radius: .4rem" width="250">
                                                <div class="mt-3">
                                                    <h4>{{name}}</h4>
                                                    <p class="text-secondary mb-1">Слушатель</p>
                                                    <p class="text-muted font-size-sm">Возраст:  {{age}}{{declensionAge(age)}}</p>
                                                    <button class="btn btn-outline-primary" @click="goToModule('editProfileStudent')">Редактировать профиль</button>
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
                                                <span class="text-secondary" v-if="tutorId">{{tutorFio}}</span>
                                                <span class="text-secondary" v-else>не назначен</span>
                                            </li>

                                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-book-half" viewBox="0 0 24 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                                </svg>
                                                    ИОМ</h6>
                                                <span class="text-secondary" v-if="issetIom && issetIom.length"> <router-link to="/my_course">{{issetIom[0].title}}</router-link></span>
                                                <span class="text-secondary" v-else>не назначен</span>
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
                                                    <span>{{surname}} {{name}} {{patronymic}}</span>
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
                                    <div class="card mb-3" v-if="showAdditionally">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-sm-4">
                                                    <h6> Дополнительная информация  | </h6>
                                                </div>
                                                <div class="col-sm-8" @click="showAdditionally = false">
                                                    <h6 style="font-size: .9em; font-style: italic; color: #2a5885; cursor: pointer"> Редактировать</h6>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Образование</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {{education_level_title || 'не указано' }}
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Занимаемая должность</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {{position_title || 'не указано'}}
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Педагогический стаж</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {{experience_title || 'не указано'}}
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Квалификационная категория</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    {{category_student_title || 'не указано'}}
                                                </div>
                                            </div>
                                            <hr>
                                        </div>
                                    </div>
                                    <div class="card mb-3" style="border:1px solid tomato" v-else>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-sm-4">
                                                    <h6> Дополнительная информация  | </h6>
                                                </div>
                                                <div class="col-sm-2">
                                                    <button  type="button"  class="btn" style="font-size: .9em; font-style: italic; color: tomato; cursor: pointer"
                                                    @click="saveAdditionally"> Сохранить </button>
                                                </div>
                                                <div class="col-sm-2">
                                                    <button type="button" class="btn" @click="showAdditionally=true" style="font-size: .9em; font-style: italic; color: tomato; cursor: pointer"> Отмена </button>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Образование</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <select class="form-control"  name="education_value" v-model="education_level">
                                                        <option value="0"> не выбрано</option>
                                                        <option v-for="(item, index) in edu_level_list"  :key="item['id']"  :value="item['id']">{{item['title']}}</option>
                                                    </select>

                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Занимаемая должность</h6>
                                                </div>

                                                <div class="col-sm-9 text-secondary">
                                                    <select class="form-control"  name="position" v-model="position">
                                                        <option value="0"> не выбрано</option>
                                                        <option v-for="(item, index) in position_list"  :key="item['id']"  :value="item['id']">{{item['title']}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Педагогический стаж</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <select class="form-control"  name="experience" v-model="experience">
                                                        <option value="0"> не выбрано</option>
                                                        <option v-for="(item, index) in experience_list"  :key="item['id']"  :value="item['id']">{{item['title']}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <hr>
                                            <div class="row">
                                                <div class="col-sm-3">
                                                    <h6 class="mb-0">Квалификационная категория</h6>
                                                </div>
                                                <div class="col-sm-9 text-secondary">
                                                    <select class="form-control"  name="category_student" v-model="category_student">
                                                        <option value="0"> не выбрано</option>
                                                        <option v-for="(item, index) in category_list"  :key="item['id']"  :value="item['id']">{{item['title']}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <hr>
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
    import {useStore} from "vuex";
    import {useRouter, useRoute} from 'vue-router'
    import {declensionAge} from "../../utils/declensionAge"
    import {ref,onMounted} from 'vue'
    import AppLoader from "../../components/ui/AppLoader";
    import StudentMainMenu from "../../components/studentMenu/StudentMainMenu";

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
            const education_level = ref();
            const education_level_title = ref();
            const category_student = ref();
            const category_student_title = ref();
            const experience = ref();
            const experience_title = ref();
            const position = ref();
            const position_title = ref();
            const baseUrl = ref(process.env.VUE_APP_URL)
            const avatar = ref();
            const gender = ref();
            const login = ref();
            const area = ref();
            const school = ref();
            const showAdditionally = ref(true)
            const discipline = ref();
            const students = ref();
            const dependencies = ref()
            const edu_level_list = ref()
            const position_list = ref()
            const experience_list = ref()
            const category_list = ref()
            const tutorId = ref()
            const tutorFio = ref()
            const token = store.state['auth'].token;
            let statData;
            const loading = ref(true)

            const goToModule = async(r) => {
                await router.push(`/${r}`)
            }

            const genderVal = (val) => {
                return (val == 'man') ? 'муж': 'жен'
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
                students.value = (store.state['user'].userLink) ? store.state['user'].userLink['COUNT(*)'] : null
            }

            const getAdditionallyInfo = async() => {

                // получаем данные слушателя
                const studentAdditionallyData = await store.dispatch('student/getStudentAdditionallyOptionById', {
                    studentId: id.value
                })
                if(studentAdditionallyData && studentAdditionallyData.length) {
                    position_title.value = studentAdditionallyData[0]['position_title']
                    category_student_title.value = studentAdditionallyData[0]['category_title']
                    education_level_title.value = studentAdditionallyData[0]['edu_level_title']
                    experience_title.value = studentAdditionallyData[0]['experience_title']


                    experience.value = studentAdditionallyData[0]['experience_id']
                    category_student.value = studentAdditionallyData[0]['category_id']
                    education_level.value = studentAdditionallyData[0]['edu_level_id']
                    position.value = studentAdditionallyData[0]['position_id']
                }


                // список с уровнями образования
                edu_level_list.value = await store.dispatch('student/getEducationLevels')

                // education_level_title.value =
                // список с должностями
                position_list.value = await store.dispatch('student/getPositions')
                // стаж
                experience_list.value = await store.dispatch('student/getExperience')
                // категории учителей
                category_list.value = await store.dispatch('student/getCategoryTeach')
            }


            onMounted(async() => {
                loading.value = true
                await load()
                dependencies.value = store.getters['user/getUserLinks']

                // получение дополнительной информации
                await getAdditionallyInfo()

                if(dependencies.value) {
                    tutorId.value = dependencies.value.user_id
                    tutorFio.value = dependencies.value.surname + ' '+dependencies.value.name+' '+dependencies.value.patronymic
                }
                if(tutorId.value){
                    issetIom.value = await store.dispatch('student/checkIssetMyIom',{
                        tutorId:tutorId.value,
                        studentId: id.value
                    })
                }
                loading.value = false
            })

            const saveAdditionally = async() => {

                if(category_student.value || experience.value || education_level.value || position.value ) {
                    await store.dispatch('student/insertOrUpdateAdditionally', {
                        studentId: id.value,
                        category_id:category_student.value,
                        edu_experience_id:experience.value,
                        education_id:education_level.value,
                        position_id:position.value
                    })

                    await getAdditionallyInfo()
                    showAdditionally.value  = true
                    await router.push('/')

                }



            }


            let tutor = "Вам еще не назначен тьютор";
            if(store.state['user'].userLink){
                tutor = `${store.state['user'].userLink['surname']} ${store.state['user'].userLink['name']} ${store.state['user'].userLink['patronymic']}`
            }


            return{
                name,
                surname,
                patronymic,
                school,
                area,
                phone,
                discipline,
                experience,
                category_student,
                edu_level_list,
                tutor,
                gender,
                saveAdditionally,
                education_level,
                experience_list,
                category_list,
                position,
                showAdditionally,
                genderVal,
                declensionAge,
                position_list,
                avatar,
                birthday,
                age,
                login,
                goToModule,
                issetIom,
                education_level_title,
                position_title,
                experience_title,
                category_student_title,
                tutorId,
                tutorFio,
                loading
            }
        },
        components: {StudentMainMenu,AppLoader}
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