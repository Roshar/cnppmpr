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
                                        <li class="widget-49-meeting-item"><span>Ачхой-Мартановский район - {{achkhoy}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Веденский район - {{vedeno}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Грозненский район - {{grozarea}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Гудермесский район - {{gudarea}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Итум-Калинский район - {{itum}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Курчалоевский район - {{kurchaloy}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Надтеречный район - {{nadterech}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Наурский район - {{naur}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Ножай-Юртовский район - {{nojay}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Сунженский район - {{sun}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Урус-Мартановский район - {{urus}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Шалинский район - {{shali}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Шаройский район - {{sharoy}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Шатойский район - {{shatoy}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Шелковской район -{{shelk}}</span></li>
                                        <li class="widget-49-meeting-item"><span>город Аргун -{{argun}}</span></li>
                                        <li class="widget-49-meeting-item"><span>город Грозный -{{grozny}}</span></li>
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
                                        <li class="widget-49-meeting-item"><span>Русский язык - {{disciplineCountRYAS}} </span></li>
                                        <li class="widget-49-meeting-item"><span>Литература - {{disciplineCountLitS}} </span></li>
                                        <li class="widget-49-meeting-item"><span>Математика - {{disciplineCountMathS}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Химия - {{disciplineCountHimS}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Биология - {{disciplineCountBioS}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Физика  - {{disciplineCountPhizS}}</span></li>
                                        <li class="widget-49-meeting-item"><span>История  - {{disciplineCountHistS}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Обществознание  - {{disciplineCountObzS}}</span></li>
                                        <li class="widget-49-meeting-item"><span>Георграфия  - {{disciplineCountGeoS}}</span></li>
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
                                    <li class="widget-49-meeting-item"><span>Русский язык - {{disciplineCountRYA}} </span></li>
                                    <li class="widget-49-meeting-item"><span>Литература - {{disciplineCountLit}} </span></li>
                                    <li class="widget-49-meeting-item"><span>Математика - {{disciplineCountMath}}</span></li>
                                    <li class="widget-49-meeting-item"><span>Химия - {{disciplineCountHim}}</span></li>
                                    <li class="widget-49-meeting-item"><span>Биология - {{disciplineCountBio}}</span></li>
                                    <li class="widget-49-meeting-item"><span>Физика  - {{disciplineCountPhiz}}</span></li>
                                    <li class="widget-49-meeting-item"><span>История  - {{disciplineCountHist}}</span></li>
                                    <li class="widget-49-meeting-item"><span>Обществознание  - {{disciplineCountObz}}</span></li>
                                    <li class="widget-49-meeting-item"><span>Георграфия  - {{disciplineCountGeo}}</span></li>
                                </ul>
                            </li>

                        </ol>
                        <div class="widget-49-meeting-action">
                            <a href="#" class="btn btn-sm btn-flash-border-primary">Перейти в раздел</a>
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
                                    <li class="widget-49-meeting-item"><span>Русский язык - {{disciplineCountRYAI}} </span></li>
                                    <li class="widget-49-meeting-item"><span>Литература - {{disciplineCountLitI}} </span></li>
                                    <li class="widget-49-meeting-item"><span>Математика - {{disciplineCountMathI}}</span></li>
                                    <li class="widget-49-meeting-item"><span>Химия - {{disciplineCountHimI}}</span></li>
                                    <li class="widget-49-meeting-item"><span>Биология - {{disciplineCountBioI}}</span></li>
                                    <li class="widget-49-meeting-item"><span>Физика  - {{disciplineCountPhizI}}</span></li>
                                    <li class="widget-49-meeting-item"><span>История  - {{disciplineCountHistI}}</span></li>
                                    <li class="widget-49-meeting-item"><span>Обществознание  - {{disciplineCountObzI}}</span></li>
                                    <li class="widget-49-meeting-item"><span>Георграфия  - {{disciplineCountGeoI}}</span></li>
                                </ul>
                            </li>
                        </ol>
                        <div class="widget-49-meeting-action">
                            <a href="#" class="btn btn-sm btn-flash-border-primary">Перейти в раздел</a>
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
                        <li class="widget-49-meeting-item"><span>Всего слушателей, завершившие обучение - {{countReport}}</span></li>

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
            const achkhoy = ref()
            const vedeno = ref()
            const grozarea = ref()
            const gudarea = ref()
            const itum = ref()
            const kurchaloy = ref()
            const nadterech = ref()
            const naur = ref()
            const nojay = ref()
            const sun = ref()
            const urus = ref()
            const shali = ref()
            const sharoy = ref()
            const shatoy = ref()
            const shelk = ref()
            const argun = ref()
            const grozny = ref()
            const man = ref()
            const woman = ref()
            const ageBefore25 = ref(0)
            const ageInterval25to35 = ref(0)
            const ageInterval35to45 = ref(0)
            const ageInterval45to55 = ref(0)
            const ageInterval55to65 = ref(0)
            const ageMore65 = ref(0)
            const tutorCountS = ref(0)
            const disciplineCountRYAS = ref(0)
            const disciplineCountLitS = ref(0)
            const disciplineCountMathS = ref(0)
            const disciplineCountHimS = ref(0)
            const disciplineCountBioS = ref(0)
            const disciplineCountPhizS = ref(0)
            const disciplineCountHistS = ref(0)
            const disciplineCountObzS = ref(0)
            const disciplineCountGeoS = ref(0)

            // TUTOR DATA
            const tutorCount = ref(0)
            const disciplineCountRYA = ref(0)
            const disciplineCountLit = ref(0)
            const disciplineCountMath = ref(0)
            const disciplineCountHim = ref(0)
            const disciplineCountBio = ref(0)
            const disciplineCountPhiz = ref(0)
            const disciplineCountHist = ref(0)
            const disciplineCountObz = ref(0)
            const disciplineCountGeo = ref(0)

            // IOM INFO
            const countIom = ref(0)
            const disciplineCountRYAI = ref(0)
            const disciplineCountLitI = ref(0)
            const disciplineCountMathI = ref(0)
            const disciplineCountHimI = ref(0)
            const disciplineCountBioI = ref(0)
            const disciplineCountPhizI = ref(0)
            const disciplineCountHistI = ref(0)
            const disciplineCountObzI = ref(0)
            const disciplineCountGeoI = ref(0)

            // REPORT INFO
            const countReport = ref(0)

            // const countItem = async(obj,item,val) => {
            //     let result = 0
            //     await obj.forEach((property) =>{
            //         if(property[item] === val){
            //             result++
            //         }
            //     })
            //     return result
            // }
            const countItem = async(column,table,option) => {
                return  await store.dispatch('admin/getOptionFromStudents',{column:column, table:table, value:option})
            }

            onMounted(async()=>{
                loading.value = true

                // STUDENT INFO
                countStudents.value = await store.dispatch('admin/getUserCount',{tbl:'students'})

                // TUTOR INFO
                tutorCount.value = await store.dispatch('admin/getUserCount', {tbl: 'tutors'})

                //AREA INFO
                achkhoy.value = await countItem('area_id','students', {parameter:'number',val:1})
                vedeno.value = await countItem('area_id','students',{parameter:'number',val:2})
                grozarea.value = await countItem('area_id','students',{parameter:'number',val:3})
                gudarea.value = await countItem('area_id','students',{parameter:'number',val:4})
                itum.value = await countItem('area_id','students',{parameter:'number',val:5})
                kurchaloy.value = await countItem('area_id','students',{parameter:'number',val:6})
                nadterech.value = await countItem('area_id','students',{parameter:'number',val:7})
                naur.value = await countItem('area_id','students',{parameter:'number',val:8})
                nojay.value = await countItem('area_id','students',{parameter:'number',val:9})
                sun.value = await countItem('area_id','students',{parameter:'number',val:10})
                urus.value = await countItem('area_id','students',{parameter:'number',val:11})
                shali.value = await countItem('area_id','students',{parameter:'number',val:13})
                sharoy.value = await countItem('area_id','students',{parameter:'number',val:14})
                shatoy.value = await countItem('area_id','students',{parameter:'number',val:15})
                shelk.value = await countItem('area_id','students',{parameter:'number',val:16})
                argun.value = await countItem('area_id','students',{parameter:'number',val:17})
                grozny.value = await countItem('area_id','students',{parameter:'number',val:18})

                //GANDER INFO
                man.value = await countItem('gender','students',{parameter:'string',val:'man'})
                woman.value = await countItem('gender','students',{parameter:'string',val:'woman'})

                //AGE INFO
                ageBefore25.value = await countItem('birthday','students',
                    {parameter:'age',val:{
                            start:1,
                            end:25
                            }})
                ageInterval25to35.value = await countItem('birthday','students',
                    {parameter:'age',val:{
                            start:25,
                            end:35
                        }})
                ageInterval35to45.value = await countItem('birthday','students',
                    {parameter:'age',val:{
                            start:35,
                            end:45
                        }})
                ageInterval45to55.value = await countItem('birthday','students',
                    {parameter:'age',val:{
                            start:45,
                            end:55
                        }})
                ageInterval55to65.value = await countItem('birthday','students',
                    {parameter:'age',val:{
                            start:55,
                            end:55
                        }})
                ageMore65.value = await countItem('birthday','students',
                    {parameter:'age',val:{
                            start:55,
                            end:100
                        }})
                disciplineCountRYAS.value = await countItem('discipline_id','students',{parameter:'number',val:1})
                disciplineCountLitS.value = await countItem('discipline_id','students',{parameter:'number',val:2})
                disciplineCountMathS.value = await countItem('discipline_id','students',{parameter:'number',val:3})
                disciplineCountHimS.value = await countItem('discipline_id','students',{parameter:'number',val:4})
                disciplineCountBioS.value = await countItem('discipline_id','students',{parameter:'number',val:5})
                disciplineCountPhizS.value = await countItem('discipline_id','students',{parameter:'number',val:6})
                disciplineCountHistS.value = await countItem('discipline_id','students',{parameter:'number',val:7})
                disciplineCountObzS.value = await countItem('discipline_id','students',{parameter:'number',val:8})
                disciplineCountGeoS.value = await countItem('discipline_id','students',{parameter:'number',val:9})

                disciplineCountRYA.value = await countItem('discipline_id','tutors',{parameter:'number',val:1})
                disciplineCountLit.value = await countItem('discipline_id','tutors',{parameter:'number',val:2})
                disciplineCountMath.value = await countItem('discipline_id','tutors',{parameter:'number',val:3})
                disciplineCountHim.value = await countItem('discipline_id','tutors',{parameter:'number',val:4})
                disciplineCountBio.value = await countItem('discipline_id','tutors',{parameter:'number',val:5})
                disciplineCountPhiz.value = await countItem('discipline_id','tutors',{parameter:'number',val:6})
                disciplineCountHist.value = await countItem('discipline_id','tutors',{parameter:'number',val:7})
                disciplineCountObz.value = await countItem('discipline_id','tutors',{parameter:'number',val:8})
                disciplineCountGeo.value = await countItem('discipline_id','tutors',{parameter:'number',val:9})

                // IOM INFO
                countIom.value = await countItem('id','count_iom',{parameter:'none'})
                disciplineCountRYAI.value = await countItem('dis_id','count_iom',{parameter:'number',val:1})
                disciplineCountLitI.value = await countItem('dis_id','count_iom',{parameter:'number',val:2})
                disciplineCountMathI.value = await countItem('dis_id','count_iom',{parameter:'number',val:3})
                disciplineCountHimI.value = await countItem('dis_id','count_iom',{parameter:'number',val:4})
                disciplineCountBioI.value = await countItem('dis_id','count_iom',{parameter:'number',val:5})
                disciplineCountPhizI.value = await countItem('dis_id','count_iom',{parameter:'number',val:6})
                disciplineCountHistI.value = await countItem('dis_id','count_iom',{parameter:'number',val:7})
                disciplineCountObzI.value = await countItem('dis_id','count_iom',{parameter:'number',val:8})
                disciplineCountGeoI.value = await countItem('dis_id','count_iom',{parameter:'number',val:9})

                //REPORT INFO
                countReport.value = await countItem('id', 'report', {parameter: 'none'})
                loading.value = false
            })


            currentTime.value = getDateCurrent()
            return {
                currentTime,
                loading,
                countStudents,
                optionStudents,
                achkhoy,
                vedeno,
                grozarea,
                gudarea,
                itum,
                kurchaloy,
                nadterech,
                naur,
                nojay,
                sun,
                urus,
                shali,
                sharoy,
                shatoy,
                shelk,
                argun,
                grozny,
                man,
                woman,
                ageBefore25,
                ageInterval25to35,
                ageInterval35to45,
                ageInterval45to55,
                ageInterval55to65,
                ageMore65,
                tutorCount,
                disciplineCountRYAS,
                disciplineCountLitS,
                disciplineCountMathS,
                disciplineCountHimS,
                disciplineCountBioS,
                disciplineCountPhizS,
                disciplineCountHistS,
                disciplineCountObzS,
                disciplineCountGeoS,
                // TUTOR
                tutorCount,
                disciplineCountRYA,
                disciplineCountLit,
                disciplineCountMath,
                disciplineCountHim,
                disciplineCountBio,
                disciplineCountPhiz,
                disciplineCountHist,
                disciplineCountObz,
                disciplineCountGeo,
                // IOM
                countIom,
                disciplineCountRYAI,
                disciplineCountLitI,
                disciplineCountMathI,
                disciplineCountHimI,
                disciplineCountBioI,
                disciplineCountPhizI,
                disciplineCountHistI,
                disciplineCountObzI,
                disciplineCountGeoI,
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