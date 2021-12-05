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
                        <h5 >Информация о завершенных индивидуальных образовательных маршрутах </h5>
                        <div class="content-wallpaper">
                            <table class="table" v-if="courses.length">
                                <thead>
                                <tr>
                                    <th scope="col" style="width: 3%" >№</th>
                                    <th scope="col" >Наименование ИОМ</th>
                                    <th scope="col"> Тьютор</th>
                                    <th scope="col"> Дата</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, index) in courses" :key="item['iom_id']">
                                    <th scope="row">{{index+1}}</th>
                                    <td>{{item['title']}} </td>
                                    <td>{{item['surname']}} {{item['name']}} {{item['patronymic']}} </td>
                                    <td>{{item['dt']}} </td>
                                </tr>
                                </tbody>
                            </table>
                            <h5 v-else>Пусто</h5>
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
    import {ref,onMounted} from 'vue'
    import AppLoader from "../../../components/ui/AppLoader";
    import StudentMainMenu from "../../../components/studentMenu/StudentMainMenu";
    export default {

        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const courses = ref()
            const loading = ref(true)


            onMounted(async() => {
                loading.value = true

                await store.dispatch('user/getUserData',localStorage.getItem('jwt-token'))
                const studentData = store.getters['user/userData']
                const tutorData = store.getters['user/getUserLinks']
                if(tutorData) {
                    await store.dispatch('finished/getFinishedCourses', {
                        studentId: studentData['user_id'],
                        tutorId: tutorData['user_id'],
                    })
                }
                courses.value = store.getters['finished/getCourses']

                loading.value = false
            })

            return {
                courses,
                loading
            }
        },
        components: {StudentMainMenu,AppLoader}

    }
</script>

<style scoped>
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

</style>