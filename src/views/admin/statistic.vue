<template>
    <app-loader v-if="loading"></app-loader>
    <div class="content-loader" v-else>
        <div class="col-lg-3">
            <div class="card card-margin">
                <div class="card-header no-border">
                    <h5 class="card-title">Слушатели</h5>
                </div>
                <div class="card-body pt-0">
                    <div class="widget-49">
                        <div class="widget-49-title-wrapper">
                            <div class="widget-49-meeting-info">
                                <span class="widget-49-pro-title">Общая статистика на  </span>
                                <span class="widget-49-meeting-time">{{currentTime}}</span>
                            </div>
                        </div>
                        <ol class="widget-49-meeting-points">
                            <li class="widget-49-meeting-item"><span>Всего слушателей: {{countStudents}}</span></li>
                            <li class="widget-49-meeting-item"><span>Всего районов:</span></li>
                            <li class="widget-49-meeting-item"><span>Статистика по районам:</span>
                                <ul class="widget-49-meeting-points">
                                    <li class="widget-49-meeting-item" v-if="areaData && areaData.length" v-for="item in areaData"><span>{{item['title_area']}} - {{item['area']}}</span></li>
                                </ul>
                            </li>

                            <li class="widget-49-meeting-item"><span>Гендерная статистика:</span>
                                <ul class="widget-49-meeting-points">
                                    <li class="widget-49-meeting-item"><span>Мужчин - {{man}}</span></li>
                                    <li class="widget-49-meeting-item"><span>Женщин - {{woman}}</span></li>
                                </ul>
                            </li>
                            <li class="widget-49-meeting-item"><span>Возрастные группы</span>
                                <ul class="widget-49-meeting-points">
                                    <li class="widget-49-meeting-item"><span>до 25 лет - {{ageBefore25}}</span></li>
                                    <li class="widget-49-meeting-item"><span>от 25 до 35 лет - {{ageInterval25to35}}</span></li>
                                    <li class="widget-49-meeting-item"><span>от 35 до 45 лет - {{ageInterval35to45}}</span></li>
                                    <li class="widget-49-meeting-item"><span>от 45 до 55 лет -{{ageInterval45to55}}</span></li>
                                    <li class="widget-49-meeting-item"><span>от 55 до 65 лет - {{ageInterval55to65}}</span></li>
                                    <li class="widget-49-meeting-item"><span>старше 65 лет  - {{ageMore65}}</span></li>
                                </ul>
                            </li>
                            <li class="widget-49-meeting-item"><span>Количество студентов по учебным предметам</span>
                                <ul class="widget-49-meeting-points">
                                    <li class="widget-49-meeting-item" v-if="disciplineStatStudent && disciplineStatStudent.length" v-for="item in disciplineStatStudent"><span>
                                        {{item['title_discipline']}} - {{item['dis']}}
                                    </span></li>
                                </ul>
                            </li>
                        </ol>
                        <div class="widget-49-meeting-action">
                            <router-link to="/students" class="btn btn-sm btn-flash-border-primary">Перейти в раздел</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="card card-margin">
                <div class="card-header no-border">
                    <h5 class="card-title">Тьюторы</h5>
                </div>
                <div class="card-body pt-0">
                    <div class="widget-49">
                        <div class="widget-49-title-wrapper">
                            <div class="widget-49-meeting-info">
                                <span class="widget-49-pro-title">Общая статистика на  </span>
                                <span class="widget-49-meeting-time">{{currentTime}}</span>
                            </div>
                        </div>
                        <ol class="widget-49-meeting-points">
                            <li class="widget-49-meeting-item"><span>Всего тьюторов {{tutorCount}}</span></li>
                            <li class="widget-49-meeting-item"><span>Количество тьюторов по учебным предметам</span>
                                <ul class="widget-49-meeting-points">
                                    <li class="widget-49-meeting-item" v-if="disciplineStatTutor && disciplineStatTutor.length"
                                        v-for="item in disciplineStatTutor"><span>{{item['title_discipline']}} - {{item['dis']}} </span></li>
                                </ul>
                            </li>
                        </ol>
                        <div class="widget-49-meeting-action">
                            <router-link to="/tutors" class="btn btn-sm btn-flash-border-primary">Перейти в раздел</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="card card-margin">
                <div class="card-header no-border">
                    <h5 class="card-title">Индивидуальные образовательные маршруты</h5>
                </div>
                <div class="card-body pt-0">
                    <div class="widget-49">
                        <div class="widget-49-title-wrapper">
                            <div class="widget-49-meeting-info">
                                <span class="widget-49-pro-title">Общая статистика на  </span>
                                <span class="widget-49-meeting-time">{{currentTime}}</span>
                            </div>
                        </div>
                        <ol class="widget-49-meeting-points">
                            <li class="widget-49-meeting-item"><span>Всего ИОМов {{countIom}}</span></li>
                            <li class="widget-49-meeting-item"><span>Количество ИОМов по учебным предметам</span>
                                <ul class="widget-49-meeting-points">
                                    <li class="widget-49-meeting-item" v-if="iomStat && iomStat.length"
                                        v-for="item in iomStat"><span>{{item['title_discipline']}} - {{item['dis']}} </span></li>

                                </ul>
                            </li>
                        </ol>
                        <div class="widget-49-meeting-action">
                            <router-link to="/iom" class="btn btn-sm btn-flash-border-primary">Перейти в раздел</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="card card-margin">
                <div class="card-header no-border">
                    <h5 class="card-title">Отчеты</h5>
                </div>
                <div class="card-body pt-0">
                    <div class="widget-49">
                        <div class="widget-49-title-wrapper">
                            <div class="widget-49-meeting-info">
                                <span class="widget-49-pro-title">Общая статистика на </span>
                                <span class="widget-49-meeting-time">{{currentTime}}</span>
                            </div>
                        </div>
                        <ol class="widget-49-meeting-points">
                            <li class="widget-49-meeting-item" ><span v-if="countReport">Количество слушателей, прошедших обучение в текущем  году - {{countReport[0]['id']}}</span></li>
                        </ol>
                        <div class="widget-49-meeting-action">
                            <a href="#" class="btn btn-sm btn-flash-border-primary">Перейти в раздел</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getDateCurrent} from '../../utils/getDateCurrent'
    import {ref, onMounted, computed} from 'vue'
    import {useStore} from 'vuex'
    import AppLoader from "../../components/ui/AppLoader";
    export default {
        setup() {
            const store = useStore()
            const loading = ref(true)
            // STUDENTS DATA
            const currentTime = ref()
            const countStudents = ref()
            const optionStudents = ref()
            const areaData = ref()
            const man = ref()
            const woman = ref()
            const year = ref(new Date().getFullYear())
            const ageBefore25 = ref(0)
            const ageInterval25to35 = ref(0)
            const ageInterval35to45 = ref(0)
            const ageInterval45to55 = ref(0)
            const ageInterval55to65 = ref(0)
            const ageMore65 = ref(0)
            const tutorCountS = ref(0)
            const disciplineStatStudent = ref()

            // TUTOR DATA
            const disciplineStatTutor = ref()
            const tutorCount = ref(0)

            // IOM INFO
            const countIom = ref(0)
            const iomStat = ref()

            // REPORT INFO
            const countReport = ref(0)

            const countItem = async(column,table,option) => {
                return  await store.dispatch('admin/getOptionFromStudents',{column:column, table:table, value:option})
            }

            onMounted(async()=>{
                loading.value = true

                // STUDENT INFO
                countStudents.value = await store.dispatch('admin/getUserCount',{tbl:'student'})

                // TUTOR INFO
                tutorCount.value = await store.dispatch('admin/getUserCount', {tbl: 'tutor'})

                //AREA INFO
                areaData.value  = await store.dispatch('admin/getAreasStatisticsByStudent')


                //GANDER INFO
                const genders = await store.dispatch('admin/getCountGender')

                man.value = genders[0]['gender']
                woman.value = genders[1]['gender']

                //AGE INFO
                ageBefore25.value = await countItem('birthday','student',
                    {parameter:'age',val:{
                            start:1,
                            end:25
                        }})
                ageInterval25to35.value = await countItem('birthday','student',
                    {parameter:'age',val:{
                            start:25,
                            end:35
                        }})
                ageInterval35to45.value = await countItem('birthday','student',
                    {parameter:'age',val:{
                            start:35,
                            end:45
                        }})
                ageInterval45to55.value = await countItem('birthday','student',
                    {parameter:'age',val:{
                            start:45,
                            end:55
                        }})
                ageInterval55to65.value = await countItem('birthday','student',
                    {parameter:'age',val:{
                            start:55,
                            end:55
                        }})
                ageMore65.value = await countItem('birthday','student',
                    {parameter:'age',val:{
                            start:55,
                            end:100
                        }})

                disciplineStatStudent.value = await store.dispatch('admin/getDisciplineStatisticsByStudentOrTutor', {tbl:'students'})
                disciplineStatTutor.value = await store.dispatch('admin/getDisciplineStatisticsByStudentOrTutor', {tbl:'tutors'})


                // IOM INFO
                countIom.value = await countItem('id','a_iom',{parameter:'none'})
                iomStat.value = await store.dispatch('admin/getIomStatistic')



                // Количество слушателей прошедших обучение в ТЕКУЩЕМ ГОДУ
                // TODO добавить возможность динаминчно выбирать отчетный год
                countReport.value = await store.dispatch('admin/getFinishedStudentsByYear', {year:year.value})

                loading.value = false
            })


            currentTime.value = getDateCurrent()
            return {
                currentTime,
                loading,
                countStudents,
                optionStudents,
                areaData,
                man,
                woman,
                ageBefore25,
                ageInterval25to35,
                ageInterval35to45,
                ageInterval45to55,
                ageInterval55to65,
                ageMore65,
                disciplineStatStudent,

                // TUTOR
                tutorCount,
                disciplineStatTutor,
                // IOM
                countIom,
                iomStat,

                // REPORT
                countReport,

            }
        },
        components: {AppLoader}
    }
</script>

<style scoped>
    .content-loader {
        position: relative;
        display: flex;
    }
    .card-margin {
        margin-top: 1.5rem;
        margin-bottom: 1.875rem;
    }

    .card {
        border: 0;
        box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
        -webkit-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
        -moz-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
        -ms-box-shadow: 0px 0px 10px 0px rgba(82, 63, 105, 0.1);
    }
    .card {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #ffffff;
        background-clip: border-box;
        border: 1px solid #e6e4e9;
        border-radius: 8px;
    }

    .card .card-header.no-border {
        border: 0;
    }
    .card .card-header {
        background: none;
        padding: 0 0.9375rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        min-height: 50px;
    }
    .card-header:first-child {
        border-radius: calc(8px - 1px) calc(8px - 1px) 0 0;
    }

    .widget-49 .widget-49-title-wrapper {
        display: flex;
        align-items: center;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-primary {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #edf1fc;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-primary .widget-49-date-day {
        color: #4e73e5;
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 1;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-primary .widget-49-date-month {
        color: #4e73e5;
        line-height: 1;
        font-size: 1rem;
        text-transform: uppercase;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-secondary {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #fcfcfd;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-secondary .widget-49-date-day {
        color: #dde1e9;
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 1;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-secondary .widget-49-date-month {
        color: #dde1e9;
        line-height: 1;
        font-size: 1rem;
        text-transform: uppercase;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-success {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #e8faf8;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-success .widget-49-date-day {
        color: #17d1bd;
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 1;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-success .widget-49-date-month {
        color: #17d1bd;
        line-height: 1;
        font-size: 1rem;
        text-transform: uppercase;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-info {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #ebf7ff;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-info .widget-49-date-day {
        color: #36afff;
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 1;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-info .widget-49-date-month {
        color: #36afff;
        line-height: 1;
        font-size: 1rem;
        text-transform: uppercase;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-warning {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: floralwhite;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-warning .widget-49-date-day {
        color: #FFC868;
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 1;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-warning .widget-49-date-month {
        color: #FFC868;
        line-height: 1;
        font-size: 1rem;
        text-transform: uppercase;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-danger {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #feeeef;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-danger .widget-49-date-day {
        color: #F95062;
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 1;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-danger .widget-49-date-month {
        color: #F95062;
        line-height: 1;
        font-size: 1rem;
        text-transform: uppercase;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-light {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #fefeff;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-light .widget-49-date-day {
        color: #f7f9fa;
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 1;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-light .widget-49-date-month {
        color: #f7f9fa;
        line-height: 1;
        font-size: 1rem;
        text-transform: uppercase;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-dark {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #ebedee;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-dark .widget-49-date-day {
        color: #394856;
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 1;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-dark .widget-49-date-month {
        color: #394856;
        line-height: 1;
        font-size: 1rem;
        text-transform: uppercase;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-base {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #f0fafb;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-base .widget-49-date-day {
        color: #68CBD7;
        font-weight: 500;
        font-size: 1.5rem;
        line-height: 1;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-date-base .widget-49-date-month {
        color: #68CBD7;
        line-height: 1;
        font-size: 1rem;
        text-transform: uppercase;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-meeting-info {
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-meeting-info .widget-49-pro-title {
        color: #3c4142;
        font-size: 14px;
    }

    .widget-49 .widget-49-title-wrapper .widget-49-meeting-info .widget-49-meeting-time {
        color: #B1BAC5;
        font-size: 13px;
    }

    .widget-49 .widget-49-meeting-points {
        font-weight: 400;
        font-size: 13px;
        margin-top: .5rem;
    }

    .widget-49 .widget-49-meeting-points .widget-49-meeting-item {
        display: list-item;
        color: #727686;
    }

    .widget-49 .widget-49-meeting-points .widget-49-meeting-item span {
        margin-left: .5rem;
    }
</style>