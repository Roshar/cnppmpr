<template>
    <div class="card">
        <div class="card-body">
            <span style="font-style: italic;">Наименование: </span><h5 class="card-title">{{taskData.title}}</h5>
            <span style="font-style: italic;">Описание: </span> <div v-if="taskData.description" v-html="taskData.description"></div> <div v-else> Пусто</div>
            <br>
            <span style="font-style: italic;">Автор:  </span><p class="card-text">{{currentMentor}}</p>
            <span style="font-style: italic;">Ссылка: </span> <p v-if="taskData.link" class="card-text"><a   href="{{taskData.link}}">{{taskData.link}}</a> </p> <p v-else class="card-text">Пусто</p>
            <span style="font-style: italic;">Категория: </span><p class="card-text">{{taskData['title_tag']}}</p>
            <span style="font-style: italic;">Уровень: </span><p class="card-text">{{taskData['level_title']}}</p>
            <span style="font-style: italic;">Срок выполнения: </span><p class="card-text">{{checkTerm(taskData['term'], taskData['term'])}}</p>
        </div>
    </div>
</template>

<script>
    import {checkTerm} from '../../utils/checkTerm'
    export default  {
        props: ['taskData', 'currentMentor'],
        setup() {
            return {
                checkTerm
            }
        }

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