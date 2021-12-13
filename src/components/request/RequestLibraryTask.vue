<template>
    <div class="card">
        <div class="card-body">
            <span style="font-style: italic;">Наименование: </span><h5 class="card-title">{{taskData.title}}</h5>
            <span style="font-style: italic;">Описание: </span><p class="card-text" v-if="taskData.description" v-html="taskData.description"> </p>
            <br>

            <div v-if="taskData.link && taskData.link !== 'undefined'">
                <span style="font-style: italic;">Ссылка: </span><a  :href="taskData.link" target="_blank" class="card-text">{{taskData.link}}</a>
            </div>
            <div v-else>
                <span style="font-style: italic;" > Ссылка: пусто </span>
            </div>

            <br>
            <span style="font-style: italic;">Категория: </span><p class="card-text">{{taskData['title_tag']}}</p>
            <span style="font-style: italic;">Уровень: </span><p class="card-text">{{taskData['level_title']}}</p>


        </div>
    </div>
</template>

<script>
    export default  {

        props: ['taskData', ],

    }
</script>

<style scoped>
    .list-btn {
        list-style-type: none;
    }
    .list-btn li {
        display: inline-block;
    }
</style>