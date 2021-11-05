<template>
    <div class="col-12" v-if="!libraryData.length">
        <h5 >Ваша библиотека пуста</h5>
    </div>
    <div class="col-12" v-else>
        <h5 >Список заданий </h5>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Наименование</th>
                <th scope="col">Краткое описание</th>
                <th scope="col">Тип</th>
                <th scope="col">Действие</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in libraryData" :key="item['id_exercise']">
                <th scope="row">{{index + 1}}</th>
                <td><router-link :to="{ path: `/library/${item.id}`}" >{{item.title}}</router-link></td>
                <td> {{shortContent(item.description)}}</td>
                <td>{{item['title_tag']}}</td>
                <td><router-link :to="{ path: `/library/${item.id}`}" class="btn btn-outline-open btn-block">Открыть</router-link></td>
            </tr>
            </tbody>
        </table>
        <slot/>
    </div>
</template>
<script>
    import {shortContent} from "../../utils/shortContent";

    export default {
        props: ['libraryData'],
        setup() {

            return{
                shortContent,
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