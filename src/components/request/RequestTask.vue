<template>
    <div class="card">
        <div class="card-body">
            <span style="font-style: italic;">Наименование: </span><h5 class="card-title">{{taskData.title}}</h5>
            <span style="font-style: italic;">Описание: </span><p class="card-text">{{taskData.description}}</p>
            <br>
            <span style="font-style: italic;">Автор:  </span><p class="card-text">{{currentMentor}}</p>
            <span style="font-style: italic;">Ссылка: </span><p class="card-text">{{taskData.link}}</p>
            <span style="font-style: italic;">Категория: </span><p class="card-text">{{taskData['title_tag']}}</p>
            <span style="font-style: italic;">Срок выполнения: </span><p class="card-text">{{taskData.term}}</p>
        </div>
    </div>
</template>

<script>
    export default  {

        props: ['taskData', 'currentMentor'],

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