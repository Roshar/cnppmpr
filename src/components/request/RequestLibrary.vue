<template>
    <div class="col-12" v-if="!libraryData.length">
        <h5 >Ваша библиотека пуста</h5>
    </div>
    <div class="col-12" v-else>
        <h5 >Список заданий </h5>
        <table class="table table-sm">
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
            <tr v-for="(item, index) in libraryData" :key="item['id_exercise']">
                <th scope="row">{{index + 1}}</th>
                <td>{{item.title}}</td>
                <td>{{shortContent(item.description, 100)}}</td>
                <td>
                    <a href="{{item.link}}">{{item.link }}</a>
                </td>
                <td>{{item['term']}}</td>
                <td>{{item['title_tag']}}</td>
                <td><router-link :to="{ path: `/library/${item.id}`}" class="btn btn-success">Открыть</router-link></td>
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
                shortContent
            }
        }
    }
</script>

<style scoped>

</style>