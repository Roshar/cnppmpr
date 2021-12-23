<template>
    <div class="col-3">
        <TutorMainMenu></TutorMainMenu>
    </div>
  <div class="col-9">
    <div class="content-wallpaper">
      <h4 class="title-page">Мои слушатели </h4>
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
          <label > Статус ИОМа </label>
          <select class="form-control" name="iom" v-model="iom">
            <option value="">Выбрать </option>
            <option value="0"> без ИОМ</option>
            <option value="1"> с ИОМ</option>
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
              <th scope="col" style="width: 5%" >№</th>
              <th scope="col" style="width: 20%">ФИО</th>
              <th scope="col" style="width: 30%">Школа</th>
              <th scope="col" style="width: 25%">Район</th>
              <th scope="col" style="width: 20%">ИОМ</th>

            </tr>
            </thead>
            <tbody>

            <tr v-for="(item, index) in students" :key="item.user_id">
              <th scope="row">{{index+1}}</th>
              <td ><router-link :to="{path:`/my_student/profile/${item.user_id}`}" class="name_student_link"> {{item.name}} {{item.surname}}</router-link></td>
              <td>{{item.school_name}}</td>
              <td>{{item.title_area}}</td>
              <td>{{getIomStatus(item.isset_iom)}}</td>

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
    import TutorMainMenu from "../../../components/tutorMenu/TutorMainMenu";
    export default {
        setup() {
            const store = useStore()
            const router = useRouter()
            const loading = ref(true)
            const search = ref(false)
            const discipline_value = ref("0")
            const area_value = ref("0")
            const gender_value = ref("0")
            const iom = ref("")
            // STUDENTS DATA
            const currentTime = ref()
            const areas = ref()
            const students = ref()
            const countNum = ref(0)

            const getIomStatus = (val) => {
              if(val === 0) {
                return 'ИОМ не назначен'
              }else {
                return 'ИОМ назначен'
              }
            }


            watch([gender_value, area_value, iom], async (values) => {
                if(values[0] !== '0' || values[1] !== '0' || values[2] !== '' ) {
                     await store.dispatch('student/getStudentsForTutor',
                          {filter: true,
                              areaId: area_value.value,
                              gender: gender_value.value,
                              iom: iom.value,
                          })
                     students.value = store.getters['student/getStudentsForTutor']
                     countNum.value = students.value.length ? students.value.length : 0
                }else {
                    await store.dispatch('student/getStudentsForTutor',{filter: false})
                    students.value = store.getters['student/getStudentsForTutor']
                    countNum.value = students.value.length ? students.value.length : 0
                }
            })



            onMounted(async()=>{
                loading.value = true
                areas.value = await store.dispatch('area/getAreas')
                await store.dispatch('student/getStudentsForTutor',{filter: false})
                students.value = store.getters['student/getStudentsForTutor']
                countNum.value = students.value.length ? students.value.length : 0
                loading.value = false
            })


            currentTime.value = getDateCurrent()
            return {
                currentTime,
                iom,
                getIomStatus,
                loading,
                search,
                areas,
                discipline_value,
                area_value,
                students,
                gender_value,
                countNum
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