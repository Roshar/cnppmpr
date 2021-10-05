<template>
    <div class="col-12" v-if="!exe">
        <h5 >Данный индивидуальный образовательный маршрут не содержит в себе ни одного задания</h5>
    </div>
    <div class="col-12" v-else>
        <h5 >Список заданий в вашем индивидуальном образовательном маршруте</h5>
        <table class="table table-sm">
            <thead>
            <tr >
                <th scope="col">№</th>
                <th scope="col">Наименование</th>
                <th scope="col">Краткое описание</th>
                <th scope="col">Ссылка на задание</th>
                <th scope="col">Автор</th>
                <th scope="col">Срок</th>
                <th scope="col">Тип</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in exe" >
                <th scope="row">1</th>
                <td>{{item.title}}</td>
                <td>{{item.description}}</td>
                <td><a href="{{item.link}}">{{item.link}}</a></td>
                <td>{{item.author}}</td>
                <td>{{item['term']}}</td>
                <td>{{item['tag_id']}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props: ['exe']
    }
</script>

<style scoped>

</style>