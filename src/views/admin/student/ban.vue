<template>
    <div class="col-3">
        <admin-profile-menu></admin-profile-menu>
    </div>
    <div class="col-9">

        <div class="row">
            <div class="col-12">

                <app-loader v-if="loading"></app-loader>
                <div class="content-wallpaper" v-else>
                    <h5 class="subtitle-page">Выбрать категорию </h5>
                    <div class="row">
                        <div class="col-6">
                            <select class="form-control" v-model="tblName">
                                <option value="students">Студенты</option>
                                <option value="tutors">Тьюторы</option>
                            </select>
                        </div>
                    </div>
                    <div v-if="studentBanFlag">
                        <h5 >Заблокированные студенты </h5>
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">ФИО</th>
                                <th scope="col">Школа</th>
                                <th scope="col">Район</th>
                                <th scope="col">Предмет</th>
                                <th scope="col">Активация</th>
                                <th scope="col">Дата регистрации</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in banUsers" :key="item.user_id">
                                <th scope="row">{{index+1}}</th>
                                <td>{{item.name}} {{item.surname}}</td>
                                <td>{{item.school_name}}</td>
                                <td>{{item.title_area}}</td>
                                <td>{{item.title_discipline}}</td>
                                <td> <input class="btn-primary-outline"  type="button" @click="activation(item.user_id)" value="Разблокировать">  </td>
                                <td>{{item.created}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-if="tutorBanFlag">
                        <h5 >Заблокированные тьюторы </h5>
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">ФИО</th>
                                <th scope="col">Предмет</th>
                                <th scope="col">Активация</th>
                                <th scope="col">Дата регистрации</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in banUsers" :key="item.user_id">
                                <th scope="row">{{index+1}}</th>
                                <td>{{item.name}} {{item.surname}}</td>
                                <td>{{item.title_discipline}}</td>
                                <td> <input class="btn-primary-outline"  type="button" @click="activation(item.user_id)" value="Разблокировать">  </td>
                                <td>{{item.created}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
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
            // STUDENTS DATA
            const currentTime = ref()
            const areas = ref()
            const disciplines = ref()
            const students = ref()
            const banUsers = ref()
            const studentBanFlag = ref(true)
            const tutorBanFlag = ref(false)
            const tblName = ref('students')

            watch([tblName], async()=>{
                if(tblName.value === 'students') {
                    studentBanFlag.value = true
                    tutorBanFlag.value = false
                }else {
                    studentBanFlag.value = false
                    tutorBanFlag.value = true
                }
                banUsers.value = await getUsers(tblName.value)
            })

            const getUsers = async(name = 'students') => {
                return  await store.dispatch('admin/getUsersWithBanStatus',{tbl:name})
            }

            const activation = async (user) => {
                await store.dispatch('admin/activationById',{userId: user})
                banUsers.value = await getUsers(tblName.value)
                window.location.href = '/ban'
                // await router.push('/ban')
            }

            onMounted(async()=>{
                loading.value = true
                banUsers.value = await getUsers()
                loading.value = false
            })


            currentTime.value = getDateCurrent()
            return {
                currentTime,
                loading,
                areas,
                studentBanFlag,
                tutorBanFlag,
                disciplines,
                students,
                banUsers,
                activation,
                tblName

            }
        },
        components: {AppLoader, AdminProfileMenu}
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