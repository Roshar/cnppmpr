<template>
    <nav class="navbar">
        <ul class="list-group">
            <li class="text-center"><img class="avatar avatar-128 img-circle img-thumbnail" src="https://bankwatch.org/wp-content/uploads/2018/03/Portrait_Placeholder.png"/><p></p></li>
        </ul>
        <ul class="list-group" style="width:100%">
            <li class="list-group-item list-group-item-action">
                <router-link to="/">Моя страница</router-link>
            </li>
            <li class="list-group-item list-group-item-action">
                <router-link to="/Chat">Сообщения</router-link>
            </li>
            <li class="list-group-item list-group-item-action">
                <router-link to="/">Выход</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>