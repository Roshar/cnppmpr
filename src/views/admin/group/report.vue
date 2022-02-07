<template>
    <div class="col-3">
        <admin-profile-group-menu :id="currentGroup" :title="title"></admin-profile-group-menu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <div class="row">
                <div class="col-12">
                    <h4 class="title-page">Список слушателей, прошедших обучение (за весь период) </h4>
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <label> Фильтр: Индивидуальный образовательный маршрут</label>
                    <select class="form-control" name="gender" v-model="iomId">
                        <option value="">Выбрать индивидуальный образовательный маршрут</option>
                        <option v-for="item in iomList" :value="item.iom_id">{{item.title}}</option>
                    </select>
                </div>
            </div>
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
                            <th scope="col" >Дата начала обучения</th>
                            <th scope="col" >Дата окончания обучения</th>
                            <th scope="col" >Сформировать отчет</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in students" :key="item['user_id']">
                            <th scope="row">{{index+1}}</th>
                            <td><router-link :to="{path:`/student/profile/${item.user_id}`}" class="name_student_link"> {{item.name}} {{item.surname}}</router-link></td>
                            <td>{{item['school_name']}}</td>
                            <td>{{item['title_area']}}</td>
                            <td> <router-link :to="{path:`/iom/${item['iom_id']}/${tutorId}`}">{{item.title}}</router-link> </td>
                            <td> {{item['start_education']}}</td>
                            <td> {{item['end_education']}}</td>

                            <td v-if="item['dump_link']">
                                <a :href="generationLink(item['dump_link'])" target="_blank" class="btn btn-primary-outline"  >Скачать</a>
                            </td>
                            <td v-else>
                                <button class="btn btn-primary-outline" type="button" @click="generationReport(item['user_id'],item['iom_id'])">Сгенерировать</button>
                            </td>
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
    import {useRouter, useRoute} from 'vue-router'
    import AppLoader from "../../../components/ui/AppLoader";
    import AdminProfileGroupMenu from "../../../components/adminMenu/AdminProfileGroupMenu";

    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const route = useRoute()
            const baseUrl = ref(process.env.VUE_APP_URL)
            const loading = ref(true)
            const students = ref()
            const groupData = ref()
            const tutorId = ref()
            const iomId = ref('')
            const iomList = ref()
            const title = ref()
            const currentGroup = ref()
            const token = ref(localStorage.getItem('jwt-token'))

            const generationReport = async(student_id, iom_id) => {
                loading.value = true
                await store.dispatch('finished/generationReportByStudentEducation', {
                    student_id,
                    iom_id,
                    token: token.value
                })
                await store.dispatch('finished/getStudentsForTutor', {
                    token: localStorage.getItem('jwt-token')
                })
                students.value = store.getters['finished/finishedStudents']
                loading.value = false
            }

            const generationLink = (link)=> {
                return baseUrl.value+'/'+link
            }

            watch([iomId],async(iomId)=>{
                if(iomId[0]) {
                    students.value = await store.dispatch('finished/getStudentsForAdminByIomId', {
                        iomId: iomId[0],
                        tutorId: groupData.value['tutor_id']
                    })
                }else {
                    students.value = await store.dispatch('finished/getStudentsForAdminByIomId', {
                        iomId: null,
                        tutorId: groupData.value['tutor_id']
                    })
                }

            })

            onMounted(async() => {
                loading.value = true
                groupData.value = await store.dispatch('admin/getGroupById',{groupId: route.params.id})
                if(groupData.value) {
                    students.value = await store.dispatch('finished/getStudentsForAdminByIomId', {
                        iomId: null,
                        tutorId: groupData.value['tutor_id']
                    })
                    const iomAndTutorData = await store.dispatch('admin/getAllIomDataByTutorId', {
                        tutorId:groupData.value['tutor_id']
                    })

                    if(iomAndTutorData.length && iomAndTutorData[0].length )
                    iomList.value = iomAndTutorData[0]
                }

                tutorId.value = groupData.value['tutor_id']

                currentGroup.value = groupData.value['id']
                title.value = groupData.value.title
                loading.value = false
            })

            return {
                loading,
                students,
                generationReport,
                generationLink,
                currentGroup,
                title,
                tutorId,
                iomId,
                iomList
            }
        },
        components: {AppLoader,AdminProfileGroupMenu}

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