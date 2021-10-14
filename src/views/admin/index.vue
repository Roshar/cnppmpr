<template>


        <div class="col-lg-3">
            <div class="card card-margin">
                <div class="card-header no-border">
                    <h5 class="card-title">Слушатели</h5>
                </div>
                <div class="card-body pt-0">
                    <div class="widget-49">
                        <div class="widget-49-title-wrapper">
                            <div class="widget-49-meeting-info">
                                <span class="widget-49-pro-title">Общая статистика на {{currentTime}} </span>
                                <span class="widget-49-meeting-time">12:00 to 13.30 Hrs</span>
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
                                    <li class="widget-49-meeting-item"><span>от 35 до 45 лет -</span></li>
                                    <li class="widget-49-meeting-item"><span>от 45 до 55 лет -</span></li>
                                    <li class="widget-49-meeting-item"><span>от 55 до 65 лет -</span></li>
                                    <li class="widget-49-meeting-item"><span>старше 65 лет  -</span></li>
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
                <h5 class="card-title">Тьюторы</h5>
            </div>
            <div class="card-body pt-0">
                <div class="widget-49">
                    <div class="widget-49-title-wrapper">
                        <div class="widget-49-meeting-info">
                            <span class="widget-49-pro-title">Общая статистика на </span>
                            <span class="widget-49-meeting-time">12:00 to 13.30 Hrs</span>
                        </div>
                    </div>
                    <ol class="widget-49-meeting-points">
                        <li class="widget-49-meeting-item"><span>Всего тьюторов</span></li>
                        <li class="widget-49-meeting-item"><span>Гендерная статистика:</span>
                            <ul class="widget-49-meeting-points">
                                <li class="widget-49-meeting-item"><span>Мужчин</span></li>
                                <li class="widget-49-meeting-item"><span>Женщин</span></li>
                            </ul>
                        </li>
                        <li class="widget-49-meeting-item"><span>Возрастные группы</span>
                            <ul class="widget-49-meeting-points">
                                <li class="widget-49-meeting-item"><span>до 25 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>от 25 до 35 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>от 35 до 45 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>от 45 до 55 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>от 55 до 65 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>старше 65 лет  -</span></li>
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
                            <span class="widget-49-pro-title">Общая статистика на </span>
                            <span class="widget-49-meeting-time">12:00 to 13.30 Hrs</span>
                        </div>
                    </div>
                    <ol class="widget-49-meeting-points">
                        <li class="widget-49-meeting-item"><span>Всего слушателей</span></li>
                        <li class="widget-49-meeting-item"><span>Всего районов:</span></li>
                        <li class="widget-49-meeting-item"><span>Статистика по районам:</span>
                            <ul class="widget-49-meeting-points">
                                <li class="widget-49-meeting-item"><span>Ачхой-Мартановский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Веденский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Грозненский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Гудермесский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Итум-Калинский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Курчалоевский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Надтеречный район -</span></li>
                                <li class="widget-49-meeting-item"><span>Наурский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Ножай-Юртовский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Урус-Мартановский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Шалинский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Шаройский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Шатойский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Шелковской район -</span></li>
                                <li class="widget-49-meeting-item"><span>город Аргун -</span></li>
                                <li class="widget-49-meeting-item"><span>город Грозный -</span></li>
                            </ul>
                        </li>

                        <li class="widget-49-meeting-item"><span>Гендерная статистика:</span>
                            <ul class="widget-49-meeting-points">
                                <li class="widget-49-meeting-item"><span>Мужчин</span></li>
                                <li class="widget-49-meeting-item"><span>Женщин</span></li>
                            </ul>
                        </li>
                        <li class="widget-49-meeting-item"><span>Возрастные группы</span>
                            <ul class="widget-49-meeting-points">
                                <li class="widget-49-meeting-item"><span>до 25 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>от 25 до 35 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>от 35 до 45 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>от 45 до 55 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>от 55 до 65 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>старше 65 лет  -</span></li>
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
                            <span class="widget-49-meeting-time">12:00 to 13.30 Hrs</span>
                        </div>
                    </div>
                    <ol class="widget-49-meeting-points">
                        <li class="widget-49-meeting-item"><span>Всего слушателей</span></li>
                        <li class="widget-49-meeting-item"><span>Всего районов:</span></li>
                        <li class="widget-49-meeting-item"><span>Статистика по районам:</span>
                            <ul class="widget-49-meeting-points">
                                <li class="widget-49-meeting-item"><span>Ачхой-Мартановский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Веденский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Грозненский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Гудермесский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Итум-Калинский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Курчалоевский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Надтеречный район -</span></li>
                                <li class="widget-49-meeting-item"><span>Наурский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Ножай-Юртовский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Урус-Мартановский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Шалинский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Шаройский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Шатойский район -</span></li>
                                <li class="widget-49-meeting-item"><span>Шелковской район -</span></li>
                                <li class="widget-49-meeting-item"><span>город Аргун -</span></li>
                                <li class="widget-49-meeting-item"><span>город Грозный -</span></li>
                            </ul>
                        </li>

                        <li class="widget-49-meeting-item"><span>Гендерная статистика:</span>
                            <ul class="widget-49-meeting-points">
                                <li class="widget-49-meeting-item"><span>Мужчин</span></li>
                                <li class="widget-49-meeting-item"><span>Женщин</span></li>
                            </ul>
                        </li>
                        <li class="widget-49-meeting-item"><span>Возрастные группы</span>
                            <ul class="widget-49-meeting-points">
                                <li class="widget-49-meeting-item"><span>до 25 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>от 25 до 35 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>от 35 до 45 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>от 45 до 55 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>от 55 до 65 лет -</span></li>
                                <li class="widget-49-meeting-item"><span>старше 65 лет  -</span></li>
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



</template>

<script>
    import {getDateCurrent} from '../../utils/getDateCurrent'
    import {ref, onMounted, computed} from 'vue'
    import {useStore} from 'vuex'
    export default {
        setup() {
            const store = useStore()
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
                // student info
                countStudents.value = await store.dispatch('admin/getStudentsCount')
                //area info
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
                //gender info
                man.value = await countItem('gender','students',{parameter:'string',val:'man'})
                woman.value = await countItem('gender','students',{parameter:'string',val:'woman'})
                //age info
                ageBefore25.value = await countItem('birthday','students',
                    {parameter:'age',val:{
                            start:0,
                            end:25
                            }})
                ageInterval25to35.value = await countItem('birthday','students',
                    {parameter:'age',val:{
                            start:25,
                            end:35
                        }})
            })


            currentTime.value = getDateCurrent()
            // console.log(optionStudents.value)
            return {
                currentTime,
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
            }
        },
        components: {}
    }
</script>

<style scoped>

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