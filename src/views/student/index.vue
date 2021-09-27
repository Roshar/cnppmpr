<template>
    <div class="col-9 outside-block-indent">
        <div class="card page_info_wrap">
            <div class="card-body">
                <h5 class="card-title"> {{name}} {{surname}} {{patronymic}}</h5>
                <hr>
                <div class="row">
                    <div class="col-3">
                        <p class="card-text">Образовательная организация</p>
                    </div>
                    <div class="col-9">
                        <p class="card-text"> {{school}} </p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-3">
                        <p class="card-text">Город/район</p>
                    </div>
                    <div class="col-9">
                        <p class="card-text"> {{area}} </p>
                    </div>
                </div>
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
                        <p class="card-text">Тьютор</p>
                    </div>
                    <div class="col-9">
                        <p class="card-text"> {{tutor}} </p>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-10">
                        <ul class="counts_module">
                            <li>
                                <div class="count">
                                    10
                                </div>
                                <div class="label">
                                    Всего заданий
                                </div>
                            </li>
                            <li>
                                <div class="count">
                                    0
                                </div>
                                <div class="label">
                                    Выполнено
                                </div>
                            </li>
                            <li>
                                <div class="count">
                                    10
                                </div>
                                <div class="label">
                                    Не выполнено
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
                <h5 class="card-title"> Ваш индивидуальный образовательный маршрут </h5>
                <table class="table">
                    <thead class="thead-dark">
                    <tr>
                        <th colspan="5">Курсы повышения квалификации</th>
                    </tr>
                    </thead>
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">№</th>
                        <th scope="col">Наименование</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Загрузить отчет о выполнении</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";

    export default {

        setup() {
            const store = useStore()
            const router = useRouter()

            const name = store.state['user'].userData.name;
            const surname = store.state['user'].userData.surname;
            const patronymic = store.state['user'].userData.patronymic;
            const school = store.state['user'].userData['school_name'];
            const area = store.state['user'].userData['title_area'];
            const phone = store.state['user'].userData.phone;
            const discipline = store.state['user'].userData['title_discipline'];
            let tutor = "Вам еще не назначен тьютор";
            if(store.state['user'].userLink){
                tutor = `${store.state['user'].userLink['surname']} ${store.state['user'].userLink['name']} ${store.state['user'].userLink['patronymic']}`
            }


            return{
                name,
                surname,
                patronymic,
                school,
                area,
                phone,
                discipline,
                tutor
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
        margin-left: 40px;

    }
    .count {
        text-align: center;
        color: #2a5885;
        font-size: 1.3em;
    }

</style>