<template>
    <div class="col-3">
        <admin-student-menu></admin-student-menu>
    </div>
    <div class="col-9">
        <div class="content-wallpaper">
            <h4 class="title-page">Обучающиеся</h4>
            <hr>
            <h5 class="subtitle-page">Поисковик </h5>
            <div class="row">
                <div class="col-4">
                    <label> Найти по имени или фамилию</label>
                    <input type="text" class="form-control" v-model="searchValue"  placeholder="Введите имя или фамилию">
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
            <div class="search-students" v-if="search">
                <h5 >Результат поиска </h5>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">ФИО</th>
                        <th scope="col">Школа</th>
                        <th scope="col">Район</th>
                        <th scope="col">Предмет</th>
                        <th scope="col">Дата рождения</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in students">
                        <th scope="row">{{index+1}}</th>
                        <td>{{item.name}} {{item.surname}}</td>
                        <td>{{item.school_name}}</td>
                        <td>{{item.title_area}}</td>
                        <td>{{item.title_discipline}}</td>
                        <td>{{item.birthday}}</td>
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
    import AdminStudentMenu from "../../../components/adminMenu/AdminStudentMenu";
    export default {
        setup() {
            const store = useStore()
            const loading = ref(true)
            const search = ref(false)
            const discipline_value = ref("0")
            const area_value = ref("0")
            const searchValue = ref()
            // STUDENTS DATA
            const currentTime = ref()
            const areas = ref()
            const disciplines = ref()
            const students = ref()

            watch([searchValue,area_value,discipline_value], async (values) => {
                search.value = true
                if(values[0] !== '') {
                    students.value = await store.dispatch('admin/liveSearch',
                        {param:searchValue.value,
                            tbl:'students',
                            areaId: area_value.value,
                            disId: discipline_value.value
                        })
                }else {
                    search.value = false
                    students.value = []
                }
            })

            onMounted(async()=>{
                loading.value = true
                // STUDENT INFO
                areas.value = await store.dispatch('area/getAreas')
                disciplines.value = await store.dispatch('discipline/getDisciplines')
                //AREA INFO
                loading.value = false
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
                searchValue,
                students,

            }
        },
        components: {AppLoader,AdminStudentMenu}
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