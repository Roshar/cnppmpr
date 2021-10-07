<template>
    <div class="col-12" v-if="!exeData.length">
        <h5 >Данный индивидуальный образовательный маршрут не содержит в себе ни одного задания</h5>
    </div>
    <div class="col-12" v-else>
        <h5 >Список заданий в вашем индивидуальном образовательном маршруте</h5>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Наименование</th>
                    <th scope="col">Краткое описание</th>
                    <th scope="col">Ссылка на задание</th>
                    <th scope="col">Автор</th>
                    <th scope="col">Срок</th>
                    <th scope="col">Тип</th>
                    <th scope="col">Действие</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in exeData" :key="item['id_exercise']">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{item.title}}</td>
                    <td>{{item.description}}</td>
                    <td>
                        <a href="{{item.link}}">{{item.link }}</a>
                    </td>
                    <td>{{item.author}}</td>
                    <td>{{item['term']}}</td>
                    <td>{{item['tag_id']}}</td>
                    <td><router-link :to="{ path: `/iom/${item['iom_id']}/exercise/${item['id_exercises']}`}" class="btn btn-success">Открыть</router-link></td>
                </tr>
            </tbody>
        </table>
        <slot/>
    </div>
</template>
<script>
    export default {
        props: ['exeData'],
    }
</script>

<style scoped>

</style>