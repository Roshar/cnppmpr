<template>
    <div class="col-3">
        <admin-profile-menu></admin-profile-menu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <h4 class="title-page">Обучающиеся</h4>
            <hr>
            <h5 class="subtitle-page">Отсортировать по параметрам </h5>
            <div class="row">
                <div class="col-4">
                    <label> Пол</label>
                    <select class="form-control" name="gender" v-model="gender_value">
                        <option value="0">Выбрать пол</option>
                        <option value="man">Муж</option>
                        <option value="woman">Жен</option>
                    </select>
                </div>
                <div class="col-4">
                    <label > Район</label>
                    <select class="form-control" name="area" v-model="area_value">
                        <option value="0">Выбрать район</option>
                        <option v-for="(item, index) in areas" :value="item.id_area">{{item.title_area}}</option>
                    </select>
                </div>
                <div class="col-4">
                    <label > Предмет</label>
                    <select class="form-control" name="discipline" v-model="discipline_value">
                        <option value="0">Выбрать предмет</option>
                        <option v-for="(item, index) in disciplines" :value="item.id_dis">{{item.title_discipline}}</option>
                    </select>
                </div>
            </div>
            <hr>
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
                                <th scope="col" style="width: 3%" >№</th>
                                <th scope="col" style="width: 15%">ФИО</th>
                                <th scope="col" style="width: 20%">Школа</th>
                                <th scope="col" style="width: 15%">Район</th>
                                <th scope="col" style="width: 15%">Предмет</th>
                                <th scope="col" style="width: 7%">Дата регистрации</th>
                                <th scope="col" style="width: 5%">Деактивация</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in students" :key="item.user_id">
                            <th scope="row">{{index+1}}</th>
                            <td ><router-link :to="{path:`/student/profile/${item.user_id}`}" class="name_student_link">  {{item.surname}} {{item.name}}</router-link></td>
                            <td>{{item.school_name}}</td>
                            <td>{{item.title_area}}</td>
                            <td>{{item.title_discipline}}</td>
                            <td>{{item.created}}</td>
                            <td>
                                <div style="text-align: center" @click="deactivationUser(item.user_id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-person-x-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getDateCurrent} from '../../../utils/getDateCurrent'
    import {ref, onMounted, computed, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import AdminProfileMenu from "../../../components/adminMenu/AdminProfileMenu";
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const loading = ref(true)
            const search = ref(false)
            const discipline_value = ref("0")
            const area_value = ref("0")
            const gender_value = ref("0")
            // STUDENTS DATA
            const currentTime = ref()
            const areas = ref()
            const disciplines = ref()
            const students = ref()
            const lastStudents = ref()
            const btnActiveClass = ref()
            const btnActiveValue = ref()
            const countNum = ref(0)
            const disabled = ref(false)
            const deactivation = ref(false)

            watch([gender_value, area_value, discipline_value], async (values) => {
                // search.value = true
                if(values[0] !== '0' || values[1] !== '0' || values[2] !== '0' ) {
                    students.value = await store.dispatch('admin/getUsersActive',
                        {filter: true,
                                tbl:'students',
                                areaId: area_value.value,
                                disId: discipline_value.value,
                                gender: gender_value.value,
                                })
                    countNum.value = students.value.length ? students.value.length : 0
                }else {
                    search.value = false
                    students.value = await store.dispatch('admin/getUsersActive',{filter: false, tbl:'students'})
                    console.log(students.value.length)
                    countNum.value = students.value.length ? students.value.length : 0
                }
            })

            const deactivationUser = async (user) => {
                await store.dispatch('admin/deactivationById',{userId: user})
                students.value = await store.dispatch('admin/getUsersActive',{filter: false, tbl:'students'})
                countNum.value = students.value.length ? students.value.length : 0
                await router.push('/students')
            }


            onMounted(async()=>{
                let date = new Date();
                console.log(date.getSeconds())
                loading.value = true
                areas.value = await store.dispatch('area/getAreas')
                disciplines.value = await store.dispatch('discipline/getDisciplines')
                students.value = await store.dispatch('admin/getUsersActive',{filter: false, tbl:'students'})
                countNum.value = students.value.length ? students.value.length : 0
                loading.value = false
                let date2 = new Date();
                console.log(date2.getSeconds())
            })


            currentTime.value = getDateCurrent()
            return {
                currentTime,
                loading,
                search,
                areas,
                disciplines,
                discipline_value,
                area_value,
                students,
                lastStudents,
                btnActiveClass,
                btnActiveValue,
                disabled,
                deactivation,
                deactivationUser,
                gender_value,
                countNum
            }
        },
        components: {AppLoader,AdminProfileMenu}
    }
</script>

<style scoped>
    .content-wallpaper, .student-menu {
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

    .btn-danger-outline:hover {
        border-color:tomato
    }



</style>