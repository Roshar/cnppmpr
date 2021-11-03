<template>
    <div class="col-12" v-if="!exeData.length">
        <h5 >Данный индивидуальный образовательный маршрут не содержит в себе ни одного задания</h5>
    </div>
    <div class="col-12" v-else>
        <h5 >Список заданий в вашем индивидуальном образовательном маршруте</h5>
        <table class="table ">
            <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Наименование</th>
                    <th scope="col">Краткое описание</th>
                    <th scope="col">Ссылка на задание</th>
                    <th scope="col">Срок</th>
                    <th scope="col">Тип</th>
                    <th scope="col">Действие</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in exeData" :key="item['id_exercise']">
                    <th scope="row">{{index + 1}}</th>
                    <td><router-link :to="{ path: `/iom/${item['iom_id']}/exercise/${item['id_exercises']}`}" >{{item.title}}</router-link></td>
                    <td v-html="shortContent(item.description, 100)"></td>
                    <td>
                        <a href="{{item.link}}">{{item.link }}</a>
                    </td>
                    <td>{{checkTerm(item['term'], item['term'].split('.').reverse().join('-'))}}</td>
                    <td>{{item['title_tag']}}</td>
                    <td><router-link :to="{ path: `/iom/${item['iom_id']}/exercise/${item['id_exercises']}`}" class="btn btn-outline-open btn-block">Открыть</router-link></td>
                </tr>
            </tbody>
        </table>
        <slot/>
    </div>
</template>


<script>
    import {shortContent} from "../../utils/shortContent";
    import {checkTerm} from '../../utils/checkTerm'
    export default {
        props: ['exeData'],
        setup() {
            return{
                checkTerm,
                shortContent
            }
        }
    }
</script>

<style scoped>

    a{
        color:#4571a3;
        text-decoration: none;
    }
    a:hover{
        color:#4571a3;
        text-decoration: underline;
    }

.btn-outline-open{
    color: #4571a3;
    border-top:1px solid transparent;
    border-left:1px solid transparent;
    border-right:1px solid transparent;
    border-bottom: 1px solid #4571a3;
    transition: .2s linear;
}
.btn-outline-open:hover {
    border-top:1px solid #4571a3;
    border-left:1px solid #4571a3;
    border-right:1px solid #4571a3;

}
</style>