<template>
    <div class="col-3">
        <div class="student-menu">
                <nav class="colorlib-main-menu" role="navigation">
                    <ul class="navbar-menu">
                        <li><router-link to="/students"  class="router-link" >Обучающиеся</router-link></li>
                        <li><router-link to="/group"  class="router-link" >Учебные группы</router-link></li>
                        <li><router-link to="/ban"  class="router-link" href="#"> Заблокированные </router-link></li>
                    </ul>
                </nav>
        </div>
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
        <div class="row">
            <div class="col-12">
                <div class="content-wallpaper">
                    <h5 >Последние зарегистрировавшиеся студенты </h5>
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
                        <tr v-for="(item, index) in lastStudents" :key="item.user_id">
                            <th scope="row">{{index+1}}</th>
                            <td>{{item.name}} {{item.surname}}</td>
                            <td>{{item.school_name}}</td>
                            <td>{{item.title_area}}</td>
                            <td>{{item.title_discipline}}</td>
                            {{activeStatus(item.status)}}
                            <td> <input :class="btnActiveClass" :disabled="disabled" type="button" @click="activation(item.user_id)" :value="btnActiveValue">  </td>
                            <td>{{item.created}}</td>
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
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
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
            const lastStudents = ref()
            const btnActiveClass = ref()
            const btnActiveValue = ref()
            const disabled = ref(false)

            watch([searchValue,area_value,discipline_value], async (values) => {
                search.value = true
                console.log(values)
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

            const activeStatus = (val) => {
                if(val === 'on') {
                    btnActiveValue.value = 'Активирован'
                    btnActiveClass.value = 'btn-primary-outline'
                    disabled.value = true
                }else {
                    btnActiveValue.value = 'Активировать'
                    btnActiveClass.value = 'btn-danger-outline'
                    disabled.value = false
                }
            }

            const activation = async (user) => {
                    await store.dispatch('admin/activationById',{userId: user})
                    lastStudents.value = await store.dispatch('admin/getLastUsers',{tbl:'students'})
                    await router.push('/students')
            }


            onMounted(async()=>{
                loading.value = true
                // STUDENT INFO
                areas.value = await store.dispatch('area/getAreas')
                disciplines.value = await store.dispatch('discipline/getDisciplines')
                lastStudents.value = await store.dispatch('admin/getLastUsers',{tbl:'students'})
                console.log(lastStudents.value)
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
                lastStudents,
                activeStatus,
                btnActiveClass,
                btnActiveValue,
                disabled,
                activation
            }
        },
        components: {AppLoader}
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
    .colorlib-main-menu {
        background-color: white;
        width: 100%;
    }
    .colorlib-main-menu ul {
        list-style-type: none;
        width: 100%;
        padding: 0;
    }

    .colorlib-main-menu ul li .router-link {
        display: block;
        padding: 20px;
        text-align: center;
        color: #4571a3;

    }
    .colorlib-main-menu ul li .router-link:hover {
        text-decoration: none;
        background-color:rgba(192,192,192,0.1);
        border-right: rgba(192,192,192,0.3) solid 5px;
    }

    .colorlib-main-menu ul li .active {
        text-decoration: none;
        background-color:rgba(192,192,192,0.1);
        border-right: rgba(192,192,192,0.3) solid 5px;
        color: #4571a3;
        font-weight: 500;
    }

</style>