<template>
    <div class="card">
        <div class="card-body">
            <ul class="list-btn">
                <li><router-link :to="{path:`/iom/${path.id}/exercise`}" class="btn btn-primary">Вернуться к списку </router-link></li>
                <li><button type="button" class="btn btn-warning" @click="$emit('open')">Изменить задание </button></li>
                <li><a href="#" class="btn btn-danger">Удалить это задание </a></li>
            </ul>
            <span style="font-style: italic;">Наименование: </span><h5 class="card-title">{{taskData.title}}</h5>
            <span style="font-style: italic;">Описание: </span><p class="card-text">{{taskData.description}}</p>
            <br>
            <span style="font-style: italic;">Автор: </span><p class="card-text">{{taskData.mentor}}</p>
            <span style="font-style: italic;">Ссылка: </span><p class="card-text">{{taskData.link}}</p>
            <span style="font-style: italic;">Категория: </span><p class="card-text">{{taskData['tag_id']}}</p>
            <span style="font-style: italic;">Срок выполнения: </span><p class="card-text">{{taskData.term}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        emits: ['open'],
        props: ['taskData', 'path']
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