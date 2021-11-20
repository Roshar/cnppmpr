<template>
    <div class="col-3">
        <admin-iom-menu1></admin-iom-menu1>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <h4 class="title-page">Индивидуальные образовательные маршруты</h4>
            <hr>
            <h5 class="subtitle-page">Поисковик </h5>
            <div class="row">
                <div class="col-6">
                    <select class="form-control" name="tutorId" v-model="tutorId">
                        <option value="">Выбрать тьютора</option>
                        <option v-for="item in tutor" :value="item.user_id"> {{item.name}} {{item.surname}} </option>
                    </select>
                    <span style="color:tomato" v-if="tutorError"> Обязательное поле</span>
                </div>
                <div class="col-6">
                    <button class="btn btn-outline-secondary btn-block" type="button" @click="request"> Отобразить </button>
                </div>
            </div>
            <hr>
            <div class="search-students" v-if="iom">
                <h5 >Результат поиска </h5>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Нвзвание ИОМ</th>
                        <th scope="col">Автор</th>
                        <th scope="col">Предмет</th>
                        <th scope="col">Открыть</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in iom">
                        <th scope="row">{{index+1}}</th>
                        <td>{{item.title}}</td>
                        <td>{{tutorData[0].surname}} {{tutorData[0].name}}</td>
                        <td>{{tutorData[0]['title_discipline']}} </td>
                        <td>
                            <router-link :to="{ path: `/iom/${item['iom_id']}/${tutorData[0]['user_id']}`}" class="btn-primary-outline" >Открыть</router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
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
    import AdminIomMenu1 from "../../../components/adminMenu/AdminIomMenu1";
    export default {
        setup() {
            const store = useStore()
            const loading = ref(true)
            const currentTime = ref()
            const tutor = ref()
            const tutorData = ref()
            const tutorId = ref('')
            const tutorError = ref(false)
            const iom = ref()

            watch([tutorId],()=> {
                iom.value = null
            })

            const request = async() => {
                if(tutorId.value !== '') {
                    tutorError.value = false
                    const data = await store.dispatch('admin/getAllIomDataByTutorId', {
                        tutorId:tutorId.value
                    })
                    iom.value = data[0]
                    tutorData.value = data[1]
                }else {
                    tutorError.value = true
                    iom.value = null
                }
            }

            onMounted(async()=>{
                loading.value = true
                tutor.value = await store.dispatch('admin/getUsersActive',{filter: false, tbl:'tutors'})
                loading.value = false
            })

            currentTime.value = getDateCurrent()

            return {
                currentTime,
                loading,
                tutor,
                tutorError,
                iom,
                request,
                tutorId,
                tutorData
            }
        },
        components: {AppLoader,AdminIomMenu1}
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