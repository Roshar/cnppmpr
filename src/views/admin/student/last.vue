<template>
    <div class="col-3">
        <admin-profile-menu></admin-profile-menu>
    </div>
    <div class="col-9">
        <app-loader v-if="loading"></app-loader>
        <div class="content-wallpaper" v-else>
            <h5 >Последние зарегистрировавшиеся слушатели </h5>

            <div class="row">
                <div class="col-6">
                    <label > Категория пользователей</label>
                    <select class="form-control" name="category"  @change="checkUser" v-model="category">
                        <option value="0">Выбрать категорию зарегистрировавшихся</option>
                        <option value="/last_student"> Студенты</option>
                        <option value="/last_tutor"> Тьюторы</option>
                    </select>
                </div>
            </div>
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
                    <th scope="col">Деактивация</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in lastStudents" :key="item.user_id">
                    <th scope="row">{{index+1}}</th>
                    <td> {{item.surname}} {{item.name}} </td>
                    <td>{{item['school_name']}} </td>
                    <td>{{item['title_area']}} </td>
                    <td>{{item['title_discipline']}}</td>
                    <td>
                        <input  :class="setBtnActiveClass(item.status)"
                                :disabled="disabled(item.status)"
                                type="button"
                                @click="activation(item.user_id)" :value="setBtnActiveValue(item.status)">
                    </td>
                    <td>{{item.created}}</td>
                    <td>
                        <div v-if="deactivation(item.status)" style="text-align: center" @click="deactivationUser(item.user_id)">
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
</template>

<script>

    import {ref, onMounted, computed, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter, useRoute} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import AdminProfileMenu from "../../../components/adminMenu/AdminProfileMenu";
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const loading = ref(true)
            // STUDENTS DATA
            const currentTime = ref()
            const areas = ref()
            const disciplines = ref()
            const students = ref()
            const category = ref(route.path)
            const lastStudents = ref()
            const btnActiveClass = ref()
            const btnActiveValue = ref()


            const checkUser = () => {
                router.push(category.value)
            }


            const setBtnActiveValue = (val) => {
                return (val === 'on') ? 'Активирован' : 'Активировать'
            }

            const setBtnActiveClass = (val) => {
                return (val === 'on') ? 'btn-primary-outline' : 'btn-danger-outline'
            }

            const disabled = (val) => {
                return (val === 'on') ? true : false
            }

            const deactivation = (val) => {
                return (val === 'on') ? true : false
            }


            const deactivationUser = async (user) => {
                await store.dispatch('admin/deactivationById',{userId: user})
                lastStudents.value = await store.dispatch('admin/getLastUsers',{tbl:'students'})
                window.location.href = '/last_student'
            }

            const activation = async (user) => {
                await store.dispatch('admin/activationById',{userId: user})
                lastStudents.value = await store.dispatch('admin/getLastUsers',{tbl:'students'})
                window.location.href = '/last_student'
            }

            onMounted(async()=>{
                loading.value = true
                // STUDENT INFO
                areas.value = await store.dispatch('area/getAreas')
                disciplines.value = await store.dispatch('discipline/getDisciplines')
                //lastStudents.value = await store.dispatch('admin/getLastUsers',{tbl:'tutors'})
                lastStudents.value = await store.dispatch('admin/getLastUsers',{tbl:'students'})
                console.log(lastStudents.value)
                //AREA INFO
                loading.value = false
            })


            return {
                loading,
                areas,
                disciplines,
                students,
                lastStudents,
                setBtnActiveClass,
                setBtnActiveValue,
                btnActiveClass,
                btnActiveValue,
                disabled,
                activation,
                deactivation,
                deactivationUser,
                category,
                checkUser
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