<template>
    <div class="col-9 outside-block-indent">
        <div class="card page_info_wrap">
            <div class="card-body">
                <h5 class="card-title"> {{name}} {{surname}} {{patronymic}}</h5>
                <hr>
                <div class="row">
                    <div class="col-3">
                        <p class="card-text">Номер телефона</p>
                    </div>
                    <div class="col-9">
                        <p class="card-text"> {{phone}} </p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-3">
                        <p class="card-text">Ваш предмет</p>
                    </div>
                    <div class="col-9">
                        <p class="card-text"> {{discipline}} </p>
                    </div>
                </div>
                <hr>
                <div class="row">

                    <div class="col-12">
                        <h4>ОБЩАЯ СТАТИСТИКА</h4>
                        <h6>СЛУШАТЕЛИ:</h6>
                        <ul class="counts_module">
                            <li>
                                <div class="count">
                                    {{students}}
                                </div>
                                <div class="label">
                                    всего
                                </div>
                            </li>

                            <li>
                                <div class="count">
                                    {{studentIom}}
                                </div>
                                <div class="label">
                                    слушатели с ИОМ
                                </div>
                            </li>
                            <li>
                                <div class="count">
                                    {{finishedIom}}
                                </div>
                                <div class="label">
                                    с отчетами  о выполнении
                                </div>
                            </li>
                        </ul>
                        <hr>
                        <h6>ИНДИВИДУАЛЬНЫЕ ОБРАЗОВАТЕЛЬНЫЕ МАРШРУТЫ:</h6>
                        <ul class="counts_module">
                            <li>
                                <div class="count">
                                    {{countIom}}
                                </div>
                                <div class="label">
                                    всего
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--                <a href="#" class="btn btn-primary">Go somewhere</a>-->
            </div>
        </div>

        <!--block IOM-->
        <div class="card page_info_wrap inside-block-indent ">
            <div class="card-body">
                <h4 class="card-title"> КАТЕГОРИИ </h4>
                <div class="card-flex-container">
                    <div class="card text-white bg-primary mb-3 between-s" style="max-width: 18rem;">

                        <div class="card-body">
                            <h5 class="card-title"> <router-link to="/iom"> ИНДИВИДУАЛЬНЫЕ ОБРАЗОВАТЕЛЬНЫЕ МАРШРУТЫ </router-link> </h5>
                        </div>
                    </div>
                    <div class="card text-white bg-secondary mb-3 between-s" style="max-width: 18rem;">

                        <div class="card-body">
                            <h5 class="card-title">МЕНЕДЖЕР СЛУШАТЕЛЕЙ1</h5>

                        </div>
                    </div>
                </div>
                <div class="card-flex-container">
                    <div class="card text-white bg-success mb-3 between-s" style="max-width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">БИБЛИОТЕКА ЗАДАНИЙ1</h5>
                        </div>
                    </div>
                    <div class="card text-white bg-danger mb-3 between-s" style="max-width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">МЕНЕДЖЕР ОТЧЕТОВ</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import {ref} from 'vue'

    export default {

        setup() {
            const store = useStore()
            const router = useRouter()
            const name = store.state['user'].userData.name;
            const surname = store.state['user'].userData.surname;
            const patronymic = store.state['user'].userData.patronymic;
            const phone = store.state['user'].userData.phone;
            const discipline = store.state['user'].userData['title_discipline'];
            let students = (store.state['user'].userLink) ? store.state['user'].userLink['COUNT(*)'] : null
            let token = store.state['auth'].token
            let statData;
            let countIom = ref()
            let studentIom = ref()
            let finishedIom = ref()
            const iomCount = async() => {
                await store.dispatch('tutor/getFromTutorTbls',token)
                statData = await store.state['tutor']
                countIom.value = statData.statistics.countIom
                studentIom.value = statData.statistics.studentIom
                finishedIom.value = statData.statistics.finishedIom
            }
            iomCount()
            return{
                name,
                surname,
                patronymic,
                phone,
                discipline,
                students,
                countIom,
                studentIom,
                finishedIom
            }
        },
    }
</script>

<style  scoped>

    .outside-block-indent {
        padding:10px 0 10px 0;
    }
    .inside-block-indent {
        margin:10px 0 10px 0;
    }
    ul.counts_module{
        list-style-type: none;
    }
    .counts_module li {
        display: inline-block;
        padding-left: 55px;

    }
    .count {
        text-align: center;
        color: #2a5885;
        font-size: 1.3em;
    }
    .card-flex-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .between-s {
        margin-left: 40px;
    }
    .card-body a {
        color: #ffffff;
    }

</style>