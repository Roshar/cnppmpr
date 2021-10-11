<template>
    <div class="filter">
        <h5>Поисковик</h5>
        <div class="form-control">
            <label> Найти задание по названию</label>
            <input type="text" placeholder="Начните вводить название" v-model="title">
        </div>

        <div class="form-control">
            <label> Найти по категории</label>
            <select v-model="tag">
                <option value=""> Все</option>
                <option  v-for="item in tagsData" :value="item['id_tag']">{{item['title_tag']}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    import {ref,watch} from 'vue'
    export default {
        emits: ['update:modelValue'],
        props: ['modelValue','tagsData'],
        setup(_,{emit}) {
            const title = ref()
            const tag = ref()
            watch([title,tag], values => {
                emit('update:modelValue', {
                    title: values[0],
                    tag: values [1]
                })
            })
            return{
                title,
                tag
            }
        }

    }
</script>

<style scoped>

</style>