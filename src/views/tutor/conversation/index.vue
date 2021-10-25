<!--<template>-->
<!--    <div class="col-3">-->
<!--        <AdminStudentMenu></AdminStudentMenu>-->
<!--    </div>-->
<!--    <div class="col-9">-->

<!--        <div class="row">-->
<!--            <div class="col-12">-->
<!--                <app-loader v-if="loading"></app-loader>-->

<!--            </div>-->

<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    import {getDateCurrent} from '../../../utils/getDateCurrent'-->
<!--    import {ref, onMounted, computed, watch} from 'vue'-->
<!--    import {useStore} from 'vuex'-->
<!--    import {useRouter} from 'vue-router'-->
<!--    import AppLoader from "../../../components/ui/AppLoader";-->
<!--    import AdminStudentMenu from "../../../components/adminMenu/AdminStudentMenu";-->
<!--    export default {-->
<!--        setup() {-->
<!--            const store = useStore()-->
<!--            const router = useRouter()-->
<!--            const loading = ref(true)-->
<!--            // STUDENTS DATA-->
<!--            const currentTime = ref()-->
<!--            const areas = ref()-->
<!--            const disciplines = ref()-->
<!--            const students = ref()-->
<!--            const banStudents = ref()-->


<!--            const activation = async (user) => {-->
<!--                await store.dispatch('admin/activationById',{userId: user})-->
<!--                banStudents.value = await store.dispatch('admin/getUsersWithBanStatus',{tbl:'students'})-->
<!--                await router.push('/ban')-->
<!--            }-->

<!--            onMounted(async()=>{-->
<!--                loading.value = true-->
<!--                banStudents.value = await store.dispatch('admin/getUsersWithBanStatus',{tbl:'students'})-->
<!--                loading.value = false-->
<!--            })-->


<!--            currentTime.value = getDateCurrent()-->
<!--            return {-->
<!--                currentTime,-->
<!--                loading,-->
<!--                areas,-->
<!--                disciplines,-->
<!--                students,-->
<!--                banStudents,-->
<!--                activation,-->

<!--            }-->
<!--        },-->
<!--        components: {AppLoader, AdminStudentMenu}-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--    .content-wallpaper, .student-menu {-->
<!--        margin-top: 1.5rem;-->
<!--        background-color: white;-->
<!--        color: #5d5d5d;-->
<!--    }-->
<!--    .content-wallpaper {-->
<!--        padding: 25px;-->
<!--    }-->
<!--    .title-page {-->
<!--        color: #4571a3;-->
<!--    }-->
<!--    .bi-person-x-fill {-->
<!--        color: tomato;-->
<!--    }-->
<!--    .bi-person-x-fill:hover{-->
<!--        color: #ff3814;-->
<!--        cursor: pointer;-->
<!--    }-->
<!--    .center-content {-->
<!--        width: 50%;-->
<!--        margin: 0 auto;-->
<!--    }-->
<!--    .inside-block-indent {-->
<!--        margin:10px 0 10px 0;-->
<!--    }-->
<!--    .btn-primary-outline {-->
<!--        background-color: transparent;-->
<!--        border:1px solid rgba(69, 113, 163, 0.4) ;-->
<!--        padding:8px 25px;-->
<!--        color: #4571a3;-->
<!--        box-sizing: border-box;-->
<!--        width:100%;-->

<!--    }-->
<!--    .btn-primary-outline:hover {-->
<!--        border-color:#4571a3;-->
<!--        text-decoration: none;-->

<!--    }-->
<!--    .btn-danger-outline {-->
<!--        background-color: transparent;-->
<!--        border:1px solid rgba(255, 99, 71, 0.4);-->
<!--        padding:8px 25px;-->
<!--        color: tomato;-->
<!--        box-sizing: border-box;-->
<!--        width:100%;-->
<!--    }-->

<!--    .btn-danger-outline:hover {-->
<!--        border-color:tomato-->
<!--    }-->


<!--</style>-->