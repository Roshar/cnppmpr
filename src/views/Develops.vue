<template>
    <div class="center">
        <h3>Данный раздел находится в разработке. Мы прилагаем все возможные усилия для скорейшего его открытия.</h3>
        <div class="btn-out">
            <form >
                <router-link to="/" class="btn btn-info">ВЕРНУТЬСЯ НАЗАД</router-link>
            </form>
        </div>
    </div>

</template>

<script>

</script>

<style scoped>
    .center {
        height: 200px;
        top:200px;
        position: relative;
        border: 3px solid cadetblue;
    }

    .center h3{
        text-align: center;
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

</style>