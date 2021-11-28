<template>
    <div class="col-3">
        <TutorMainMenu></TutorMainMenu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <h4 class="title-page">Слушатели, успешно завершившие обучение </h4>
            <hr>
        </div>
        <div class="row">
            <div class="col-12">
                <app-loader v-if="loading"></app-loader>
                <div class="content-wallpaper" v-else>
                    <table class="table" v-if="students && students.length">
                        <thead>
                        <tr>
                            <th scope="col" style="width: 5%" >№</th>
                            <th scope="col" style="width: 20%">ФИО</th>
                            <th scope="col" style="width: 30%">Школа</th>
                            <th scope="col" style="width: 25%">Район</th>
                            <th scope="col" style="width: 20%">ИОМ</th>
                            <th scope="col" >Сформировать отчет</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in students" :key="item['user_id']">
                            <th scope="row">{{index+1}}</th>
                            <td><router-link :to="{path:`/my_student/profile/${item.user_id}`}" class="name_student_link"> {{item.name}} {{item.surname}}</router-link></td>
                            <td>{{item['school_name']}}</td>
                            <td>{{item['title_area']}}</td>
                            <td> <router-link :to="{path:`/my_iom/${item['iom_id']}/exercise`}">{{item.title}}</router-link> </td>
                            <td>
                                <button class="btn btn-primary-outline">Сгенерировать</button> </td>
                        </tr>
                        </tbody>
                    </table>
                    <h4 v-else>Пустой список</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ref, onMounted, computed, watch} from 'vue'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import TutorMainMenu from "../../../components/tutorMenu/TutorMainMenu";
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const loading = ref(true)
            const students = ref()

            onMounted(async() => {
                loading.value = true

                await store.dispatch('finished/getStudentsForTutor', {
                    token: localStorage.getItem('jwt-token')
                })

                students.value = store.getters['finished/finishedStudents']

                loading.value = false
            })

            return {
                loading,
                students
            }
        },
        components: {AppLoader,TutorMainMenu}

    }
</script>

<style scoped>
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
    .title-page {
        color: #4571a3;
    }

    .btn-primary-outline {
        background-color: transparent;
        border:1px solid rgba(69, 113, 163, 0.4) ;
        padding:8px 25px;
        color: #4571a3;
        box-sizing: border-box;

    }
    .btn-primary-outline:hover {
        border-color:#4571a3;
        text-decoration: none;

    }
</style>