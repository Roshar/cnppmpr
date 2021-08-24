<template>
<div class="row">
            <div class="col">
                <h1>Войти в систему</h1> 
                <form @submit.prevent>
                    <div class="mb-3">
                        <label for="email" class="form-label">Введите логин (email):</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Введите пароль:</label>
                        <input type="password" class="form-control" id="password">
                    </div>
                    <button type="submit" class="btn btn-primary">Войти</button>
                </form>
            </div>
        </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>

